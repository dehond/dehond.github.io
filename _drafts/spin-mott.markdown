---
layout: post
title: The Spin Mott Insulator
categories: tutorial
excerpt: "What happens to the Mott insulators when particles are given a spin degree of freedom? Or: a foray into quantum magnetism."
---

<script src="/assets/d3.v7.min.js"></script>

<style>
.wannier {
    cursor: grab;
}
#latticeInfoBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-color: #e3e3e3b5;
    padding: 10px;
    font-family: 'DM Mono', monospace;
    text-align: center;
}


</style>

<div id = "lattice-container" style="pad-bottom:20px;">
    <svg id = "spin-dependent-lattice-demo">
    </svg>
</div>

A while ago, I wrote about how cold atoms in optical lattices have been used to observe the [phase transition between a superfluid and a Mott insulator](/tutorial/2021/07/18/mi-to-sf.html). Due to the competition between an atom sticking to a site and exploring its surroundings, the Mott insulator has become a veritable tool for investigating quantum systems. While the atoms are mostly localized in this phase, a small fraction of them still explores neighboring sites (but they typically don't venture beyond that). This means that two neighbors can still notice each other indirectly, and have some sort of interaction. Today we'll look at the consequences of such 'virtual excitations,' especially when atoms can be in either one of two different states.

In a standard (spinless) Mott insulator, these virtual excitations lead to fairly mundane behavior in the form of number fluctuations: put four particles on four sites, wait for a while, and measure where they are. While the total number is conserved, there's some (small) probability of finding a site with two particles and a site without any. The different states that can be found in this system are well understood, but things become more complicated if the atoms are allowed to be in different internal states themselves.

#### Putting a spin on it
Atoms in the same state are identical in every sense, which means that any pair of atoms must have the same interaction strength. This is not necessarily the case if atoms can be in different states (say A and B, or 'red' and 'blue'). Two A atoms may have an interaction that's different from that between an A and a B atoms, for instance. This may sound trivial, but it has some profound consequences for the Mott insulator.

[Previously](/tutorial/2021/07/18/mi-to-sf.html), I introduced the on-site interaction $U$ which describes the energy cost of placing two atoms on the same site. If atoms in different states can have different interaction strengths, it means that their $U$'s are different, too, so we must label them. Two A atoms have an energy $U_{AA}$, two B's an energy $U_{BB}$, and an A and a B atom have an energy $U_{AB}$. For technical reasons $U_{AA}$ and $U_{BB}$ are the same, so we'll just call them $U$.

<div id = "interactions-container" style="padding:20px 0;">
    <svg id = "interaction-scales">
    </svg>
</div>

In the lab we work with rubidium, which features several internal states because of its nuclear and electron spin. In principle this creates many opportunities for picking different states with different interaction strengths, but, in a freak of nature, the interactions in rubidium are actually all very similar. Regardless of which states we choose, we'll have $U_{AB} \approx U$. This is a downer, but we can circumvent this by using a special optical lattice to hold the atoms in, which has the ability to trap different states in different positions. Since rubidium in the ground state is very near sighted --- two rubidium atoms only interact if they're in each other's immediate vicinity --- we can tune the interaction by tuning the overlap of the wave functions.

You can drag the wave functions in the figure below. Crucially, when you separate the states you reduce $U_{AB}$ while $U$ is left unchanged.

<div id = "wannier-container" style="text-align:center;position:relative;padding:20px 0;">
    <svg id = "lattice-phase">
    </svg>
    <svg id = "wannier">
    </svg>
    <p id = "latticeInfoBox" style="opacity:0;">
        Drag the wave functions to change their overlap.
    </p>
</div>

Much like we do in the lab, you can explore different ground states by looking at the populations in the lattice above. We fix the population such that there are, on average, two atoms per site. If you then completely separate the wave functions you'll see that the ground state has a one A and one B atom per site. We refer to this as the 'spin Mott,' because much like the Mott insulator discussed previously, we know what to expect when we measure the on-site population: one A and one B atom.[^1] 

But what happens when you move the wave functions closer together?

In our experiment, we make sure the lattice stays reasonably deep, this means that it's energetically expensive for an atom to hop around by itself (which in practice will not happen). What _is_ possible, though, is that an atom can swap positions with a neighbor. This process is called superexchange, and every once in a while it will turn two neighboring AB pairs into an AA and a BB pair. Since it involves the concerted action of two particles it's slower than a single particle hopping around; moreover, if $U_{AB}$ is smaller than $U$ it's suppressed because turning two AB's into an AA and a BB would involve paying an energy cost equal to $2(U-U_{AB})$.

By bringing the wave functions close together, though, this energy difference can be made very small! If done sufficiently slowly, it will leave the system in a state where it doesn't know which occupation to choose, since they're energetically equivalent. This state is sometimes referred to as a superfluid for spins.[^2] Yet, because atoms can only be exchanged in pairs, there must be some correlation building up between sites; in quantum mechanical terms we then say that neighbors develop entanglement.

These correlations are very interesting, they may contain answers to some of the mysteries confronted in condensed matter experiments, and understanding them will allow us to build better quantum simulators and quantum computers. They are hard to detect without us being able to take a direct picture of the local wave function, though. While this is in the works, our [recent preprint](https://arxiv.org/abs/2110.00354) explores the properties of the spin Mott insulator: how do we prepare it properly, what factors make preparation difficult, and how does it decay? 

#### Notes
[^1]: The 'spin' enters into the name because, for two particles per site, we can map a site onto a spin object. We associate an AB site with a spin $\|m_s=0\rangle$ and an AA or BB site with spins $\|m_s = -1\rangle$ and $\|m_s=1\rangle$, respectively (i.e. it can 'point' in the plane, up, or down). The motivation for this is that it allows us to study magnetic systems in a controllable setting through a mathematical analogy. This is very hard to do when working with such systems directly.

[^2]: In the language of quantum magnetism it's referred to as an XY ferromagnet: the effective spins on neighboring sites are correlated like those in a classical ferromagnet (i.e. a fridge magnet in which all magnetic moments are aligned), but they don't point in a definitive direction, that would be a Z ferromagnet. Instead they mostly point in the plane, and fluctuate a little bit around the equator.

<script src="/assets/posts/spin-mott/spin-mott.js"></script>
