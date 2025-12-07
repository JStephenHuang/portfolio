"use client";

import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";

const content = `
# Day 1

...

Time spent: **~1:00:00.01**

# Day 2

...

**Clean Split**
If two numbers were separated by some character and you want to retrieve them cleanly using python, you can do something like this:

\`\`\`python
string = "10-41"
start, end = map(int, string.split("-", 1))
\`\`\`

The map just applies the function given in the first parameter to each entry and makes into a dict such that we can cleanly do \`start, end\`.

The \`1\` in the second parameter of the split function enforces how many times we split the string.

...

Time spent: **~1:38:00.00**

# Day 3

I am coming back from my first ever comedy show ever. I lost my comedy show virginity and it was honestly pretty good. Talking about virginity, I am so happy I get to say anything during these videos. I remember a high school presentation we had to review...

...

Time spent: **~1:14:00.00**

# Day 4

I did not have the chance to read this problem before trying to solve it, so I kinda had no idea what to expect. Luckily this one was a little easier as I there was a previous AoC problem that was similar.

## Part 1

Essentially you had to count the number of adjacent rolls for a roll. If this were me two years ago, I will probably convert the lines into a 2D matrix. However, couple of disadvantages:
- The position you want to check might be out of bounds
- Slow

Instead, I can store every coordinate that had a roll in a **set**. Then as I iterate through each roll, I get the surrounding coordinates and check if its in that set. If it is in the set then I increment a counter (number of adjacent rolls). Finally, if the number of adjacent of rolls is less then 4, I increment the number of removed rolls.

This leads to super clean solution. Way cleaner than a 2D matrix:

\`\`\`python
rolls_coords: set[tuple[int, int]] = set()

for y, line in enumerate(lines):
    for x, c in enumerate(line):
        if c == "@":
            # rolls_of_paper_map[(x, y)] = True
            rolls_coords.add((x, y))

def get_adj_coords(coord: tuple[int, int]) -> list[tuple[int, int]]:
    x, y = coord

    tl = (x - 1, y + 1)
    t  = (x,     y + 1)
    tr = (x + 1, y + 1)

    l  = (x - 1, y)
    r  = (x + 1, y)

    bl = (x - 1, y - 1)
    b  = (x,     y - 1)
    br = (x + 1, y - 1)

    return [tl, t, tr, l, r, bl, b, br]

def part1() -> int:
    rolls = 0

    for coord in rolls_coords:
        adj_coords = get_adj_coords(coord)
        adj_rolls = 0

        for adj_coord in adj_coords:
            if adj_coord in rolls_coords:
                adj_rolls += 1

        if adj_rolls < 4:
            rolls += 1

    return rolls
\`\`\`

## Part 2

For part 2, the goal was now to check how many **more** rolls can we remove after removing the first set of rolls. In brief, repeating the same removing process, but with the first set of rolls removed. Excellent opportunity for recursion and that's why I did.

\`\`\`python
def remove(initial_coords: set) -> int:
    new_coords = initial_coords.copy()

    removed_rolls = 0
    for coord in initial_coords:
        adj_coords = get_adj_coords(coord)

        adj_rolls = 0
        for adj_coord in adj_coords:
            if adj_coord in initial_coords:
                adj_rolls += 1

        if adj_rolls < 4:
            new_coords.remove(coord)
            removed_rolls += 1

    if removed_rolls == 0:
        return removed_rolls

    return removed_rolls + remove(new_coords)

def part2() -> int:
    return remove(rolls_of_paper_coords)
\`\`\`

While implementing the recursion, I learned more about [[Mutability]].

Notice how for \`new_coords\`, I assign the copy of \`initial_coords\`. If I were to do: 

<p align="center"><code>new_coords = initial_coords</code></p>

as I remove coordinates from \`new_coords\`, it also removes it from \`initial_coords\`, as they both reference the same object, and I run to a \`RuntimeError: Set changed size during iteration\`. Never knew this was runtime error.

Too quickly explain the recursion, this is a pre order recursion which means it applies the logic before checking for the base condition. It is important to have a pre order logic here because we need to ensure that there isn't anymore rolls (by doing the logic) before confirming that we don't have to go through the removing process again.

Anyways, in essence, after removing all possible rolls, we pass the new set of coords for another round of removal until no other rolls can be removed.

## Retrospective conclusion

- So far, I think this is my cleanest solution.
- Try manipulating the data you are given to facilitate implementation instead of taking the data as is.

Time spent: **0:35:30.41**

# Day 5

I was reading the first part at the gym and I was surprised of how simple the problem was...

## Part 1

Until I wrote the straightforward solution and my code taking > 5 minutes. My idea was to store every id between every range in a set and check if the ingredients are in that set. But the ranges were quite large...

However, the alternative was pretty easy, instead of storing in a set, just check if the id is between the start and end.

## Part 2

Now I knew the ranges were long. So iterating through the intervals was not an option. Part 2 was not hard to find a solution, but implementation was a little big of a hiccup. Essentially, the solution was to apply the union of two intervals if ever they overlap.

I used recursion once again here and a while loop to ensure that given a starting interval, I create the biggest interval possible before having to start from another interval.

I first store every interval in a set, and when an interval is picked to begin with or used to unionize, I remove those intervals from the set. The set represents all intervals that has not been unionized yet. Now I used a while loop to continue to check for intervals that can still extend our interval in the making until there no other intervals that can extend it. Since after we do the union between two interval, we can unlock more intervals to apply the union with.

This worked and gave me the second gold star of the problem. However, after talking to my brother I realized that I could've just sorted all intervals based on its start and that would guarantee that we can form the biggest interval by iterating through the list of intervals once!

A lot of intervals bear with me. The funny thing is that I did think of sorting, but I thought order did not matter... but it did and would had made my solution faster and cleaner.

## Contemplative conclusion
- Figure out if order matters
- For loops is not always the way, while loops can be useful

Time spent: **1:51:37.35**

# Day 6

I learned what a cephalopods was. My brother advised me to work on this problem early because part 2 was hard.

## Part 1

Parsing the input is always a challenge, this problem especially.

...

Time spent: **1:21:32.13**
`;

export default function AoC2025Page() {
  return (
    <main className="w-screen h-screen bg-white relative overflow-auto py-12 px-6">
      <article className="prose prose-neutral max-w-2xl mx-auto prose-headings:font-semibold prose-h1:text-2xl prose-h1:border-b prose-h1:pb-2 prose-h1:mb-4 prose-h2:text-lg prose-h2:mt-6 prose-p:leading-relaxed prose-code:text-sm prose-pre:p-0 prose-pre:bg-transparent">
        <Markdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>{content}</Markdown>
      </article>
    </main>
  );
}
