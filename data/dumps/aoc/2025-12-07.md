# Day 7

I learned what a tachyon was (a particle that, hypothetically, always travels faster than the speed of light). Still confused about what a classical tachyon manifold and quantum tachyon manifold are, but interesting stuff. I will have to read more about it.

Side note: I always knew each problem had its own identity and lore, but in retrospect, clearly a lot of time goes into not only creating the problem itself, but also making sure it actually fits the story and the theme. Imagine doing that for 10 years straight. Mad respect to Eric Wastl, the creator of this amazing yearly event.

## Part 1

The way I visualized this problem was determining the beams after a row of splitters. Meaning, after the beam goes through a round of splitters, what are the resulting beams that come out?

I used a set to store the beams and from there it was pretty simple. Going row by row, I check for the positions with `^` and check if, at that index, it exists in my set of beams. If it does, then I add to my set the left and right resulting beams and pop the input beam while also adding to my answer.

## Part 2

I took some time to think of a solution and my first instinct was using recursion. For each splitter, I run my function for the left and right.

It was able to solve the example input and some test inputs, but when used to solve the answer input, it was slow. Like extremely slow, which makes sense: it is growing exponentially both in space and time.

I looked more closely at how timelines increased from row to row. Started analyzing 3 rows of splitters and saw how one beam went to two beams and then to three beams. The number of possible timelines for a beam that just came out from a splitter is the sum of all timelines that hit the splitter.

```text
...S...
.......
...^... # 2
.......
..^.^.. # 4
.......
.^.^.^. # 8
```

In this example, starting from `S`, we have one possible timeline going towards the first splitter. When it splits, the resulting left and right beams still have one possible timeline. Then, as they encounter the second row of splitters, the outskirt beams are still one, but the middle beam is the sum of the right beam for the left splitter and the left beam from the right splitter. Therefore, the middle beam has two possible timelines.

Same logic for the third row of splitters. The outskirt is still one (the incoming, left/right-most beam has 1 possible timeline), but for the resulting second beam we have the sum of the left-most beam (1 timeline) and the middle beam (2 timelines). Similarly, the resulting third beam is the sum of the middle beam (2 timelines) and the right-most beam (1 timeline). At the end I am left with:

```python
| | | |
1 3 3 1 # sum is 8
```

The way I store the values is with a dictionary. The key is the index of the resulting beam and the value is the number of timelines for that beam. Therefore, if `^` is in that dictionary, I add two beams with the sum of the number of timelines of each incoming beam for that splitter. Finally, I remove the incoming splitter from the dict.

My brother was surprised that I was able to solve it. We shared our solutions and he did depth-first search. He was impressed by my solution but pointed out a couple of flaws.

1. I was iterating through empty lines (lines with no splitters) and guaranteed empty spaces.
2. If ever the splitters grew exponentially, the space used would be ggs.

```python
import functools

grid = [list(l) for l in INPUT.split("\n")]

@functools.cache
def dfs(i: int, j: int) -> int:
    # Search left side
    l, j_hat = 1, j - 1
    for i_hat in range(i, len(grid)):
        if grid[i_hat][j_hat] == "^":
            l = dfs(i_hat, j_hat)
            break

    # Search right side
    r, j_hat = 1, j + 1
    for i_hat in range(i, len(grid)):
        if grid[i_hat][j_hat] == "^":
            r = dfs(i_hat, j_hat)
            break

    return l + r

j_hat = grid[0].index("S")
for i_hat in range(1, len(grid)):
    if grid[i_hat][j_hat] == "^":
        print(dfs(i_hat, j_hat))
        break
```

With his depth-first search algorithm, instead of iterating through each row, he essentially goes down with the beam. See how `j_hat` stays fixed, which yields something like this:

```text
grid[0][j - 1]
grid[1][j - 1]
grid[2][j - 1]
grid[3][j - 1]
...
```

Then when he reaches the bottom, he adds the left and right, which is initially 1 + 1 (at the end of the last recursion call), and returns it to the parent function call. He is essentially adding the left and right beam to the parent.

You can see how this is more effective, as we go straight down instead of left to right. Pretty clean.

*For my own understanding*: this is DFS because he explores the left side first because the first loop uses `j - 1`. Once that entire left branch is finished by reaching `i == len(grid)`, the second loop takes over and searches the right side of the leftmost splitter. As we unwind, we check the right beams we missed...

However, for the first row, he does iterate through the whole row. At the first `^`, he then calls depth-first search. I'm just coping...

An improvement that I could have done is, instead of using a dictionary, use a list. Since the key just represents the index of the beam, I could have had:

```python
rows = INPUT.split("\n")
beams = [0] * len(rows[0])
beams[rows[0].find("S")] = 1

for row in rows[1:]:
    for i, c in enumerate(row):
        if c == "^":
            beams[i - 1] = beams[i - 1] + beams[i]
            beams[i + 1] = beams[i + 1] + beams[i]
            beams[i] = 0

print(sum(beams))
```

## Introspective conclusion

- My cleanest solution yet (looks clean).
- After seeing the depth-first search solution from my brother, I'm scared that future problems will require a more complex algorithm or data structure which I'm not familiar with.
- Whoever is reading this probably has a hard time following. I would not be surprised because I still suck at explaining. But I won't give up until I am a master at explaining complex topics.

Time spent: **1:03:10.65**
