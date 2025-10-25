---
layout: post
title: "The Broken Compass"
categories: math
excerpt: "
— Lyra, there's elections coming up. Do you know who you'll vote for? 
<br>— No Pan, I think I'll just look at my alethiometer the day of.
<br>— Are you sure? I think some dust got in and it only has one functioning needle left.
<br>— Huh, what's that?
<br>— Dust, Lyra! Dust!
"
image: /assets/posts/the-broken-compass/maps.png
---

<div style="text-align:right;">
<img width="100%" src="/assets/posts/the-broken-compass/maps.png">
<p></p>
</div>


Epistemology. What can we know? What do we think we know? I know it's unhealthy to sit inside thinking about blog posts and piano all day; I don't know whether $P \neq NP$, but then again I think no one does. I think _His Dark Materials_ was a nice tv show. That's an opinion. There are many things that you can have an opinion on. Some things that used to be known are now things you can have an opinion on; this may be an epistemological problem.

When there are elections you need to convert a subset of your opinions into a vote. In a two-party system this is easy; you vote for the person who owns their opponent the hardest on social media. In The Netherlands we don't have a two-party system. We have an $N$-party system, where, after elections these parties must form a government -- ideally supported by a simple majority in both houses of parliament. These parties have many opinions which they describe in platforms that are hammered out a few weeks before the elections. Collectively, these PDFs clock in at over 1.000 pages, so while reading them is clearly an option not many people do this. Instead they watch politicians [do funny things on tv](https://www.youtube.com/watch?v=-j6Wu2_2zww){:target="_blank"}, and then, a few days before the election, they go to websites where they can compare their opinions to those of the parties. [Choose Compass](https://www.kieskompas.nl/){:target="_blank"} is one of these websites; they draw your political orientation on a nice map with all the parties like this one:
<div class="figure">
<img src="/assets/posts/the-broken-compass/choose_compass.svg">
<!-- <figcaption></figcaption> -->
</div>
There's something odd about this map. I remember my civics teacher telling us that the distinction between left- and right-wing politics was disappearing (this was ~20 years ago). Looking at this map it merely seems to have been rotated by 45$^\circ$ around whatever the $z$ axis is. This is suspicious, though. What are the odds that the entire space of things to have an opinion on, which must be close to $\mathbb{R}^\infty$, would collapse so easily onto a line ($\mathbb{R}$) given the right amount of pressure exerted by a political scientist? I don't know about their alethiometer, but my guess is that it has some dust in its cogs.

Another question is what these labels still mean if they're so interchangable. If 'leftness' is such a strong predictor of 'progressivism' (and 'rightness' of 'conservatism'), we might as well adopt [quark-style](https://en.wikipedia.org/wiki/Quark){:target="_blank"} naming conventions. North-west vs. south-east, Texel vs. Maastricht, sheep vs. [vlaai](https://en.wikipedia.org/wiki/Vlaai){:target="_blank"}. A fun conundrum for political scientists to figure out one day. The elections are upon us, though, so there's probably no time for that. After the elections some of these parties will need to form a government, which the media will report on using their broken compass, which is harmful because projecting on a line distorts the actual distances between parties' ideologies.

Let's see if we can fix this using some data from the Choose Compass.

