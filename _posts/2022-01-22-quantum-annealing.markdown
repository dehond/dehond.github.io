---
layout: post
title: Protein Folding through Quantum Annealing
categories: tutorial
date: 2022-01-22 13:00:00 -0400
excerpt: Some classical problems have such a large number of degrees of freedom that solving them is intractable on classical computers. It would simply take astronomical times to sample the full state space and find the solution. Even though these problems are classical in nature, quantum-assisted techniques may provide a way out by, as it were, probing all configurations in parallel, and following the optimal solution. Here we explore some of these ideas using the problem of protein folding.
image: /assets/posts/protein-folding/static-image.png
---

<style>
    .draggable {
        cursor: grab;
    }
    svg > text {
        font: 400 17px/1.5 "Signika Negative", serif;
    }
    #latticeContainer, #energiesPlotContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        padding-bottom: 1em;
    }
    #lattice {
    }
    #qdisplay {
        font-size: 18pt;
    }
    #qdisplay, #energiesPlotLattice {
        text-align: center;
        font-family: monospace;
    }
</style>

<script src="/assets/d3.v7.min.js"></script>

Some classical problems have such a large number of degrees of freedom that solving them is intractable on classical computers. It would simply take astronomical times to sample the full state space and find the solution. Even though these problems are classical in nature, quantum-assisted techniques may provide a way out by, as it were, probing all configurations in parallel, and following the optimal solution. This requires two things: the solution needs to be encoded in the ground state of a Hamiltonian, and we need to be able to prepare that ground state by sweeping into it from the ground state of a trivial Hamiltonian.[^1] This is exactly what adiabatic quantum computing -- or, for our present purposes: quantum annealing -- does; let's have a look at it, using protein folding as an example.

[^1]: The ground state of a classical problem consists of a single state in the configuration space, there's no superposition and there are no quantum fluctuations

