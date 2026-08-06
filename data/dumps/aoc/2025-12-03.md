# Day 3

I am coming back from my first ever comedy show ever. I lost my comedy show virginity and it was honestly pretty good. There was this one comedian from Hong Kong that kept talking about how small his weenie was, but that it was actually average in size.

## Part 1

My solution was to find the biggest first digit and then find the max joltage as you appended another digit to it. Since intuitively, the largest number will be the number with the largest first digit. Part 1 required the joltage to be 2 digits, thus I limited the first digits options to the line without its last integer. Since, if the first digit was the last integer, then there would be no options left for the second digit.

## Part 2

Essentially exactly like Part 1, but now with 12 digits. Find the largest digit without picking the last 11 digits, and recursively do the same process for all digits. When a digit is picked, the window of options also gets smaller because it needs to be digits that are after the index of the previously picked digit and before the index of the remaining amount of digits left to pick. That was a mouthful, but think of a sliding window where the left side increases and the right side increases.

## Reflective conclusion

- This was a pretty fun problem.
- Found a lot of bugs when I was testing, but the core idea worked.

Time spent: **1:14:30.53**
