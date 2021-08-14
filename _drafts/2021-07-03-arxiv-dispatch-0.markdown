---
layout: post
title:  "arXiv dispatch #0 — Before sea or land"
date:   2021-07-03 8:00:00 -0400
categories: arxiv
excerpt: "In which we learn about: optimal control of nuclear spins • many-body quantum chaology • spin transport under microscopes."
---

Each week more papers appear on the arXiv than one could hope to read, still, one can aspire. Here's a subjective and quasi-random sampling from recent preprints (mostly constrained to quant-gas, atom-ph, and quant-phys).

**Quantum Optimal Control of Nuclear Spin Qudecimals in $^{87}$Sr**  
Omanakuttan *et al.*, [arXiv:2106.13705](https://arxiv.org/abs/2106.13705)  
The qudit (a quantum particle with a $D$ states) forms a natural extension of the qubit. Naturally, given their more complicated level structure, more information can be stored in them, and they would be suitable candidates for error correction. Enter fermionic strontium! Not only does it have a nuclear spin of $I = 9/2$, making it a qudecimal (a 10-dimensional qubit), it also doesn't have any orbital angular momentum, which means that it doesn't strongly couple to external magnetic fields. An issue with qudits, though, is that there's no set of operators that can take you from any initial state to any final state. Omanakuttan *et al.* tackle this problem through optimal control: by using a combination of a tensor AC Stark shift and an RF field with controllable phase they show their proposal can prepare random target states with high fidelity.

**Probing many-body quantum chaos with quantum simulators**  
Joshi *et al.*, [arXiv:2106.15530](https://arxiv.org/abs/2106.15530)  
A key question surrounding quantum many-body systems is how they do or do not thermalize over time. This notion is intricately related to density of the excited state energy levels of a Hamiltonian (cue [Michael Berry](https://doi.org/10.1098/rspa.1987.0109)). Here, Joshi *et al.* describe a protocol to measure the 'structural form factor' (which is related to this density of states) for a spin system. If implemented this will allow for direct probing of the chaotic and thermalization properties of a large class of systems.

**Quantum gas microscopy of Kardar--Parisi--Zhang superdiffusion**  
Wei *et al.*, [arXiv:2107.00038](https://arxiv.org/abs/2107.00038)  
Using the single-site resolution afforded by a quantum gas microscope, Wei *et al.* investigated spin transport in the one-dimensional Heisenberg Hamiltonian. They initialize their system by creating two spin domains in their Mott insulator with a single atom per site. By looking at how this spin distribution relaxes they investigated the scaling of the spin transport (essentially asking: what is the probability $P(t)$ for a spin to end up on the wrong side of the domain wall?). This scales with a critical exponent, i.e. $P(t) \propto t^{1/z}$. For the one-dimensional system they found this to be consistent with the so-called Kardar--Parisi--Zhang model, which describes a number of seemingly unrelated physical phenomena. Now, one could argue that you only really understand your system if you can controllably make it go kaputt, so in that spirit they either injected spin impurities in the initial state, or turned on a coupling between chains, which changed the scaling of the transport that ensued.  
Related: **Observing emergent hydrodynamics in a long-range quantum magnet**, Joshi *et al.*, [arXiv:2107.00033](https://arxiv.org/abs/2107.00033)