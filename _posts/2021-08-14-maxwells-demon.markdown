---
layout: post
title: "Maxwell's demon and the limits of computation"
category: tutorial
date: 2021-08-14 12:00:00 -0400
excerpt: "What do messy rooms, information processing, and opening your fridge have in common? I'm not sure, but some aspects of the latter two are at least described by thermodynamics. Here we have a look at some of the bounds thermodynamics places on performing computations, and how a thought experiment from the mid-1800's got this ball rolling."
image: /assets/posts/maxwells-demon/static-image.PNG
---

<script src="/assets/d3.v7.min.js"></script>

<style>
    #boxContainerContainer {
        width: 100%;
        z-index: 1;
    }
    #boxContainer {
        width: calc(100vw - 50px);
        margin-left: calc(50% - 50vw + 25px);
        z-index: 1;
        position: sticky;
        position: -webkit-sticky;
        top: calc(50% - 250px);
    }
    .floatBox {
        position: relative;
        z-index: 3;
        padding-bottom:500px;
        -webkit-transform: translate3d(0,0,1px);
    }
    .floatText {
        background-color: rgba(240, 240, 240, 0.95);
        text-align: justify;
        text-align-last: center;
        padding: 20px;
        border-style: solid;
        border-width: 2px;
        border-radius: 25px;
    }
    .button {
        border: none;
        color: white;
        background-color: #5e9cff;
        padding: 0;
        height: 70px;
        width: 90px;
        font-size: 25px;
        cursor: pointer;
    }
</style>

<div id = "headerContainer">
    <svg id = "headerAnim">
    </svg>
</div>

As any parent of young children can attest, rooms with kids in them tend to get disorganized when left unattended. Toy cars get scattered around, crayon ends up on the wall, not to mention the looming threat of stepping on an errant Lego brick. No, maintaining a semblance of order requires constant interventions, which costs a lot of work; be it in the form of verbal instructions ("Clean up your stuff!") or actually scraping the contents of a jar of peanut butter off the television screen.

While in essence this is just a quirk of human behavior, much the same is true in physics, where this effect is captured by the illustrious Second Law of Thermodynamics. While there is a whole history of discussions and theoretical development behind it, this law is often just stated in its pedestrian version: entropy (the physical quantity that formally describes disorder) tends to increase. The very best you can do during a process is keep it constant, but that's only possible if the process is reversible. The consequence is that if you think you've found a way to decrease the entropy of a system in some way, you're probably just increasing it elsewhere without noticing it. This applies to thermodynamic processes[^0], for instance combustion engines and freezers, and during the past decades it has been extended to include information theory as well (which we'll get to in a bit).

#### From few to many, and back
Thermodynamics is the art of describing systems consisting of a huge number of atoms and molecules using only a few parameters (temperature and internal energy, for instance). The reason this works so well is that there is often a very large number of these microscopic states that are very similar if we only care about global quantities such as the temperature of a system. As I write this, my apartment is a balmy 80 °F / 26.7 °C, and I can measure that without knowing the precise position and velocity of the particles around me. The molecules move around randomly, and while there exists an off chance that all the hot ones congregate in the kitchen, and the cold ones around my desk, this probability is so vanishingly small that I don't need to worry about my coffee freezing over. The temperature of my apartment is said to be in _equilibrium_, which means that the current configuration of atoms and molecules is amongst the most probable ones. I can temporarily bring it out of equilibrium by opening the fridge for a minute, but things will settle back down again quickly after I close the door.

Now, what does this have to do with the limits of computation?

As thermodynamics was being developed in the 19th century, James Clerk Maxwell, one of the unifiers of electricity and magnetism, ran into an apparent paradox. What if, he wondered, I put a wall between my kitchen and my living room, and what if there's a small frictionless door in that wall that can be opened without effort? And what if, furthermore, there's a small invisible being that can open the door to let hot molecules go one way, and cold molecules go another? Wouldn't that violate the Second Law, in that the hot particles would be sorted from the cold ones, resulting in a decrease of entropy or disorder, for free?

