---
layout: page
title: Dysprosium data
permalink: /dysprosium
---

<script src="/assets/d3.v5.min.js"></script>
<script type="text/javascript" src="/assets/mpld3.v0.5.8.min.js"></script>

#### About this page
This is an attempt at an overview of some of the relevant data for people looking to understand (ultracold) dysprosium. Since dysprosium is an element that -- compared to alkali's -- has only recently been laser cooled this is very much a work in progress. Everything presented here is a synthesis of the work of a number of groups in the field and is primarily an overview of some of the important results in the literature. If you'd like to add something feel free to submit a [pull request](https://github.com/dehond/dehond.github.io/blob/main/p-dysprosium.md) or to send me an email. 


# Table of Contents

1.  [Magnetic properties](#org09449b2)
    1.  [Magnetic dipolar interaction](#orge6879bc)
2.  [Electronic structure](#org5ecc1c7)
    1.  [Bosonic Dy](#orgf9e4930)
    2.  [Fermionic Dy](#org748d944)
    3.  [Important transitions](#orge9ac30e)
3.  [Dynamical polarizability](#orgc0abc5b)
4.  [Bibliography](#orgf7292be)


<a id="org09449b2"></a>

# Magnetic properties

The coupling of a magnetic atom to an external magnetic field $\mathbf{B}$ is given by the Zeeman term $H_Z = \mu_B g_J \mathbf{J} \cdot \mathbf{B}$, where $\mu_B$ is the Bohr magneton and $g_J$ is the Landé $g$ factor:

\begin{equation}
    g_J = g_L \frac{J(J+1) - S(S+1) + L(L+1)}{2J(J+1)} + g_S \frac{J(J+1) - S(S+1) + L(L+1)}{2J(J+1)},
\end{equation}

where $g_L = 1$ and $g_S \approx 2$ are the orbital and spin $g$ factors, respectively.

Based on this, one would expect the bosonic ground state of dysprosium to have $g_J = 1.25$, but in reality it deviates because of its multielectron structure. Its been measured to be $g_J = 1.24159$ [<a href="#citeproc_bib_item_1">1</a>,<a href="#citeproc_bib_item_2">2</a>]. This means that the stretched ground state has a magnetic moment of $9.93\mu_B$, which results in a Zeeman shift of $\mu_{B}g_J = 1.7~\mathrm{MHz/G}$, per $m_J$.


<a id="orge6879bc"></a>

## Magnetic dipolar interaction

The dipole&#x2013;dipole interaction between two dipoles that are aligned with an external field (i.e. $J_z$ is maximized) is given by

\begin{equation}
    V_{dd} = \frac{\mu_{0}\mu^{2}}{4\pi} \frac{1-3\cos^{2}\theta}{r^{3}}.
\end{equation}

Using $\mu=10\mu_{B}$ we find that, if two dysprosium atoms are 50 nm apart, and are aligned head-to-tail (i.e. they are maximally attractive), the interaction is 20 kHz. This falls off with the cube of the interparticle separation, so in an optical lattice with a period of 532 nm (where the separation is ten times larger), the interaction will be 20 Hz. 


<a id="org5ecc1c7"></a>

# Electronic structure


<a id="orgf9e4930"></a>

## Bosonic Dy

The bosonic isotopes have no nuclear spin, and hence no hyperfine structure. The electron configuration of their ground states is [Xe]4f<sup>10</sup>6s<sup>2</sup> which spin-orbit couples into a $^{5}I_8$ configuration.

This can be seen as follows: the $s$ shell is filled, and there are 10 electrons in the $f$ shell, which can accommodate 14 electrons in total. Hence per Hund's first rule: $S = 2$. The total orbital angular momentum from this shell is made up by the unpaired electrons, which leads to $L = 1 + 2 + 3 = 6$, which is denoted by $I$. Finally, since the shell is more than half filled, we have by Hund's third rule that the ground state maximizes $J$, and hence $J = 8$.


<a id="org748d944"></a>

## Fermionic Dy

The fermionic isotopes have nuclear spins $I = 5/2$. The hyperfine interaction coefficients vary between isotopes, and so does the ground states. Generally, though, the hyperfine ground state levels satisfy $11/2 \leq F \leq 21/2$.


<a id="orge9ac30e"></a>

## Important transitions

Because of its complicated electronic structure, dysprosium features a wealth of transitions. The most important ones are arguably those at 421 nm and 626 nm, since they can be used for laser cooling. These are dipole-allowed, stretched transitions of the 6s<sup>2</sup> electrons to 6s6p states ($J=8 \rightarrow J'=9$). The 421 nm transition is comparable to the $D$ lines of alkalis, although its linewidth is substantially broader ($\Gamma/2\pi = 30~\mathrm{MHz}$) &#x2013; mostly because the frequency is substantially higher than that of a typical $D$ line.

The 626 nm transition is an intercombination line (it's a singlet to triplet transition), so it's narrower $\Gamma/2\pi = 130~\mathrm{kHz}$. In principle this is symmetry forbidden, this is broken by spin-orbit coupling.

A comprehensive list of lines can be found in the [NIST database](https://physics.nist.gov/cgi-bin/ASD/lines_hold.pl?el=Dy)  [<a href="#citeproc_bib_item_1">1</a>,<a href="#citeproc_bib_item_3">3</a>] (see [here](https://physics.nist.gov/cgi-bin/ASD/lines1.pl?spectra=Dy+i&limits_type=0&low_w=&upp_w=&unit=1&de=0&format=0&line_out=0&en_unit=0&output=0&bibrefs=1&page_size=15&show_obs_wl=1&show_calc_wl=1&unc_out=1&order_out=0&max_low_enrg=2&show_av=2&max_upp_enrg=&tsb_value=0&min_str=&A_out=0&S_out=on&intens_out=on&max_str=&allowed_out=1&forbid_out=1&min_accur=&min_intens=&conf_out=on&term_out=on&enrg_out=on&J_out=on&submit=Retrieve+Data) for all tabulated transitions out of the ground state). The online table is good, but some lines appear to be missing from there. For a more complete overview, consult pp. 261&#x2013;278 of the reference work on atomic levels of the rare earth elements  [<a href="#citeproc_bib_item_1">1</a>].

Below we've included a (biased) selection of relevant lines for work done in labs around the world. The wavelengths were obtained from Ref. [<a href="#citeproc_bib_item_3">3</a>], and so have the line widths where available (except where indicated). The data on the narrow transitions from the 4f to the 5d shell are all from Ref. [<a href="#citeproc_bib_item_4">4</a>].

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-right" />

<col  class="org-right" />

<col  class="org-right" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-left">Electron configuration of final state</th>
<th scope="col" class="org-right">\(J =8 \rightarrow J'\)</th>
<th scope="col" class="org-right">\(\lambda\) \(\mathrm{(nm)}\)</th>
<th scope="col" class="org-right">\(\left\langle J \vert\vert  \mathbf{r}\vert\vert    J' \right\rangle\) \((a_0 e)\)</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-left"><b>6s<sup>2</sup> transitions</b></td>
<td class="org-right">&#xa0;</td>
<td class="org-right">&#xa0;</td>
<td class="org-right">&#xa0;</td>
</tr>
</tbody>

<tbody>
<tr>
<td class="org-left">4f<sup>10</sup>(<sup>5</sup>I<sub>8</sub>)6s6p(<sup>1</sup>P<sup>o</sup><sub>1</sub>)</td>
<td class="org-right">7</td>
<td class="org-right">404.597</td>
<td class="org-right">9.7</td>
</tr>


<tr>
<td class="org-left">&#xa0;</td>
<td class="org-right">8</td>
<td class="org-right">418.682</td>
<td class="org-right">8.8</td>
</tr>


<tr>
<td class="org-left">&#xa0;</td>
<td class="org-right">9</td>
<td class="org-right">421.172</td>
<td class="org-right">11.9  [<a href="#citeproc_bib_item_4">4</a>]</td>
</tr>
</tbody>

<tbody>
<tr>
<td class="org-left">4f<sup>10</sup>(<sup>5</sup>I<sub>8</sub>)6s6p(<sup>3</sup>P<sup>o</sup><sub>1</sub>)</td>
<td class="org-right">7</td>
<td class="org-right">598.856</td>
<td class="org-right">0.94</td>
</tr>


<tr>
<td class="org-left">&#xa0;</td>
<td class="org-right">8</td>
<td class="org-right">597.449</td>
<td class="org-right">0.89  [<a href="#citeproc_bib_item_5">5</a>]</td>
</tr>


<tr>
<td class="org-left">&#xa0;</td>
<td class="org-right">9</td>
<td class="org-right">625.909</td>
<td class="org-right">1.43</td>
</tr>
</tbody>

<tbody>
<tr>
<td class="org-left">4f<sup>10</sup>(<sup>5</sup>I<sub>8</sub>)6s6p(<sup>3</sup>P<sup>o</sup><sub>2</sub>)</td>
<td class="org-right">8</td>
<td class="org-right">554.727</td>
<td class="org-right">0.66</td>
</tr>


<tr>
<td class="org-left">&#xa0;</td>
<td class="org-right">9</td>
<td class="org-right">563.950</td>
<td class="org-right">0.91</td>
</tr>
</tbody>

<tbody>
<tr>
<td class="org-left">4f<sup>10</sup>(<sup>5</sup>I<sub>7</sub>)6s6p(<sup>3</sup>P<sup>o</sup><sub>2</sub>)</td>
<td class="org-right">8</td>
<td class="org-right">456.509</td>
<td class="org-right">0.73</td>
</tr>


<tr>
<td class="org-left">&#xa0;</td>
<td class="org-right">9</td>
<td class="org-right">457.778</td>
<td class="org-right">1.33</td>
</tr>
</tbody>

<tbody>
<tr>
<td class="org-left"><b>4f<sup>10</sup> transitions</b></td>
<td class="org-right">&#xa0;</td>
<td class="org-right">&#xa0;</td>
<td class="org-right">&#xa0;</td>
</tr>
</tbody>

<tbody>
<tr>
<td class="org-left">4f<sup>9</sup>(<sup>6</sup>H<sup>o</sup>)5d6s<sup>2</sup>(<sup>7</sup>K<sup>o</sup><sub>9</sub>)</td>
<td class="org-right">9</td>
<td class="org-right">598</td>
<td class="org-right">0.39</td>
</tr>


<tr>
<td class="org-left">4f<sup>9</sup>(<sup>6</sup>H<sup>o</sup>)5d6s<sup>2</sup>(<sup>5</sup>K<sup>o</sup><sub>9</sub>)</td>
<td class="org-right">9</td>
<td class="org-right">741</td>
<td class="org-right">0.22</td>
</tr>


<tr>
<td class="org-left">4f<sup>9</sup>(<sup>6</sup>H<sup>o</sup>)5d6s<sup>2</sup>(<sup>7</sup>I<sup>o</sup><sub>9</sub>)</td>
<td class="org-right">9</td>
<td class="org-right">1001</td>
<td class="org-right">0.056</td>
</tr>
</tbody>
</table>


### Oscillator strengths and reduced matrix elements

Following the same conventions as used in Refs. [<a href="#citeproc_bib_item_3">3</a>,<a href="#citeproc_bib_item_6">6</a>], the transition probability between two states $i$ and $k$ ($A_{ik}$) and the reduced matrix element are related through:

\begin{equation}
    |\langle n'J' || \mathbf{d} || nJ \rangle |^2 = \frac{3\pi\epsilon_0\hbar c^3}{\omega_{ik}^3} (2J' + 1) A_{ik}.
\end{equation}

The lifetime of an excited state is the sum over all transition probabilities out of it. 

Note that some literature sources (e.g. Ref. [<a href="#citeproc_bib_item_7">7</a>]) choose to break out a factor $\sqrt{2J + 1}$ from the reduced matrix element.


### Lines and their neighbors

Since dysprosium has so many lines, it helps to understand from which couplings they arise. The $D$ line structure of alkali's is explained (in part) by spin-orbit coupling in the excited state. Dysprosium is no different, there are just a lot more angular momenta that couple. The three lines in the 4f<sup>10</sup>(<sup>5</sup>I<sub>8</sub>)6s6p(<sup>1</sup>P<sup>o</sup><sub>1</sub>) configuration, for instance, are explained by the $J = 8$ of the $4f$ electrons coupling to the $J = 1$ of the $n = 6$ singlet electrons, resulting in $J'=7,8,9$.

Another convenient example is the $6s6p$ triplet ($^{3}P^{o}_{J}$), which can maximally have $J = 2$. This couples to the $4f$ core resulting in a total of 9 levels with $6 \leq J' \leq 10$.

For the transitions involving the $4f$ electrons things are a little more opaque. The ones shown in the table above have the remaining 9 electrons in that shell in a $^{6}H^{o}$ configuration, with $L = 5$ and $S = 5/2$. This can couple in a host of different ways to the $5d6s^{2}$ electrons with $L = 2$ and $S = 1/2$, giving rise to a forest of lines, some of which are included above. 


<a id="orgc0abc5b"></a>

# Dynamical polarizability

Calculating the dynamical polarizability of a multielectron atom is generally a Complicated Problem, as there consensus on line strengths and line widths is still converging. Nevertheless, using second-order perturbation theory in the dipole term gives results that are useful for obtaining ballpark figures of AC Stark shifts, and Raman coupling strengths.

Here we follow the formalism as described by Refs. [<a href="#citeproc_bib_item_6">6</a>,<a href="#citeproc_bib_item_8">8</a>]. A comprehensive overview of the lines can be found in Ref. [<a href="#citeproc_bib_item_9">9</a>]; since there is no agreement on the precise values of all line strengths, results can vary across the literature. Here we use roughly the same parameters as in Ref. [<a href="#citeproc_bib_item_8">8</a>].

Below we plot the values of the scalar, vector, and tensor component of the polarizability tensor ($\alpha^s$, $\alpha^v$, and $\alpha^t$, respectively). For a light field with an electric field amplitude $E_0$ and a polarization vector $\vec{u}$ these lead to an AC Stark shift of

$$
    V_S = -\frac{1}{4} \left| E_0 \right|^2 \left\{ \alpha^s - i\alpha^v \frac{\left[\vec{u}^* \times \vec{u} \right] \cdot \vec{J}}{2J} + \alpha^t \frac{3\left[ \left(\vec{u}^* \cdot \vec{J} \right) \left(\vec{u} \cdot \vec{J} \right) + \left(\vec{u} \cdot \vec{J} \right) \left(\vec{u}^* \cdot \vec{J} \right) \right] - 2J^2}{2J(2J - 1)} \right\}.
$$

If the light is linearly polarized, $\vec{u}^* \times \vec{u}$ will be zero, but if there's any circularity this cross product will point into the direction perpendicular to the plane in which the electric field rotates. Through the dot product with $\vec{J}$, this defines an effective magnetic field, and results in a shift proportional to $m_J$  [<a href="#citeproc_bib_item_10">10</a>,<a href="#citeproc_bib_item_11">11</a>] which will favor a spin alignment along its direction.

The tensor term is best understood as favoring an *orientation* along an effective field axis. Assuming the light is linearly polarized, the $\vec{u} \cdot \vec{J}$ terms project $\vec{J}$ on an effective field axis and &#x2013; for eigenstates along that axis &#x2013; result in a term proportional to $\left(m_J\right)^2$. Depending of the sign of the term, this either favors stretching or compressing along the effective field axis (corresponding to large and small $\left\langle m_J^2 \right\rangle$, respectively).

<div id="fig-scalar"></div>
<div id="fig-vector"></div>
<div id="fig-tensor"></div>
<script>
let p1 = d3.json("/attach/dy-dat/scalar.json")
    .then( d => mpld3.draw_figure("fig-scalar", d ));

let p2 = d3.json("/attach/dy-dat/vector.json")
    .then( d => mpld3.draw_figure("fig-vector", d ));

let p3 = d3.json("/attach/dy-dat/tensor.json")
    .then( d => mpld3.draw_figure("fig-tensor", d ));


Promise.all([p1, p2, p3])
    .then( d => adjustPlots() );

function adjustPlots() {
    d3.selectAll(".mpld3-figure")
        .attr("width", "100%")
        .attr("height", "350")
        .attr("viewBox", "0 0 432 288");
    d3.selectAll(".mpld3-coordinates")
        .style("font-size", "8pt");
    }

</script>

[Download the .csv data](/attach/dy-dat/combined.csv)

*Last update was on: {{ site.time }}*


<a id="orgf7292be"></a>

# Bibliography

<style>.csl-left-margin{float: left; padding-right: 0em;}
 .csl-right-inline{margin: 0 0 0 2em;}</style><div class="csl-bib-body">
  <div class="csl-entry"><a id="citeproc_bib_item_1"></a>
    <div class="csl-left-margin">[1]</div><div class="csl-right-inline">W. Martin, R. Zalubas, and L. Hagan, <i>Atomic Energy Levels – the Rare-Earth Elements</i> (National Bureau of Standards, 1978) <a href="https://nvlpubs.nist.gov/nistpubs/Legacy/NSRDS/nbsnsrds60.pdf">https://nvlpubs.nist.gov/nistpubs/Legacy/NSRDS/nbsnsrds60.pdf</a>.</div>
  </div>
  <div class="csl-entry"><a id="citeproc_bib_item_2"></a>
    <div class="csl-left-margin">[2]</div><div class="csl-right-inline">J. Ferch, W. Dankwort, and H. Gebauer, <i>Hyperfine Structure Investigations in Dy I with the Atomic Beam Magnetic Resonance Method</i>, Physics Letters A <b>49</b>, 287 (1974).</div>
  </div>
  <div class="csl-entry"><a id="citeproc_bib_item_3"></a>
    <div class="csl-left-margin">[3]</div><div class="csl-right-inline">A. Kramida, Yu. Ralchenko, J. Reader, and the NIST ASD Team, <i>NIST Atomic Spectra Database</i> <a href="https://physics.nist.gov/asd">https://physics.nist.gov/asd</a>.</div>
  </div>
  <div class="csl-entry"><a id="citeproc_bib_item_4"></a>
    <div class="csl-left-margin">[4]</div><div class="csl-right-inline">M. Lu, S. H. Youn, and B. L. Lev, <i>Spectroscopy of a Narrow-Line Laser-Cooling Transition in Atomic Dysprosium</i>, Phys. Rev. A <b>83</b>, 012510 (2011) <a href="https://link.aps.org/doi/10.1103/PhysRevA.83.012510">https://link.aps.org/doi/10.1103/PhysRevA.83.012510</a>.</div>
  </div>
  <div class="csl-entry"><a id="citeproc_bib_item_5"></a>
    <div class="csl-left-margin">[5]</div><div class="csl-right-inline">M. Gustavsson, H. Lundberg, L. Nilsson, and S. Svanberg, <i>Lifetime Measurements for Excited States of Rare-Earth Atoms Using Pulse Modulation of a Cw Dye-Laser Beam</i>, Josa <b>69</b>, 984 (1979).</div>
  </div>
  <div class="csl-entry"><a id="citeproc_bib_item_6"></a>
    <div class="csl-left-margin">[6]</div><div class="csl-right-inline">F. Le Kien, P. Schneeweiss, and A. Rauschenbeutel, <i>Dynamical Polarizability of Atoms in Arbitrary Light Fields: General Theory and Application to Cesium</i>, The European Physical Journal D <b>67</b>, 1 (2013).</div>
  </div>
  <div class="csl-entry"><a id="citeproc_bib_item_7"></a>
    <div class="csl-left-margin">[7]</div><div class="csl-right-inline">D. Steck, <i>Rubidium 87 D Line Data</i> <a href="http://steck.us/alkalidata">http://steck.us/alkalidata</a>.</div>
  </div>
  <div class="csl-entry"><a id="citeproc_bib_item_8"></a>
    <div class="csl-left-margin">[8]</div><div class="csl-right-inline">H. Li, J.-F. Wyart, O. Dulieu, S. Nascimbene, and M. Lepers, <i>Optical Trapping of Ultracold Dysprosium Atoms: Transition Probabilities, Dynamic Dipole Polarizabilities and van Der Waals $C_6$ Coefficients</i>, Journal of Physics B: Atomic, Molecular and Optical Physics <b>50</b>, 014005 (2016).</div>
  </div>
  <div class="csl-entry"><a id="citeproc_bib_item_9"></a>
    <div class="csl-left-margin">[9]</div><div class="csl-right-inline">M. Wickliffe, J. E. Lawler, and G. Nave, <i>Atomic Transition Probabilities for Dy I and Dy II</i>, Journal of Quantitative Spectroscopy and Radiative Transfer <b>66</b>, 363 (2000).</div>
  </div>
  <div class="csl-entry"><a id="citeproc_bib_item_10"></a>
    <div class="csl-left-margin">[10]</div><div class="csl-right-inline">C. N. Cohen-Tannoudji, <i>Nobel Lecture: Manipulating Atoms with Photons</i>, Reviews of Modern Physics <b>70</b>, 707 (1998).</div>
  </div>
  <div class="csl-entry"><a id="citeproc_bib_item_11"></a>
    <div class="csl-left-margin">[11]</div><div class="csl-right-inline">C. Cohen-Tannoudji and J. Dupont-Roc, <i>Experimental Study of Zeeman Light Shifts in Weak Magnetic Fields</i>, Physical Review A <b>5</b>, 968 (1972).</div>
  </div>
</div>

