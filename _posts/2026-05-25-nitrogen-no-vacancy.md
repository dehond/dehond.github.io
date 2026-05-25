---
layout: post
title: The Nitrogen (No) Vacancy Center
category: physics
image: /assets/posts/nv-zine/header.jpeg
excerpt: "For my birthday this year, my other half got me a riso printing workshop. Riso is like industrialized screen printing, but in this case (contradictorily?) on a small scale. The purpose of the workshop was to produce zine: a small booklet on a topic of your choosing, which, for me, was the nitrogen-vacancy center: one of the hottest quantum systems in town. Here's an adventure in outreach using anachronistic tech."
date: 2026-05-25 12:00:00 +0200
---

<div class="illustration">
<img src="/assets/posts/nv-zine/header.jpeg">
</div>

For my birthday this year, my other half, L., got me a Riso printing workshop. 
In spirit, riso is like screen printing, except that the printing part is done by what looks like a Xerox machine that's been pumping iron.
During my time in Cambridge, Mass., I spent a few afternoons in a letterpress studio messing with movable type and getting ink all over myself, so my interest was piqued.

The mechanics of 'risographs' are quite interesting. Using a laser, the machine creates masters by burning tiny holes in washi paper that determine where the ink[^0] can flow onto the printing paper.
These masters get wrapped around drums containing the ink, and when you push 'Print' your sheet gets yanked along the drums.
Riso printers are very fast, and when printing large batches they're cost efficient, too, which is what makes them interesting for business use.
If you're creative, they can serve a different purpose: since the ink is not fully opaque, multiple colors can be combined to mesmerizing effect, which the proprietors of riso studios do not shy away from putting on display.
Riso machines are made in Japan and have been around since the 1980s, the color options are limited, and generally you have to be careful about alignment (or risk a few "happy accidents"). You could argue that, since riso hasn't been fully replaced by other (more practical) digital printing techniques, it's an anachronistic technology.[^1]

The purpose of the workshop was to make a 'zine,' which is a small booklet that's easy to produce and distribute yourself, and which can be on anything from your favorite _Star Trek_ episode to your plans for toppling the patriarchy. In her art history course, L. has been using zines to have students engage with the material creatively, which felt more like my tack. So a few days before the workshop, I locked in, and spent a couple of hours crashing and restarting Inkscape while using the breaks in between to design a zine on nitrogen vacancy (NV) centers.

I've been looking into NV centers because we are planning to build a small setup where students can do experiments with them. NV centers are a quantum system that maintains some of its coherence properties at room temperature, so it's quite an interesting and accessible platform for lab courses. The most basic experiment you can do is to use them to measure magnetic fields using the Zeeman effect, but with a few extra features you can measure Rabi oscillations and Ramsey fringes as well.

While I was messing around in Inkscape, it seemed to me that the aesthetics of Googie architecture (think _The Jetsons_ or _The Powerpuff Girls_) were a perfect fit for an atom-like quantum systems such as an NV center. Googie was, in part, inspired by the Atomic Age, it involved lots of neon signs, and its heyday roughly coincided with the development of the laser. Also: Googie is prominent in Las Vegas, a stochastic town if there ever was one.

Scroll through the pages of what I ended up printing, or fetch the [PDF here](/assets/posts/nv-zine/nv-zine.pdf) if you'd rather peruse that.

<div id="zine-container" class="illustration">
<div>
<img src="/assets/posts/nv-zine/nv-zine-p1.svg" width="50%">
</div>
<div>
<img src="/assets/posts/nv-zine/nv-zine-p2.svg" width="100%">
</div>
<div>
<img src="/assets/posts/nv-zine/nv-zine-p3.svg" width="100%">
</div>
<div>
<img src="/assets/posts/nv-zine/nv-zine-p4.svg" width="100%">
</div>
</div>

Actually _printing_ something on a riso printer is a different matter. Each color (I used bright red and green) has to be converted into grayscale, and there are different image processing modes that each result in their own effect. My use of Computer Modern was also challenging. I like using the font for technical text, although I wasn't sure how graphic designers would respond to it. It's a lanky font, and in the print version of my booklet the stems of the letters tend to drown in the surrounding ink, making the text hard to read. (Which is, perhaps, ironic since Donald Knuth wrote TeX, and designed Computer Modern, because he was unhappy with how his books were printed.)

Part of the reason that artists and designers like riso printing (as opposed to other techniques) is the way in which different colors blend together. Only once we were in the studio did this occur to me, and I had hardly used this feature in my design. Instead, I focused on getting the NV level structure and diamond lattice right, triple checking that the fluorescence photons would get printed in red, and the excitation laser in green.

<div class="illustration">
<img src="/assets/posts/nv-zine/IMG_5368.jpeg" width="60%">
<img src="/assets/posts/nv-zine/IMG_5369.jpeg" width="80%">
<figcaption>
Our printed zines. L.'s one is on the left; it's about the <a href="https://en.wikipedia.org/wiki/Roermond_witch_trial">Roermond Witch Trials</a>.
</figcaption>
</div>

One fun thing about a zine is that you typically print it on a single side of paper, which then gets folded into a booklet. The verso side is empty and can be used for a poster. While I didn't print this, I envisioned _The Nitrogen (No) Vacancy Center_ being one of a number of establishments in a fictitious place called Heisenville,[^2] each dealing with a different quantum mechanical system.

<div class="illustration">
<img src="/assets/posts/nv-zine/poster-page.svg" width="100%">
</div>


## Footnotes
[^0]: During the workshop, I learned that riso ink is based on rice and soy, which led me to the too-good-to-be-true thought that the name 'riso' must be a portmanteau of these two ingredients. When asked, however, the instructor quickly put my bit of lexicographical whimsy to bed, saying that it was Japanese for 'ideal.'

[^1]: For lack of a better word. What I mean is **1:** a technology that you'd naively think should've been obviated by newer technological developments, but wasn't, and has continued to evolve **2:** a modern technology which has been made backwards compatible with something it should've replaced. Some examples: cashing a paper check with your phone (still the easiest way of cashing a check in the US); postal services that send you an email with pictures of the day's letters; Polaroid camera's that come with an app; tax software that prints your filled-out return, which you put in the mail to Austin, TX, where it presumably gets OCR'd into more tax software.

[^2]: Also on the strip: Pauli's Pizza Parlor, Werner's Waffle House, and De Broglie's Bateau de Brunch.

<style>
#zine-container {
height: 500px;
overflow-y: scroll;
scrollbar-color: #c2c2c2 #f0f0f0;
border: solid 0.3em;
border-color: #aaa;
border-width: 4px;
scrollbar-width: thin;
text-alignment: center;
}
</style>
