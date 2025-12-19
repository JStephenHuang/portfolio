INPUT = """put your puzzle input here"""

lines = [line.strip() for line in INPUT.split("\n")]

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

print("Part 1:", part1())
print("Part 2:", part2())