Protein folding is a complicated problem because of the many degrees of freedom involved. Proteins are complex molecules built from a chain of amino acids that interact with each other. The interactions control how the protein folds into a three-dimensional structure and determine how it binds to other proteins or molecules. The bonds between amino acids can be at arbitrary angles, and because of that the state space is huge, especially considering that the typical protein consists of a few hundred amino acids. Due to the large state space, finding the configuration with the lowest energy (i.e. the most likely one) becomes an... ordeal. It is of great interest to understand this, though, because it would allow us to predict protein structure (and function) based on the order of amino acids alone. This could be useful for designing drugs, and for better understanding diseases that occur through protein *mis*folding -- which results in useless clumps of amino acids that interfere with biological processes (Alzheimer's disease is thought to be related to proteins running amok, for instance).

While the field of bioinformatics has made great strides in tackling this problem (and neural nets have pushed things forward further in recent years), it's still interesting to look at it from a quantum computing perspective, because it shows us how we can encode a classical problem in a Hamiltonian, and use an adiabatic sweep to 'compute' the ground state solution.

#### Designing a Hamiltonian
Following [Perdomo _et al._](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.78.012320), we'll see how the messy process of protein folding can be reduced to a few terms in a Hamiltonian that each describe a relevant physical property. We'll then explore how we can ramp into this starting out from the ground state of the transverse Ising model.

To keep things simple we'll need to make a few approximations. For one we'll assume the amino acids live on a two-dimensional lattice. This discretizes the degrees of freedom, but we'll still be able to get characteristic folding behavior out of it. We'll also assume there are only two types of amino acids: polar ones (P) and hydrophobic ones (H) (this is known as [the HP model](https://en.wikipedia.org/wiki/Hydrophobic-polar_protein_folding_model)). The hydrophobic ones like to avoid the water in the solution they're suspended in, and so there's an energy reduction if we can get two or more to stick together. This is a gross oversimplification of interactions in real amino acids, but it will give us a feeling for the problem. Note that it is possible to design models with more complicated interactions; for instance using the [Miyazawa-Jernigan matrix](https://onlinelibrary.wiley.com/doi/full/10.1002/prot.10239?casa_token=jxV3qZED8YMAAAAA%3ADQr0nz2QYj2PG0qaTfNSDDfT7Bvja9_8TpDoCpdulXb-jChZMcYEP16cupMto2S-QmYkLhzTbGNfWA), which describes interactions between real amino acids.

Finally, we'll only look at a short portein, consisting of only four amino acids (the HPPH chain). This requires a $4\times 4$ lattice, since the chain will at most extend four sites along one axis. We can fix the two center proteins to the sites in the middle of the lattice due to translation invariance.

As [Perdomo _et al._](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.78.012320) point out, we need three terms in the Hamiltonian to accurately map the protein folding problem:
1. A term preventing double-occupancy of a single site,
2. A term guaranteeing the amino acids form a chain,
3. A term accounting for some amino acids being hydrophobic, encouraging them to stick together.

#### Encoding lattice points
We describe the position of the amino acids by converting the $x$ and $y$ coordinates to binary numbers. Since there are four sites in each direction we need two binary digits per axis, so the position of each protein is described by four qubits. The position of the first protein is given by $q_4q_3q_2q_1$, where $0011$, for instance, corresponds to the bottom right corner of the lattice:

<div id = "latticeContainer">
    <svg id = "lattice"></svg>
    <div id = "qdisplay"></div>
</div>

Here, the hydrophobic and polar amino acids are red and blue, respectively.
The full state of the system is described by the vector
$$
    \mathbf{q} = q_{16} q_{15} \cdots q_2 q_1,
$$
although - since the middle proteins have a fixed position - the string $q_{12}\cdots q_5$ is constant, so we have eight actual qubits left. You can drag the amino acids around to explore the different configurations of our state space, and see how this changes the state $\mathbf{q}$. In the following, the P amino acids will be fixed in place to reduce the size of the state space by constricting these degrees of freedom without loss of generality.

The trick is now to write the Hamiltonian in terms of the basis $\\{\vert0\rangle, \vert1\rangle \\}^{\otimes 8}$, where we design three terms to satisfy the requirements listed above. The Hamiltonian can be expressed in terms of operators $\hat{q}_i$, where this is taken to act on the $i^\mathrm{th}$ qubit while leaving the others untouched.[^2]

[^2]: Formally it's the identity operator for qubits $q_{j\neq i}$.

The first term needs to give us an energy penalty for each configuration that has two or more amino acids on a single site. Two particles occupy the same site if all four the qubits denoting their positions are the same. We can check for this by applying what amounts to an `XNOR` operation on each pair in the bit string. This is a negated, exclusive `OR`, meaning that it returns 1 if both bits are the same. It's given by $f(q_i, q_j) = 1 - q_i - q_j + 2q_iq_j$.

To check whether amino acids 1 and 2 sit on the same site, we can evaluate:

$$
    f(\hat{q}_1, \hat{q}_5) f(\hat{q}_2, \hat{q}_6) f(\hat{q}_3, \hat{q}_7) f(\hat{q}_4, \hat{q}_8).
$$

which is a single term in the on-site interaction Hamiltonian:

$$
    \mathcal{H}_\mathrm{site} = \lambda_0 \sum_{\substack{i\neq j\\ j>i}} \prod_{k = 1}^4 f(\hat{q}_{4(i-1)+k}, \hat{q}_{4(j-1)+k}).
$$

Here the product runs over all four bits describing the positions of two amino acids $i$ and $j$. The sum runs over all pairs, while preventing double counting.

The second term in the Hamiltonian needs to make sure we satisfy the primary structure constraints of the protein, i.e. it needs to ensure HPPH stays in the correct sequence (and doesn't turn into HHPP), and that there's exactly one lattice site between adjacent amino acids in the chain. Any other separation should lead to an energy penalty. We can calculate the distance between two amino acids $i$ and $j$ with the operator

$$
    d_{ij}^2 = \sum_{k = 0}^1 \left( \sum_{r = 1}^2 2^{r-1} \left( \hat{q}_{4(i-1)+2k+r} - \hat{q}_{4(j-1) + 2k+r}  \right) \right)^2.
$$

Here the sum over $k$ runs over the two dimensions of the lattice ($x$ and $y$), and it adds the distances in quadrature; it's the binary version of Pythagoras's theorem. The inner sum runs over the two binary digits that we use to encode the position; multiplying it by $2^{r-1}$ converts it into a decimal number.

Now we just need a term that is zero if all distances are 1, and which results in an energy penalty if they're not.  [Perdomo _et al._](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.78.012320) argue that the following form is best:

$$
    \mathcal{H}_\mathrm{primary} = \lambda_1\left(-2 + d_{12}^2 + d_{34}^2 \right).
$$

Note that the distance between amino acids 2 and 3 is omitted, since $d_{23} = 1$ is enforced by design. Note that this term actually encourages two amino acids to hop on the same site, since then $d_{ij} = 0$. This can be prevented by simply giving the on-site term a larger weighting (i.e. by setting $\lambda_0 > \lambda_1$).

The final term in the Hamiltonian needs to account for the hydrophobic interactions; it needs to encourage the H amino acids to stick together so as to avoid interactions with water molecules in the solution that suspends the protein. Since it's such a small problem this gives us a pretty good hint as to what the ground state will look like, but to have the computer confirm that we need a term that encodes the interaction.

If two amino acids are hydrophobic, we need operators to check whether they are to each other's left, right, top, or bottom. Obtaining these operators is quite involved, but the logic is straightforward: simply check that the bit strings describing either the $x$ or $y$ coordinates of two amino acids differ by _at most_ one bit. You need to be careful about bits carrying over during the check, but the logic is straightforward; [Perdomo _et al._](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.78.012320) give the full expressions on pp. 5-7. Here I'll just dispense with what the Hamiltonian looks like in the end:

$$
    \mathcal{H}_\mathrm{hydro} = -H_\mathrm{pair}^{14}.
$$

Since there's only one pair of hydrophobic proteins we only need to check whether they're on adjacent sites, which is the job of $H_\mathrm{pair}^{ij}$. If $i$ and $j$ are indeed neighboring this will result in an energy reduction.



#### Putting it together
We can now write down the total Hamiltonian as

$$
    \mathcal{H}_\mathrm{tot} = \mathcal{H}_\mathrm{site} + \mathcal{H}_\mathrm{primary} + \mathcal{H}_\mathrm{hydro}.
$$

The question remains how to find the ground state on a quantum platform. The beauty of adiabatic quantum computing is that the 'calculation' starts out with a straightforward Hamiltonian with an equally straightforward ground state, and that we gradually ramp into the Hamiltonian that encodes our problem. We require that the initial state $\vert\psi_0\rangle$ is smeared out over all basis states, so that it can sample each candidate during the ramp. The following typically works:

$$
    \vert\psi_0\rangle = \frac{1}{16} \left( \vert 0\rangle + \vert 1\rangle \right)^{\otimes 8}.
$$

This is a superposition of all the states in our basis, but more importantly, it maps onto the ground state of the transverse Ising Hamiltonian:

$$
    \mathcal{H}_\mathrm{Ising} = \sum_{i = 1}^8 \sigma_i^x.
$$

The prescription for quantum annealing is now that we slowly morph the Ising Hamiltonian into $\mathcal{H}_\mathrm{tot}$ over a timescale $\tau$, i.e. by doing:

$$
    \mathcal{H}(t) = (1-t/\tau)\mathcal{H}_\mathrm{Ising} + (t/\tau) \mathcal{H}_\mathrm{tot}.
$$

During the sweep, the system will transition through several avoided crossings: points where the ground state is coupled to excited states by the Hamiltonian. In order to stay in the ground states, these points must be traversed sufficiently slowly, otherwise there's a finite chance to leave the ground state. The hand-waving constraint this puts on $\tau$ is that it is smaller than the inverse of the smallest energy gap the system goes through.[^3]

[^3]: This can be substantiated by the [Landau--Zener formula](https://en.wikipedia.org/wiki/Landau%E2%80%93Zener_formula), which gives the probability of such unwanted diabatic transitions.

Since the problem consists of only 8 qubits, it's tractable on a typical laptop. If we start out in $\vert\psi_0\rangle$, we can evaluate the time evolution numerically, and make sure that the system stays in the ground state. During all this, we assume zero temperature and do not take fluctuations into account. Technically this means we're in the idealized realm of adiabatic quantum computing, but it serves to highlight the quantum mechanical principles underlying quantum annealing. The (instantaneous) eigenstates, as a function of time, look like this:

<div id = "energiesPlotContainer">
    <svg id = "energiesPlot"></svg>
    <svg id = "energiesPlotLattice"></svg>
</div>

The ground state is highlighted in red; by dragging the cursor you can take the system from the Ising model's ground state into the ground state of the Hamiltonian encoding the protein folding problem.

One thing you may notice is that there still seem to be four hydrophobic (red) amino acids on the lattice after performing the sweep. That happens because the ground state is degenerate: energetically it's a wash whether the H amino acids form their bond above or below the polar ones. The problem could be optimized further by removing the inversion symmetry from the Hamiltonian (just as the translation an rotation symmetry are removed by pinning the middle amino acids); this would require fine tuning the constraints on the first and fourth amino acids.

A practical concern is how fast to ramp, exactly. Ramping too fast will cause diabatic transitions out of the ground state, while ramping too slow will lead to decoherence on realistic quantum platforms. In the real world, it's also not realistic to work at zero temperature, and there will be some fluctuations between low-lying states. Finally, some of the terms constructed in our Hamiltonian consist of products including many $\hat{q}$ operators. In the contribution coming form the on-site interactions, for instance, there are terms consisting of a product of eight operators. Such a term is called 8-local, and while it's straightforward to simulate such a small problem on a classical computer, it's very hard to implement this using realistic qubits. Fortunately, as [Perdomo _et al._](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.78.012320) point out, there are ways of rewriting $N$-local terms as $2$-local ones by using extra qubits that shuttle information back and forth.

It is quite remarkable that we can encode a classical optimization problem such as protein folding in a quantum mechanical Hamiltonian, and obtain the solution by an adiabatic sweep. While it remains to be seen whether quantum platforms will ever make a difference for this particular problem (where the current standard is set by [Google's deep learning platform](https://www.nature.com/articles/s41586-021-03819-2)), it's an intriguing idea to solve an optimization problem by knocking on all doors at once, instead of checking one by one.

#### Notebook
The Jupyter notebook I used is [available here](/assets/posts/protein-folding/HP-model.ipynb). It requires Julia and the [QuantumOptics.jl](https://qojulia.org/) package. One thing I haven't really explored here is the effect of the sweep time $\tau$; I set it to be very long so that there's no chance of any diabatic transitions, but it can be relaxed so that there's a fraction of the population that ends up in an excited state.

#### Notes
<script src="/assets/posts/protein-folding/renderPlot.js"></script>