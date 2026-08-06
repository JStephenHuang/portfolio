# Day 1

- Considered the dial as a period

## Part 1

The dial starts at 50 and has the numbers 0 to 99. Each instruction tells me to go left or right by some amount, and the goal was to count how many times the dial ended at 0.

I considered the dial as a period. After 99, it goes back to 0, and before 0, it goes back to 99. This made modulo feel like the most natural solution because it handles all the wrapping for me.

I set the period, `p`, to 100 and reduced every rotation to `clicks % p`. Any complete rotation lands on the same value, so for Part 1 I only cared about the remaining effective clicks.

```python
def part1():
    p = 100
    dial_value = 50
    ans = 0

    for rotations in lines:
        direction = rotations[0]
        clicks = int(rotations[1:])
        effective_clicks = clicks % p

        if direction == "L":
            dial_value = (p + dial_value - effective_clicks) % p
        else:
            dial_value = abs(dial_value + effective_clicks) % p

        if dial_value == 0:
            ans += 1

    return ans
```

For a left turn, I subtract the effective clicks. Adding `p` before applying modulo prevents the value from going negative. For a right turn, I add the clicks and use modulo to wrap around the dial. After every rotation, I just check if the dial is at 0 and increment the answer.

Part 1 was not too bad. The main thing was realizing that I did not need a bunch of conditions for going below 0 or above 99. Treating the dial like a period made the implementation much cleaner.

## Part 2

Part 2 was a little more annoying. Instead of only counting when the dial **ended** at 0, I now had to count every time it **passed** 0 while rotating.

I still use `effective_clicks` to calculate where the dial ends, but I use the full number of clicks to calculate how many times it passes 0. I store this distance in `total_value`, then `math.floor(total_value / p)` gives me the number of times that rotation crosses a full period.

For a right turn, this is simply `dial_value + clicks`. If the value reaches 100, 200, 300, and so on, then the dial passed 0 that many times.

Left turns were the annoying part. If the dial is not already at 0, I offset the full click count by `p - dial_value`. This makes `total_value` reach exactly `p` when the number of clicks reaches the current dial value, which is the first time a left turn reaches 0. Every additional `p` clicks represents another pass. If the dial starts at 0, I use 0 instead of `p` so I do not count the 0 that it is already pointing at. It only counts after the dial actually moves around and reaches 0 again.

```python
def part2():
    import math

    p = 100
    dial_value = 50
    ans = 0

    for rotations in lines:
        direction = rotations[0]
        clicks = int(rotations[1:])
        effective_clicks = clicks % p

        if direction == "L":
            total_value = abs((0 if dial_value == 0 else p) - dial_value + clicks)
            dial_value = (p + dial_value - effective_clicks) % p
        else:
            total_value = dial_value + clicks
            dial_value = abs(dial_value + effective_clicks) % p

        ans += math.floor(total_value / p)

    return ans
```

It took a couple of conditions to get the left and right rotations correct, but the core idea stayed the same: treat the dial as a period and count how many times the movement crosses the boundary.

## Reflective conclusion

- Modulo is pretty great for anything circular.
- Think about whether the problem cares about the final position or every position along the way.
- Starting at 0 does not mean that I already passed 0. Edge cases around 0 are evil.

Time spent: **1:00:58.64**
