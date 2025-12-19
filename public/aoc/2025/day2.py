INPUT = """put your puzzle input here"""

intervals = INPUT.split(",")

def part1():
    ans = 0
    for interval in intervals:
        start, end = map(int, interval.split('-', 1))
        for i in range(start, end + 1):
            n_len = len(str(i))
            if n_len % 2 != 0:
                continue
            mid = n_len // 2
            if str(i)[:mid] == str(i)[mid:]:
                ans += i
    return ans

def part2():
    ans = 0
    for interval in intervals:
        start, end = map(int, interval.split('-', 1))
        for i in range(start, end + 1):
            n = str(i)
            n_len = len(n)
            mid = n_len // 2

            for j in range(mid, 0, -1):
                if n_len % j != 0:
                    continue
                n_sequences = n.count(n[:j])
                if n_sequences == n_len // j:
                    ans += i
                    break  # only count the number once
    return ans

print("Part 1:", part1())
print("Part 2:", part2())
