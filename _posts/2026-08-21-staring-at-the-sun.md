---
layout: post
title: Staring at the Sun
category: physics
date: 2026-08-21 8:00:00 +0200
image: /assets/posts/staring-at-the-sun/collage.png
excerpt: "Even though I was only seven at the time, I vividly remember the summer of 1999. Not necessarily because <em>The Phantom Menace</em> and <em>The Matrix</em> were released, but because, on August 11th, a near-total solar eclipse could be seen from The Netherlands. I was one of those kids with a propensity for space (with fluorescent stars above my bed to match), so this was a big thing. Last week, another total eclipse could be seen from Europe, and while the alignment was going to be suboptimal with respect to Amsterdam, I was looking forward to watching it – especially because the weather forecast was good. <em>How</em> to watch it was the question, though."
---

<img src="/assets/posts/staring-at-the-sun/collage.png">

Even though I was only seven at the time, I vividly remember the summer of 1999. Not necessarily because _The Phantom Menace_ and _The Matrix_ were released, but because, on August 11th, a near-total solar eclipse could be seen from The Netherlands. I was one of those kids with a propensity for space (with fluorescent stars above my bed to match), so this was a big thing. My parents had taken us to the island of Texel for a family vacation, and we watched the eclipse from the beach. At midday, the sun disappeared, and with it the summer heat; suddenly, all of the space stuff became real. (It was also a good lesson in alignment, but that was something I'd only appreciate later.)

Last week, another total eclipse could be seen from Europe, and while the alignment was going to be suboptimal with respect to Amsterdam, I was looking forward to watching it -- especially because the weather forecast was good.

I hadn't given much thought to getting a solar viewer, and a week or so before the event I noticed stores putting up signs saying that they either didn't sell them or saying they were sold out. There were also stories of people hawking viewers (i.e. two cheap OD5 filters glued onto a piece of cardboard) for €125 on online marketplaces. Newspapers, meanwhile, were publishing articles on how you could safely watch the eclipse with a pinhole camera: either punch a small hole in a piece of cardboard and point that at a screen, use holey household objects such as a colander, or look for a place in the canopy where small gaps allow sunlight to penetrate. While they get the job done, these methods don't really sound like they rise to the occasion of an eclipse, so I went looking for something else.

The scientific literature contains many examples of physicists looking at the sun. Isaac Newton, for instance, investigated the afterimages you see after looking at a bright object. He did so by directly looking at the sun for a while, then turning his gaze to a dark corner in his room to maximize the effect. He repeated this so that the afterimages -- which he called 'spirits,' and which he thought he could conjure through sheer will ('fantasy') -- until they stayed. In _Never at Rest_, Richard Westfall writes:

> To test the powers of fantasy, [Newton] looked at the sun with one eye until all pale bodies seen with it appeared red and dark ones blue. After "ye motion of ye spirits in my eye were almost decayed" so that things were beginning to appear normal, he closed his eye and "heightened [his] fantasie" of seeing the sun. Spots of various hues appeared to his eye, and when he opened it again pale bodies appeared red and dark ones blue as though he had been looking at the sun. He concluded that his fantasy was able to excite the spirits in his optic nerve quite as well as the sun. He also came close to ruining his eyes, and had to shut himself up in the dark for several days before he could rid himself of the fantasies of color.

You might be surprised to find out that this was only the second-most dangerous experiment Newton performed on his own eyes.[^0]

Let's go back to the DIY pinhole camera that, in the days leading up to the eclipse, was widely advertised as an alternative for solar viewers. It's very simple: punch a small hole (⌀ few mm) in a piece of cardboard, position it ~10 cm from a screen, and lo and behold: you can see an image of the sun on the screen.

Generally, you get a focused image if every point in the object plane maps onto a single point in the image plane. The small aperture of a pinhole camera more or less accomplishes this: in the limit where it's small compared to the image, it only lets through 'one ray' per point in the object plane:

<div class="illustration">
<img src="/assets/posts/staring-at-the-sun/pinhole.svg">
</div>

The downside of this approach is that the resulting image has low intensity and poor resolution, but the good news is that you don't need much of either since the sun is very large and very bright.

The recommendation I saw in some news articles for dealing with the faint image was to integrate the pinhole camera into a box so you could look at it in a darkened environment. This makes sense, but is somewhat counter to the idea of going outside to experience Nature. What to do? Making the aperture larger lets in more light, but blurs the image:

<div class="illustration">
<img src="/assets/posts/staring-at-the-sun/large-pinhole.svg">
</div>

Sticking a lens onto the aperture fixes this, resulting in a proper image:

<div class="illustration">
<img src="/assets/posts/staring-at-the-sun/lens-image.svg">
</div>

For the occasion, I got a pair of lenses from Kruidvat, which is the local corner optics store. They were much cheaper than what I'm used to from Thorlabs (€3.95 for the two of them, including mounts), and they came with very convenient alignment rods:

<div class="illustration">
<img src="/assets/posts/staring-at-the-sun/lens-diagram.png" width="70%">
</div>

The strength of corner store optics is expressed in Dioptre, which is the inverse focal length in meters; a higher number means a shorter focal length. On the package, it said these glasses had a strength of +1, which means the focal length is 1 m. Since the sun is very far away, that's also the distance at which the image gets formed.

The image we got was still pretty bright, which isn't surprising since the solar power collected by one of these lenses is on the order of 1 W, so I'd avoid staring at it for prolonged periods on bright paper, and would not use glasses with much stronger lenses (which would also reduce the image size). In general: don't look at the sun directly,[^2] don't look at the sun through lenses, and make sure your screen doesn't catch fire. Above all: use common sense.

Here's M. demonstrating the general optical setup with the sun to her back:

<div class="illustration">
<img src="/assets/posts/staring-at-the-sun/IMG_5662-large.jpeg" width="70%">
</div>

The image was very bright on the white screen, so we switched it out for a red one.

Below you can see three images of the eclipse in progress: the top one is from a piece of cardboard with a pinhole in it, and the bottom two are formed by the reading glasses. My hand was acting as a crude aperture around the left lens, which resulted in less light going in, and made for a better image since it didn't saturate my phone's camera. As you can see, the pinhole works, but the resulting image isn't as crisp as the image we get when using lenses:

<div class="illustration">
<img src="/assets/posts/staring-at-the-sun/IMG_4560-large.jpeg">
</div>

The next total eclipse that can be seen from The Netherlands is due in 2081; one tip for future observers would be to mask the outer edges of the lenses with tape so that they form sharp images, without letting too much light through.

## Notes
[^0]: Westfall continues: "Newton left the sun alone after that, but not his eyes. A year or so later when he was developing his theory of colors he slipped a bodkin [a blunt needle] 'betwixt my eye & ye bone as neare to ye backside of my eye as I could' in order to alter the curvature of the retina and to observe the colored circles that appeared as he pressed."

[^2]: Newton stared at the sun you don't have to. He would've called this standing on the shoulders of giants.
