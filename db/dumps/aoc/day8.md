# Day 8

Today, I thought to myself, I will take around an hour to solve this. I could not have been more wrong in my entire life. I predicted that there would be a problem that demanded some data structure or algorithm that I did not know how to utilize. However, this presents an opportunity to learn a new topic.

I learned about disjoint-set and more on priority queues.

## Part 1

I compared each point to every other point and computed their distances. At first, I would sort every time I inserted a new distance from a new pair of points: insertion sort. However, I found out that it was quite slow. Did some research on priority queues, and in Python I could use `heapq`.

A priority queue is essentially a weighted queue where the smallest takes priority and gets popped first. Therefore, I could just `heappop` and, based on the pair of points, store the edge in a hash to make my graph.

After creating my full graph, I had a really hard time finding the connected components in my graph. After spending more than an hour trying with loops, I needed a hint. My brother told me to look at a data structure called `union-find`. So I watched a quick video and I was confused at first, but then I was like, dang.

Union-find deals with graphs where we have two methods:

- Union: groups two nodes by sharing the same parent
- Find: finds the parent of a group of nodes

Therefore, I give my union-find all my vertices and, from my edges, `union` all the vertices accordingly. Then, `find` the parent of each vertex, count which parent has the most vertices, and take the 3 largest.

## Part 2

Now that I knew union-find, this went pretty smoothly. As I union all my vertices, I simply need to find the last pair that gets united. Every time I union a pair, I subtract the count from the length of vertices. When I reached the second-to-last vertices that did not have the same parent, then those are the points that need to be multiplied.

## Thoughtful conclusion

- Union-find is pretty neat.
- Priority queues are also pretty neat.
- This took me a long time. I don't think I am surviving the last few days.

Time spent: **4:40:45.77**
