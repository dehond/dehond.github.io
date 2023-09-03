---
layout: post
category: tutorial
tags: statistics programming
title: "Simple automatic error propagation in Python"
date: 2023-09-03 11:41:00 +0200
excerpt: Often when working with experimental data we run into the problem of having to propagate the uncertainty of a set of measurements into another (derived) quantity. For moderately complicated dependencies, the bookkeeping becomes arduous. By defining some basic rules, we can have a computer do most of the heavy lifting, without invoking any symbolic math.
image: /assets/posts/error-propagation/static-image.PNG
---

Often when working with experimental data we run into the problem of having to propagate the error on a set of measurements into another (derived) quantity. I.e., imagine that we measure $x$ and $y$ with uncertainties $\sigma_x$ and $\sigma_y$, what, then is $\sigma_f$ given $f(x,y)$? While this is generally taught in first-year lab courses, it is the type of knowledge that can benefit from a [refresher](https://en.wikipedia.org/wiki/Propagation_of_uncertainty) after lying dormant for a while. But even when well understood, it can be tedious to propagate the error through a sufficiently complicated calculation. Fortunately there are many excellent packages that do this[^1], but it is an interesting exercise to work out how we can keep track of the uncertainties on numbers as we carry out operations on them. Here we'll implement this task in Python by only giving the program a few of basic rules from which more complicated calculations automatically follow.

# First steps
The basic ingredient will be a class representing erroneous numbers, that will allow us to simultaneously keep track of their value and uncertainty. We also need NumPy later on so we load it at the top:

```python
import numpy as np
class E:
    """
    Representation of erroneous numbers and their
    rules of engagement.
    """
    def __init__(self, x, sig_x = 0):
        self.val = x
        self.err = sig_x
        self.rel_err = sig_x/x
```
For some operations it's more convenient to work with the relative error of a number, so we keep track of it as well.

Given two instances of this class, the interpreter isn't going to know how to add or multiply them. An interesting feature of Python, however, is that we can specify how we'd like two objects to behave under standard operations using [dunder methods](https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types). Adding the following to the class definition will specify how to add two numbers correctly:

```python
    def __add__(self, other):
        val = self.val + other.val
        err = np.sqrt(self.err**2 + other.err**2)
        return E(val, err)
```
Similarly, there are methods that determine how results are output to the REPL. Adding the following will print numbers instead of references to the class instances:
```python
    def __str__(self):
        return f"{self.val} ± {self.err}"
    
    def __repr__(self):
        return self.__str__()
```
We can now sum numbers that have an uncertainty margin:
```python
x = E(1.4, 0.3)
y = E(3.5, 0.2)
x + y

# 4.9 ± 0.36055512754639896
```
There are still two problems with this: one is that this implementation breaks down if we sum a regular `float` or `int` with an erroneous number, the other is that it would be arduous to have to specify how to propagate the error for each operation, since there's a number of boilerplate lines. (Note, also, that the error propagation rule is the same for addition/subtraction, and multiplication/division, potentially adding more redundancy. It would be convenient if we can duplicate this behavior without too many extra lines.)

# Generalizing
Instead, we're going to define a class method that will allow us to bind operations and their associated error-propagation rule on the fly. We can do this reasonably efficiently:
```python
    @classmethod
    def add_dunder(cls, name, error_generator):
        """
        Define a dunder method for both left- and right-handed
        application. E.g. define both __add__ and __radd__
        simultaneously, assuming they're the same.
        
        name (str): dunder method to be defined.
        error_generator (function): given (val, x, y) this function
            calculates the error of the output.
        """
        def fun(self, other):
            if not isinstance(other, cls):
                other = cls(other)
            val = getattr(self.val, name)(other.val)
            err = error_generator(val, self, other)
            return cls(val, err)
        setattr(cls, name, fun)
        setattr(cls, name.replace("__", "__r", 1), fun)
```
Notice that we define a function that's subsequently bound to the chosen method. The only thing that is different between the operations that we may want to implement is the way the error should be propagated through them; this is what we've tried to reflect here. Two other observations:
1. By checking whether `other` is or isn't a number carrying an uncertainty, we can catch the case where we want to operate on a float; e.g. `x + 5.0`.
2. By simultaneously binding the function to the 'right handed' version of the same method we ensure we can also evaluate `5.0 + x`. (Because its design, the Python interpreter is first going to look for a method bound to `float`s that adds an erroneous number to them. When it notices this doesn't exist, it tries to fall back on the `__radd__` method defined for erroneous numbers.)

Using this, we can define a few error-propagation rules:
```python
E.add_dunder("__add__",
    lambda val, self, other: np.sqrt(self.err**2 + other.err**2))
E.add_dunder("__mul__",
    lambda val, self, other:
        val * np.sqrt(self.rel_err**2 + other.rel_err**2))
```

## Functions of a single argument
Apart from making sure we propagate the errors for binary functions we can also add a way to propagate them in functions of a single argument (e.g. $f(x) = e^x$, for which $\sigma_f \approx f\sigma_x$). When using NumPy, we can in a sense 'overload' a function by defining a method with the same name within our class. Strictly speaking NumPy doesn't know how to operate on our erroneous numbers, but it will look for the method definitions within the class when asked. We add a second class method for handling this:
```python
    @classmethod
    def overload_fun(cls, orig_fun, error_generator):
        """
        Define a method accessible to NumPy for E-type
        numbers.
        
        orig_fun (str): name of the function to be overloaded
        error_generator (function): given (val, x) this function
            calculates the error of the output.
        """
        def fun(self):
            val = getattr(np, orig_fun)(self.val)
            err = error_generator(val, self)
            return cls(val, err)
        setattr(cls, orig_fun, fun)
```
Which makes defining the exponential function on our new type a matter of running
```python
E.overload_fun("exp", lambda val, self: val * self.err)
```

# Putting it all together
<details>
<summary>Click to expand the full class definition.</summary>
{% highlight python %}
class E():
    """
    Representation of erroneous numbers and their
    rules of engagement.
    """
    def __init__(self, x, sig_x = 0):
        self.val = x
        self.err = sig_x
        self.rel_err = sig_x/x
    
    @classmethod
    def add_dunder(cls, name, error_generator):
        """
        Define a dunder method for both left- and right-handed
        application. E.g. define both __add__ and __radd__
        simultaneously, assuming they're the same.
        
        name (str): dunder method to be defined.
        error_generator (function): given (val, x, y) this function
            calculates the error of the output.
        """
        def fun(self, other):
            if not isinstance(other, cls):
                other = cls(other)
            val = getattr(self.val, name)(other.val)
            err = error_generator(val, self, other)
            return cls(val, err)
        setattr(cls, name, fun)
        setattr(cls, name.replace("__", "__r", 1), fun)
        
    @classmethod
    def overload_fun(cls, orig_fun, error_generator):
        """
        Define a method accessible to NumPy for E-type
        numbers.
        
        orig_fun (str): name of the function to be overloaded
        error_generator (function): given (val, x) this function
            calculates the error of the output.
        """
        def fun(self):
            val = getattr(np, orig_fun)(self.val)
            err = error_generator(val, self)
            return cls(val, err)
        setattr(cls, orig_fun, fun)
        
    def __str__(self):
        return f"{self.val} ± {self.err}"
    
    def __repr__(self):
        return self.__str__()
        
E.add_dunder("__add__",
             lambda val, self, other: np.sqrt(self.err**2 + other.err**2))
E.add_dunder("__sub__", lambda val, self, other: np.sqrt(self.err**2 + other.err**2))
E.add_dunder("__mul__",
             lambda val, self, other:
                 val * np.sqrt(self.rel_err**2 + other.rel_err**2))
E.add_dunder("__truediv__",
             lambda val, self, other:
             val * np.sqrt(self.rel_err**2 + other.rel_err**2))
{% endhighlight %}
</details>
<p></p>

It basically works, and thanks to NumPy's flexibility, we can natively use erroneous numbers in somewhat more complicated operations such as matrix-vector multiplication:
```python
A = np.array([[1.2, 3.7],
              [4.2, 8.9]])
x = np.array([E(10.4, 0.9),
              E(5.8, 3.2)])
A @ x

# array([33.94 ± 11.89, 95.30 ± 28.73], dtype=object)
```
(I've rounded the output to two digits.)

What is mildly annoying is that each function and operation requires an explicit definition of its error-propagation rule. This can be avoided by having the program itself calculate the function derivatives that are required (this is what [`uncertainties`](https://uncertainties-python-package.readthedocs.io/en/latest/) does), but then the code wouldn't be nearly as compact anymore. Things would also have been a bit more pleasant in Julia since its methods support [multiple dispatch](https://docs.julialang.org/en/v1/manual/methods/), meaning we can redefine addition itself for erroneous numbers (or for an erroneous/float pair) -- but otherwise this was a good excuse for getting to know Python's dunder methods.

[^1]: See, for instance, the [`uncertainties`](https://uncertainties-python-package.readthedocs.io/en/latest/) package that integrates with NumPy.
