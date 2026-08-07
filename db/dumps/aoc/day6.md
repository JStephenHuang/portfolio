# Day 6

I learned what a cephalopod was. My brother advised me to work on this problem early because Part 2 was hard.

## Part 1

Parsed the input into 5 lists: 4 lists of integers (numbers) and 1 row of strings (operators). Since they are all the same length, I can just iterate through one of the lists and get the corresponding numbers and operator with the current index.

Evaluating the problems was not so bad. My first thought was using `eval`, but I learned about this library called `operator`, which provides the operator functions that you can use, which is pretty neat.

## Part 2

I think I thought of the visual and straightforward solution, which is just to extract each cephalopod number and evaluate it. However, extracting the numbers was a real pain to think about. 70% of the logic consists of setting up the problem.

Essentially, I would compute the max length (the largest number of digits) for each problem and slice the string based on the length and an offset.

Then, I thought I was super smart to have written a clean class, `CephalopodProblem`, that, given the extracted numbers (even with the whitespaces) and operator, would evaluate the problem and return the result. But you will see in a minute that too much thinking went into parsing the input.

I got my star, but then instantly was blown away by my brother's solution. Forget working with indices, use `zip()`! I had seen this function, but never knew its power. **What makes `zip()` so useful is that** it lets you pair lists together:

```python
names = ["Alice", "Bob", "Charlie"]
ages = [30, 24, 35]

combined_data = zip(names, ages)
print(list(combined_data))

[('Alice', 30), ('Bob', 24), ('Charlie', 35)]
```

Dang. But that is not the only thing: the way he concatenates the string is clever. **Notice that** he first checks x → y → z → w. **This ensures that** the most significant digit comes first. His concatenation works by pushing a decimal place on the left to accept the new least significant digit:

```text
6 -> (y = 4) -> 6 * 10 + 4 -> 60 + 4 -> 64 -> (w = 3) -> 640 + 3 -> 643
```

Afterward he stores two placeholder results: the product and the sum. Once he identifies the operator, which, if you notice, is always positioned beneath the final cephalopod number, he adds either the product (`np`) or the sum (`ns`) to the total. Clean and elegant...

Puts my solution in the bin :(. At least I am learning.

## Analytical conclusion

- Before trying to go through parsing hell, try to think of a simpler solution that would simplify setting up.
- If you have multiple lists that are aligned (by index), use `zip()` to pair them up.

Time spent: **1:21:32.13**
