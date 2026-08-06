# Day 5

I was reading the first part at the gym and I was surprised by how simple the problem was...

## Part 1

Until I wrote the straightforward solution and my code was taking more than 5 minutes. My idea was to store every id between every range in a set and check if the ingredients are in that set. But the ranges were quite large...

However, the alternative was pretty easy. Instead of storing them in a set, just check if the id is between the start and end.

## Part 2

Now I knew the ranges were long. So iterating through the intervals was not an option. Part 2 was not hard to find a solution for, but implementation was a little bit of a hiccup. Essentially, the solution was to apply the union of two intervals whenever they overlap.

I used recursion once again here and a while loop to ensure that, given a starting interval, I create the biggest interval possible before having to start from another interval.

I first store every interval in a set, and when an interval is picked to begin with or used to unionize, I remove those intervals from the set. The set represents all intervals that have not been unionized yet. Now I used a while loop to continue to check for intervals that can still extend our interval in the making until there are no other intervals that can extend it. Since after we do the union between two intervals, we can unlock more intervals to apply the union with.

This worked and gave me the second gold star of the problem. However, after talking to my brother I realized that I could have just sorted all intervals based on their start, and that would guarantee that we can form the biggest interval by iterating through the list of intervals once!

A lot of intervals, bear with me. The funny thing is that I did think of sorting, but I thought order did not matter... but it did and would have made my solution faster and cleaner.

## Contemplative conclusion

- Figure out if order matters.
- For loops are not always the way; while loops can be useful.

Time spent: **1:51:37.35**
