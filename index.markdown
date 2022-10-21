---
layout: page
display-title: false
title: About
permalink: /
---

<script src="/assets/d3.v7.min.js"></script>
<script src="/assets/math.js"></script>
<script src="/assets/pages/about/2d_ho.js" defer></script>

<style>
    #about-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 30px;
    }
    #about {
        display: inline;
        flex-basis: 40%;
        flex-grow: 1;
    }
    #ho-container {
        width: 250px;
        height: 250px;
        padding-bottom: 10px;
    }
    #ho-figure {
        text-align: center;
        font-family: monospace;
        font-size: 9pt;
        flex-basis: 30%;
        padding-bottom: 10px;
        touch-action: none;
    }
</style>

<div id = "about-container">
    <span id = "about">
    <h3>Hi, I'm Julius</h3>
    <p>I'm an atomic physicist currently working at Pasqal in Paris, France.</p>
    <p>We are working to build a quantum computer based on neutral atoms and Rydberg interactions. I work in a team that forms the link between the hardware on the one hand, and the algorithms on the other.</p>
    <!-- <p>I work in labs where we try to simulate uncontrollable and complicated quantum mechanical systems using controllable and (slightly) less complicated ones.</p> -->

    <p>On the <a href="/blog/">blog on this website</a> I hope to share some of the interesting things I learn in and outside of the lab, which typically don't find their way into papers.</p>
    </span>
    <div id = "ho-figure">
        <div id = "ho-container"></div>
        Figure: A two-dimensional harmonic oscillator. Apply a potential with your pointer device.
    </div>
</div>

#### Experience
2022 - present --- [Pasqal](https://pasqal.io/) --- Hardware/Software Interface Quantum Engineer \\
2018 - '22 --- MIT --- Postdoc in the [Ketterle group](https://www.rle.mit.edu/cua_pub/ketterle_group/home.htm), working in the [BEC4](https://bec4.mit.edu) and [Dypole](https://dypole.mit.edu) labs \\
2014 - '18 --- University of Amsterdam --- Ph.D. in the [Quantum Gases & Quantum Information group](https://iop.uva.nl/content/research-groups/qgqi/quantum-gases-quantum-information.html) \\
2009 - '14 --- University of Twente --- B.Sc. & M.Sc in Physics
