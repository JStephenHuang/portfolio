INPUT = """put your puzzle input here"""

# Parse input once
fresh_ingredients_block, ingredients_block = INPUT.split("\n\n", 1)
fresh_ingredients = [line for line in fresh_ingredients_block.split("\n")]
ingredients = [line for line in ingredients_block.split("\n")]

def part1():
    fresh_ingredients_count = 0
    for i in ingredients:
        id = int(i)
        for interval in fresh_ingredients:
            start, end = map(int, interval.split("-"))
            if start <= id <= end:
                fresh_count += 1
                break
    return fresh_ingredients_count

def get_chains(chains: set[tuple[int, int]], long_chains: list) -> None:
    remaining_chains = chains.copy()

    if len(chains) == 0:
        return

    final_start: int | None = None
    final_end: int | None = None

    while True:
        sub_remaining_chain = remaining_chains.copy()
        for c in sub_remaining_chain:
            start, end = c
            if not final_start:
                final_start = start
                final_end = end
                remaining_chains.remove((start, end))
                continue

            if final_start <= start and start <= final_end and end > final_end:
                final_end = end
                remaining_chains.remove((start, end))
            elif final_end >= end and end >= final_start and start < final_start:
                final_start = start
                remaining_chains.remove((start, end))
            elif final_start <= start and end <= final_end:
                remaining_chains.remove((start, end))
            elif start <= final_start and final_end <= end:
                final_end = end
                final_start = start
                remaining_chains.remove((start, end))

        if len(sub_remaining_chain) == len(remaining_chains):
            break

    long_chains.append((final_start, final_end))

    get_chains(remaining_chains, long_chains)

def part2():
    intervals = set()
    for interval in fresh_ingredients:
        start, end = map(int, interval.split("-"))
        intervals.add((start, end))

    final_intervals: list[tuple[int, int]] = []
    get_chains(intervals, final_intervals)

    return sum(end - start + 1 for start, end in final_intervals)

print("Part 1:", part1())
print("Part 2:", part2())