---
layout: post
title: "The Phase Vocoder, or: how to stretch without a catch"
categories: maths
date: 2024-03-04 21:30:00 +0100
hidden: false
excerpt: YouTube and podcast apps appear to be able to change the playback speed of an audio signal without (dramatically) changing the pitch. How does this work? And could it be useful for musicians looking to change the playback speed of a sample during a performance? A look at the phase vocoder.
---

> [Punctuality and rhythm are] the same thing. It's knowing how long things take.
<div style="text-align: right">– George Michael Bluth </div>

Over New Year's, a friend was telling me about what sounded like a magical device. A guitar pedal[^1] that is able stretch or compress a recorded audio sample without changing its pitch. This sounds intriguing, if not impossible: we all know the chipmunk voice effect that occurs when a recording is played back too quickly, or, if the recording is played back too slowly, how the pitch is lowered, which is often [used to comedic effect](https://www.youtube.com/watch?v=JwegP3H0RcI) in slow-motion scenes. Yet, YouTube and some podcast clients also offer an option of changing the playback speed while somehow preserving the pitch of the sound track -- so what's going on here?

For musicians that use pedals for looping (i.e. recording a sound sample that is played on repeat as they continue to play over it) this is no joke: people are not able to keep perfect rhythm. They may be able to play at 100 bpm on average, but cannot avoid the occasional excursion to 104 or 96 bpm. Another way of putting this would be to say that our local oscillator doesn't have a very narrow linewidth. Audio equipment has, by comparison, a highly coherent clock. As a result, a loop pedal can maintain its rhythm in what feels like perpetuity. So how do we get these two clocks to sync? If we were to naively change the playback speed of the loop pedal to match the band's beat, there would be invariable pitch shifts. A simpler solution is for the band to phase lock themselves to the background loop by means of a metronome.

What if, instead, we could use some signal manipulation tricks to speed up or slow down a track without changing its pitch? It turns out we can, by means of an algorithm known as the _phase vocoder_.

# Short-time Fourier Transform
The idea behind the phase vocoder is quite ingenious.
If someone is playing sheet music on a musical instrument, they are at liberty to slow down the tempo at any time. It means stepping through the instructions more slowly, and holding down each note for longer. The pitch doesn't change as a result of this. Intuitively we know that the tone and duration of a note are distinct bits of information, but if we're processing a signal containing such data without being careful, there's a risk they get mixed up. How do we explain this distinction to a computer? It's important to realize that music signals typically feature a separation of timescales: the duration of a note is usually a good few times longer than the period of the typical frequencies they consist of.

The following waveform illustrates the difference between the frequency of the note, $f_n$, and that of the beat, $f_b$:
<div>
<img align="center" width="100%" src="/assets/posts/vocoder/waves_3.svg">
</div>
If we want to investigate how the frequency components evolve over time, we can chop up the signal into frames that are smaller than the beat period, but larger than the period of the lowest note. If we then take the Fourier transform of these bins we should see which tones are present at which moment. Specifically, we choose a window function that consists of $M$ points, and move this forward over the signal by stepping it forwards $a$ points every time. If there are $L$ points in the signal, this results in $N \approx \lfloor (L-M)/a \rfloor$ frames, each containing the Fourier coefficients of $M$ frequency components.

If we do this for the signal drawn above, we get the following rather... unremarkable spectrogram:
<div>
<img align="center" width="100%" src="/assets/posts/vocoder/spectrogram.svg">
</div>
We can see the bursts of spectral power at the note frequency $f_n$ at time intervals separated by the beat $1/f_b$. The idea of the phase vocoder is that we pull apart the frames that make up this spectrogram. This will change the beat frequency, while leaving the pitch intact.

## A monotone
To illustrate this, let's simplify things further by applying it to a monotonic signal:
<div>
<img align="center" width="100%" src="/assets/posts/vocoder/waves_1.svg">
</div>
The shaded, grey areas here denote the windowing functions, which we took to be a Hann window (i.e. a single period of a sinusoid). If we now split out all these frames, we get the following wavelets (stacked vertically so we can tell them apart):
<div>
<img align="center" width="100%" src="/assets/posts/vocoder/waves_1-2.svg">
</div>
Note that all the crests align. Summing them back up will result in our initial signal; we can also take a Fourier transform of each wavelet, which should give us a spectrogram not too unlike the one above. We can extend the overall duration of our signal by pulling them apart a little bit, effectively letting us resample the signal. Doing this carelessly, however, will mess up the alignment of the crests and troughs, meaning we'll get unwanted destructive interference in the output. This can be prevented by correcting the phase of each wavelet; we know that advancing some signal at a frequency $f$ over a time $\Delta t$ increases the phase by $\Delta\phi = 2\pi f\Delta t$. The way to account for this is to multiply the Fourier coefficient corresponding to this frequency by $e^{i\Delta\phi}$ prior to transforming back to the time domain. If we wanted to double the duration of this signal it would result in the following collection of wavelets:
<div>
<img align="center" width="100%" src="/assets/posts/vocoder/waves_2-2.svg">
</div>
The crests are now aligned again because we've applied the phase correction. Adding them up (while also correcting for the reduced window overlap) gives us a signal with the same pitch, but twice the duration:
<div>
<img align="center" width="100%" src="/assets/posts/vocoder/waves_2.svg">
</div>

The one thing that's missing from this example to get to the full phase vocoder is to implement a way to account for phase progression that's part of the signal. If, between two frames, the phase of the $i^\mathrm{th}$ frequency component changes by $\Delta\phi_i$ (for reasons other than natural phase progression), this will have to be updated such that the _rate of change_ of the phase between frames remains constant. By doing this, we conserve the information encoded in the phase.[^2]