The Choose Compass has $N$ parties respond to $p$ propositions with a score ranging from 'Completely agree' to 'Completely disagree.' (They also have a 'No opinion' answer, but none of the parties use this lest they come across as unopinionated.) The propositions are statements like: 'Instead of building more homes, we should solve the housing shortage by limiting migration.' (#15, a particularly half-baked one, since a significant fraction of these migrants come here for jobs which are either a few standard deviations above or beneath the average Dutch person's station.[^1]) Using a Javascript incantation we can scrape all the parties' responses, and copypasta them into a text file.

In the Dutch system, both the number of parties and things to have an opinion on are macroscopic ($N = 16$, $p = 30$), so we'll need to bring out some of our Big Data Tools to make sense of this. Point of departure is the opinion matrix $O$, measuring $N\times p$ entries, which, owing to the education that some of the parties we are presently discussing would like to stop funding, I've rescaled so that the mean and standard deviation of each column are 0 and 1, respectively. When working with so many data points it's convenient to compress this onto a few important axes.[^2] We cannot plot in $p$-dimensional space, for instance, so it would be useful if we could extract the most salient features from our matrix.

Principal component analysis[^3] (PCA) is an excellent tool for problems like this one. It's the same wizardry as is used to compress the entanglement structure of quantum mechanical systems in matrix-product states, so I think it will work here, too. The goal is to project the data in our $N \times p$ matrix onto a compressed set of $p' < p$ vectors that contain the most 'salient' features of the data. PCA doesn't tell us what these variables encode, that's up to us to figure out.

The recipe involves calculating the singular-value decomposition of $O$, which equals $O = U S V^T$. Using some math (see [^3]), it's then possible to show that the columns of $V$ contain the set of 'important' directions in the data, while squares of the diagonals of $S$ (which is a 'diagonal' $p \times N$ matrix) contain their weights. Their relative values tell us to what extent a principal component explains the variance within the data (i.e. the differences between parties). Plotting these relative weights it's pretty clear that one dominates.

<div class="figure">
<img src="/assets/posts/the-broken-compass/principal_components.svg">
<!-- <figcaption></figcaption> -->
</div>

I wonder what vector this first weight corresponds to? We can plot the vectors, but it's a challenge to make sense of this. There are 30 propositions in the dataset, and labeling them on axis tends to become crowded (please excuse my summaries). Here's a plot showing the coefficients of the first two most significant 'directions,' $v_0$ and $v_1$:

<div class="figure">
<img src="/assets/posts/the-broken-compass/principal_vectors.svg">
<!-- <figcaption></figcaption> -->
</div>

Due to the normalization, the $y$ axis (agree--disagree) should be understood as relative with respect to the rest of the pack (I've also changed the order of the propositions for plotting reasons). Also: these vectors aren't typical samples of parties, but it shows how their preferences. Focusing on $v_0$ it's pretty clear that this corresponds to the traditional divide: "So Jesse, you're saying you want more buses and minimum wage for all? And we should pay for that by taxing polluting companies and wealthy individuals? Are my priors correct in suggesting you are, in fact, a lefty?"

PCA doesn't label the axes for us, so we have to do this ourselves. Left and right could be nice, but those terms originate from where people sat in the Assemblée nationale after the French revolution. Back then they didn't have minimum wage, let alone buses, so I think I'll go for something more modern: down and up. 

You could take this to mean that the divide between down and up is the dominant factor that should be determining our politics. As per the relative weights plot above, though, it still leaves over 30% of the variance in the data unexplained, meaning these are political preferences that do not correlate with down and up.

Looking at the next vector over, $v_1$, we can observe something interesting: four propositions are dominant in determining where a party stands along this axis. They are:
- Defense spending should go to 5% of GDP by 2035.
- A copay for healthcare is required to keep it affordable.
- Ukraine should become a member of NATO.
- It's best to tackle complex problems within the European Union (EU), even if that means less autonomy.

Three out of these four have to do with how parties want to position The Netherlands internationally, and the fourth is related to how they want to cough up the budget for that. Increasing the defense spending to 5% of the GDP will have a _major_ impact on the budget, much more than spending on buses or public broadcasting, so what if we look at parties along this axis? We'll call it the charm--strange axis, where strange means you're in favor of these propositions, and charm means you're against them. With these two new axes we can chart a new map of the political landscape:

<div class="figure">
<img src="/assets/posts/the-broken-compass/new_compass.svg">
<!-- <figcaption></figcaption> -->
</div>

A coalition is typically formed by parties that are close to one another by some metric, so how should we think about the distance between parties in this territory? On the old map, SP (Socialist Party) and DENK (Think) were pretty close to D66 (Democrats '66) because they have similar ideas of the extent to which the government should support people. They are significantly further apart, however, on the charm--strange axis. This makes sense, because 5% of the GDP that's spent on defense cannot go to healthcare or to extending the minimum wage to more people. 

Here's an opinion: I think it's completely inane that tv channels have hosted hours of debates that did not address this major realignment in government spending. Here's some facts: 5% of the Dutch GDP is 50 billion, which is 2.5 times the [20 billion](https://www.rijksfinancien.nl/begroting/U/2025){:target="_blank"} that's currently spent on defense on a yearly basis. Instead, these tv debates honed in on the 'question' of why all the migrants get to live in subsidized housing. The yearly housing budget is roughly [7 billion](https://www.rijksfinancien.nl/begroting/U/2025/XXII?sort=asc&order=Artikel%20naam){:target="_blank"} (which includes _everything_: from social housing to home ownership subsidies). With the additional defense spending the government could fund its housing efforts four times over. I think defense spending is important, but I wonder whether, given the choice, everyone else would agree. Looking at the parties they diverge in their thinking on how this. If anything, it would be at least more interesting to have a debate on this rather than the discriminatory 'question' of whether [Muslims should benefit from the same rights as Christians under the constitution](https://www.oost.nl/nieuws/3578711/brokkelt-bbb-de-rechtsstaat-af-dan-moet-de-grondwet-maar-veranderen){:target="_blank"}.

## Notes
[^1]: Corollary: We should solve the housing shortage by creating more Dutch people while increasing the variance of their level of education. Conundrum: Where are they going to live, and do we accomplish that by spending more or less on education?

[^2]: This is exactly what the Choose Compass has done in their figure, but because they've stuck to a progressive--conservative axis, the additional dimension is mostly redundant.

[^3]: [_A high-bias, low-variance introduction to Machine Learning for physicists_](https://doi.org/10.1016/j.physrep.2019.03.001){:target="_blank"}, Mehta _et al._, Physics Reports **810**, 2019, 1--124

<style>
.figure {
  text-align: center;
  padding: 1em 0;
}
.figure figcaption {
  padding: 1em 0;
}
</style>
