---
layout: post
title: The Spin Mott Insulator
categories: tutorial
excerpt: Excerpt
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
}
</style>

<div id = "lattice-container">
    <svg id = "spin-dependent-lattice-demo">
    </svg>
</div>

A while ago, I wrote about how cold atoms in optical lattices have been used to observe the [phase transition between a superfluid and a Mott insulator](/tutorial/2021/07/18/mi-to-sf.html). Due to the competition between an atom sticking to a site and exploring its surroundings, the Mott insulator has become a veritable tool for investigating quantum systems. While the atoms are mostly localized in this phase, a small fraction of them still explores neighboring sites (but they typically don't venture beyond that). This means that two neighbors can still notice each other, and have some sort of interaction. In a boilerplate Mott insulator this leads to fairly mundane behavior in the form of number fluctuations: put four particles on four sites, wait for a while, and measure where they are. While the total number is conserved, there's some probability of finding a site with two particles and a site without any. The different states that can be found in this system are well understood, but things become more complicated if the atoms are allowed to be in different states.

#### Putting a spin on things
Atoms in the same state are identical in every sense, which means that any pair of atoms must have the same interaction strength. This is not necessarily the case if atoms can be in different states (say A and B). Two A atoms may have an interaction that's different from that between an A and a B atoms, for instance. This may sound trivial, but it has some profound consequences for the Mott insulator which we'll discover shortly.

[Previously](/tutorial/2021/07/18/mi-to-sf.html), I introduced the on-site interaction $U$ which describes the energy cost of placing two atoms on the same site. If atoms in different states can have different interaction strengths, it means that their $U$'s can differ, too, so we must label them. Two A atoms have an energy $U_{AA}$, two B's an energy $U_{BB}$, and an A and a B atom have an energy $U_{AB}$. For technical reasons $U_{AA}$ and $U_{BB}$ are the same, so we'll just call them $U$.



<div id = "wannier-container" style="text-align:center;position:relative;">
    <svg id = "lattice-phase">
    </svg>
    <svg id = "wannier">
    </svg>
    <p id = "latticeInfoBox">
        Drag the wave functions below to change their overlap.
    </p>
</div>


<script src="/assets/posts/spin-mott/spin-mott.js"></script>
