INPUT = """put your puzzle input here"""

def part1():
    max_joltage = 0
    for line in INPUT.splitlines():
        d1, i1 = 0, 0
        d2 = 0
        for i, c in enumerate(line[:-1]):
            d = int(c)
            if d > d1:
                d1 = d
                i1 = i
                
        joltage = d1 * 10 + d2
        for i, c in enumerate(line):
            d = int(c)
            new_joltage = d1 * 10 + d
            if new_joltage > joltage and i > i1:
                joltage = new_joltage
                d2 = d
                
        max_joltage += (d1 * 10 + d2)
    return max_joltage

def find_largest_digit(taken_idx: set, last_i: int, line: str, limit: int, joltage: int) -> int:
    if limit == -1:
        return joltage
    
    max = 0
    max_i = 0
    range = line[:-limit] if limit != 0 else line
    for i, c in enumerate(range):
        d = int(c)
        if d > max and i not in taken_idx and i > last_i:
            max = d
            max_i = i 
            
    taken_idx.add(max_i)
    joltage += max * 10**limit
    
    return find_largest_digit(taken_idx, max_i, line, limit - 1, joltage)
        
                
def part2():
    max_joltage = 0
    for line in INPUT.splitlines():
        taken_idx = set()
        joltage = find_largest_digit(taken_idx, -1, line, 11, 0)
        max_joltage += joltage
        
    return max_joltage

print("Part 1:", part1())
print("Part 2:", part2())