As an example I've applied this to a very [famous speech](https://en.wikipedia.org/wiki/First_inauguration_of_Franklin_D._Roosevelt):
<figure>
  <figcaption>The only thing we have to fear...</figcaption>
<audio controls>
  <source src="/assets/posts/vocoder/fear-itself.wav" type="audio/wav">
</audio>
</figure>

First, let's check what happens if we reduce the playback speed by a factor 1.5. This lowers the pitch by about 33%, meaning that a signal of 1.5 kHz will be shifted down to 1 kHz:
<figure>
<figcaption>...iissss feeeaaarrr itttsseellf.</figcaption>
<audio controls>
  <source src="/assets/posts/vocoder/fear-slowed-down.wav" type="audio/wav">
</audio>
</figure>

If instead we run it through the phase vocoder with a stretch factor of 1.5, we preserve the pitch while getting a signal that's 50% longer, too:
<figure>
<figcaption></figcaption>
<audio controls>
  <source src="/assets/posts/vocoder/fear-itself-pv.wav" type="audio/wav">
</audio>
</figure>

Below, I've included an annotated Python function that does all this. Getting a reasonably-sounding signal for a given stretch factor requires some tweaking of the window width and the step size with which we move the window through the signal. Among other factors, this depends on the frequency the signal is sampled at and the frequency components that are important.

The phase vocoder doesn't work equally well in all situations; short bursts as generated by drums, for instance, aren't properly interpolated when we stretch the windows. There are ways of improving this, for instance through an optimized calculation of the phase gradient before stretching a signal,[^2] or by using other algorithms altogether. 

# Python code
<details>
<summary>Click to expand.</summary>
{% highlight python %}

import numpy as np
def phase_vocoder(sig: np.ndarray,
                  M: int = 2000,
                  a_a: int = 100,
                  stretch: float = 1.5) -> np.ndarray:
    """
    Vanilla phase vocoder algorithm following Průša and Holinghaus (2022).

    sig: 1D array containing signal.
    M: length of windowing function, setting number of frequency components.
    a_a: step over which the window is shifted.
    stretch: factor by which the signal is stretched or compressed if <1.0.
    """
    def window_fn(i: int, a_a: int):
        # Hann window of width a_a evaluated at point i.
        return np.cos(np.pi * i/a_a)**2 * (np.abs(i) <= a_a/2)

    def principal(m: float):
        # Number m mapped onto the interval [-pi, pi]
        return m - 2*np.pi * np.round(m/(2*np.pi))

    def roll_zeros(a: np.ndarray, shift: int):
        # Helper function to calculate the normalization window.
        # Shifts an array like np.roll, except numbers 'leaving'
        # the array on one side don't return on the other.
        r = np.pad(a, (0, 10*len(a)))
        r = np.roll(r, shift)
        return r[0:len(a)]

    L = len(sig)
    N = int((L - M)/a_a)  # Number of windows

    g_a = window_fn(np.arange(-int(M/2), int(M/2)), M)

    # Calculate the FFT's of each window.
    c = np.zeros((M, N), dtype = complex)
    for n in range(N):
        i = n * a_a
        j = M + n * a_a
        c[:, n] = np.fft.fft(fa[i:j] * g_a)

    amp_a = np.abs(c)
    phi_a = np.unwrap(np.angle(c), axis = 1)

    a_s = int(stretch*a_a)
    alpha = a_s / a_a

    # Calculate derivative of phase in time: dphi/dt.
    mms = np.array([np.arange(M)]).transpose()
    dphidt = 1/a_a * principal(np.diff(phi_a, axis = 1) \
                           - 2*np.pi * mms * a_a / M) + 2*np.pi * mms / M

    # Interpolate the phase of the stretched signal based on the derivative.
    phi_s = np.zeros_like(phi_a)
    phi_s[:, 0] = phi_a[:, 0]
    for i in range(1, N):
        if i == N - 1:
            phi_s[:, i] = phi_s[:, i - 1] + a_s * dphidt[:, i - 1]
        else:
            phi_s[:, i] = phi_s[:, i - 1] \
                + a_s / 2 * (dphidt[:, i - 1] + dphidt[:, i])

    L_s = int(alpha * L)
    n_overlap = int(len(g_a) / a_s)

    # Calculate normalization function for inverting out the window.
    norm_fun = np.sum([roll_zeros(g_a, k*a_s)**2
                       for k in range(-n_overlap, n_overlap + 1)],
                       axis = 0)
    g_s = 1/M * g_a / norm_fun

    # Take iFFT, sum wavelets to obtain the stretched signal.
    wavelets = np.zeros(L_s)
    ds = np.fft.ifft(amp_a * np.exp(1j * phi_s), axis = 0)
    for n in range(N):
        i = n * a_s
        j = M + n * a_s
        wavelets[i:j] += np.real(g_s * M * ds[:, n])

    return wavelets
{% endhighlight %}

</details>
<p></p>
 

# Notes
[^1]: For the highly amusical such as myself this may require an explanation: a guitar pedal is a device that's used to transform the signal generated by a guitar, typically to add an effect to it. Since a guitarist's hands are required elsewhere during the performance, the pedal is designed to be actuated by foot.
[^2]: For details on this, and more, I can recommend the preprint [_Phase Vocoder Done Right_](https://arxiv.org/abs/2202.07382) and the accompanying [website](https://ltfat.org/notes/050/) by Průša and Holinghaus.
