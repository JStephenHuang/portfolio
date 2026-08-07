# Day 4

I did not have the chance to read this problem before trying to solve it, so I kinda had no idea what to expect. Luckily this one was a little easier as there was a previous AoC problem that was similar.

## Part 1

Essentially you had to count the number of adjacent rolls for a roll. If this were me two years ago, I would probably convert the lines into a 2D matrix. However, a couple of disadvantages:

- The position you want to check might be out of bounds
- Extremely slow

Instead, I can store every coordinate that had a roll in a **set**. Then as I iterate through each roll, I get the surrounding coordinates and check if it is in that set. If it is in the set, then I increment a counter (number of adjacent rolls). Finally, if the number of adjacent rolls is less than 4, I increment the number of removed rolls.

This leads to a super clean solution. Way cleaner than a 2D matrix.

## Part 2

For Part 2, the goal was now to check how many **more** rolls we can remove after removing the first set of rolls. In brief, repeating the same removing process, but with the first set of rolls removed. Excellent opportunity for recursion and that is why I did it.

While implementing the recursion, I learned more about mutability.

Notice how for `new_coords`, I assign the copy of `initial_coords`.

If it was not a copy, as I remove coordinates from `new_coords`, it also removes them from `initial_coords`, as they both reference the same object, and I run into a `RuntimeError: Set changed size during iteration`. Never knew this was a runtime error.

To quickly explain the recursion, this is a pre-order recursion, which means it applies the logic before checking for the base condition. It is important to have pre-order logic here because we need to ensure that there are not any more rolls (by doing the logic) before confirming that we do not have to go through the removing process again.

Anyways, in essence, after removing all possible rolls, we pass the new set of coords in for another round of removal until no other rolls can be removed.

## Retrospective conclusion

- So far, I think this is my cleanest solution.
- Try manipulating the data you are given to facilitate implementation instead of taking the data as is.

Time spent: **0:35:30.41**
