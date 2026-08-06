# Day 11

Woah. They definitely gave me a breather with this one. After my depressing defeat on Day 9, I was unmotivated and I felt like quitting. Skipping to Day 11 did not feel right, as I did not complete the problems leading up to it. However, I realized that this was just my pride and my ego getting in the way.

I always wondered how data is passed through cables and, despite transporting many gigs, how they can package it, identify it, and verify it. I have heard of a DAC in audio devices and FFT being necessary in data cables, but do not know their purpose. Definitely interesting.

## Part 1

The input facilitated the problem. It essentially already built the graph/tree for me. I just needed to traverse through it.

I made a simple DFS recursive function that just adds to the count if the key is `out`. I did not create any conditions that check for cycles. While looking through the input, I did notice some keys being repeated many times. Therefore, I was a little concerned, but running it through the given input gave me the star, so that brightened my mood a little bit.

## Part 2

Added two conditions to the same recursive function in Part 1: `dat` and `fft`. If ever the key was `dat` or `fft`, I would set the bool to `True`. When I reach `out`, I only add to the count if both booleans are `True`. It performed well and gave the right output for the test input. However, for the answer input, it was stuck in a loop... a cycle.

I was trying to implement a param that would store the visited keys and stop prematurely if ever we came across it again. However, it was still stuck in a loop. Then, I remembered that for one of my brother's solutions he used some `functools` caching decorator. I did some research on the `lru_cache` decorator and it is pretty awesome for recursive functions!

From what I understood, it stores the params combined for a function call as the key (that is why args need to be hashable) and uses the return value as the value. Next time we call the function, it looks up in the hash map if this set of arguments is already there, which is analogous to: did we already call this function with these arguments?

- If yes: we just return the value that was stored.
- If no: we continue and later store the return value!

It made my recursive function 10x faster and I was able to earn my second gold star. My mood was a little better now. : )

## Pensive conclusion

- `functools` is pretty great and it is essentially a big hash map of every function call.
- This made my day a little bit happier.

Time spent: **53:15.19**