That little creature went into history as Maxwell's demon, and it works something like this:

<div id = "boxContainerContainer">
    <div id = "boxContainer">
        <svg id = "maxwellbox"></svg> 
    </div>
    <div class = "floatBox">
        <p class = "floatText">
        The brighter the particle, the higher its speed. If there are lots of bright particles in a compartment that means it's hot, if there are lots of dark ones it's cold. At the start both compartments are (roughly) in equilibrium; they have the same temperature. But if we let Maxwell's demon on the loose, one compartment will cool down as the other heats up, apparently without doing any work.
        </p>
    </div>
    <div class = "floatBox">
        <p class = "floatText" style="text-align:center">
        Click this button to toggle Maxwell's demon: <br><br>
        <button class="button" id="demonButton" onclick="toggleDemon()">▷</button>
        </p>
    </div>
    <div class="floatBox">
    <p class = "floatText">
        We can measure the temperature as we go along (it's proportional to the average speed of the particles). You'll find a thermometer below ($T(l)$ and $T(r)$ indicating the temperature of the left and right compartment, respectively), along with a button to restart the experiment.
    </p>
    </div>
</div>

<div>
    <div id = "controlPanelContainer" style = "margin-bottom:-50px;">
        <svg id = "temperatureScale"></svg>
    </div>
    <div style="text-align:center;vertical-align:middle;margin-bottom:20px;">
        <button class="button" id="demonButton" onclick="toggleDemon()">▷</button>
        <button class="button" onclick = "restart()">↻</button>
    </div>
</div>

Every time you hit the reset button the particles' positions are randomized; while there is a chance that they will end up in a completely sorted state this probability is tiny, and it only grows smaller as the number of particles increases. Being (close to) equilibrium after a reset has the best odds, which is reflected in the temperatures on the scale being close. There will be some fluctuations here, but only because we have about a hundred particles. This is what we mean when we say that equilibrium has the same properties (i.e. temperature) as the group of configurations that has the highest probability of occurring.

To emphasize how much this thought experiment was at odds with the laws of thermodynamics, Leo Szilard (who is perhaps better known for [kickstarting the Manhattan Project](https://en.wikipedia.org/wiki/Einstein%E2%80%93Szil%C3%A1rd_letter) together with Einstein) posited that it would be possible to attach a piston to the wall and add some bearings to the sides such that it could move. After sorting the particles the piston could then be pushed by the hot particles. Such a ['Szilard engine'](https://en.wikipedia.org/wiki/Entropy_in_thermodynamics_and_information_theory#Szilard's_engine) would extract work from a system that was initially in equilibrium, without increasing the overall entropy. 

Even though this situation was highly hypothetical (who, after all, has a frictionless door and an invisible demon lying around?) it took a change in the notion of entropy to resolve it.

#### Information is physical
Part of the resolution came by way of Szilard himself, when he pointed out that the demon needs to do a measurement of sorts to determine which particles were fast and which ones were slow. Such a measurement would require energy, which would increase the entropy of the demon. This reasoning feels a little unsatisfactory, though. In the thought experiment itself we've introduced a door that can (magically) open without friction when operated by an imaginary creature; so if we've gone off the deep end already, why can we not introduce a measurement contraption that can perform effortless measurements? 

This question was answered by Rolf Landauer, who formulated it in a principle that now carries his name. It states that erasing information is an irreversible process, which fundamentally leads to an increase in entropy. By measuring the velocity of the particles Maxwell's demon doesn't create entropy immediately, but they must store, write down, or remember the measurement result in some fashion. Eventually they'll forget about it, toss their notes, or otherwise destroy the information. It is this act, Landauer argued, that results in the creation of entropy because it constitutes an irreversible step.

So why can't we simply endow the demon with an infinite memory? With Landauer's principle came the realization that [information is physical](https://physicstoday.scitation.org/doi/10.1063/1.881299). No matter what kind of information we're talking about (pictures of last year's Christmas party, that odd dream you had last night, this blog post), it is always stored in some physical medium that obeys the laws of thermodynamics[^1], and erasing it means creating disorder. An erased USB drive contains no information and can be described by any number of states, whereas a USB drive that contains your Harry Potter fanfiction is only described by a single, very specific state, which is highly ordered. Erasing it means creating disorder. Since we can manufacture only so many USB drives with the number of atoms in the visible universe, Maxwell's demon must have a finite memory which they're bound to erase _eventually_.

Real-world computers erase information all the time, in fact any logic gate with more input bits than output bits erases information. Given the output of a two-bit `AND` operation you have no way of figuring out what went in; in the process one bit of information got lost, leading to an increase in entropy of $\ln 2$. If the gate is at a temperature $T$, that means a minimum energy of $k_B T \ln 2$ is required. This is a fundamental limit, but it's only valid in equilibrium. It's also a tiny number, and current computers are operating nowhere near it. They are getting more efficient though, as described by [Koomey's law](https://en.wikipedia.org/wiki/Koomey%27s_law), which says that if the current trend keeps up, computers will hit the wall in the year 2048, which, quite aptly, equals $2^{11}$. 

[^0]: Admittedly, applying it to messy rooms doesn't make a lot of sense, but it's a fun analogy. 
[^1]: Landauer's principle only applies if information gets erased in equilibrium. There are efforts underway to try and circumvent it by working either out of equilibrium, or by computing in a reversible fashion such that no information is actually lost.

<script type="text/javascript" src="/assets/posts/maxwells-demon/drawMainBox.js"></script>
<script type="text/javascript" src="/assets/posts/maxwells-demon/drawHeadAnim.js"></script>
<script>
    drawTemperature();
    function drawTemperature() {
        let width = parseInt(d3.select('#controlPanelContainer').style('width'));
        let svg = d3.select("#temperatureScale").attr("width", width);
        let scaleColors = [...Array(11).keys()].map( d => ({offset: d/10, color: d3.interpolateInferno(d/10)}));
        svg.append("defs")
            .append("linearGradient")
            .attr("id", "temperatureScaleGradient")
            .selectAll("stop")
            .data(scaleColors)
            .enter()
                .append("stop")
                .attr("offset", d => d.offset)
                .attr("stop-color", d => d.color);
        
        svg.append("rect")
            .attr("width", width)
            .attr("y", 25)
            .attr("height", 50)
            .attr("fill", "url('#temperatureScaleGradient')");

        let tSlide1 = svg.append("g")
            .attr("id", "tSlide1")
            .attr("transform", `translate( ${width/2 - 10}, 15 )`);
        tSlide1.append("rect")
            .attr("fill", "black")
            .attr("height", 70)
            .attr("width", 5);
        tSlide1.append("text")
            .text("T(l)");
        let tSlide2 = svg.append("g")
            .attr("id", "tSlide2")
            .attr("transform", `translate( ${width/2 + 10}, 15 )`);
        tSlide2.append("rect")
            .attr("fill", "black")
            .attr("height", 70)
            .attr("width", 5);
        tSlide2.append("text")
            .text("T(r)");
        svg.selectAll("#tSlide1, #tSlide2")
            .selectAll("text")
            .attr("text-anchor", "middle")
            .attr("dy", -2)
            .attr("font-style", "italic")
    }
    function updateSliders(relTemps) {
        let width = parseInt(d3.select("#temperatureScale").style("width"));
        d3.select("#tSlide1")
            .attr("transform", `translate( ${ width * relTemps[0] }, 15 )`);
        d3.select("#tSlide2")
            .attr("transform", `translate( ${ width * relTemps[1] }, 15 )`);
    }
</script>