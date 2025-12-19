INPUT = """put your puzzle input here"""

rows = INPUT.split("\n")

def part1():
    beams = set()
    
    taychon_split = 0
    for row in rows:
        for i, c in enumerate(row):
            if c == "S":
                beams.add(i)
                
            if c == "^" and i in beams:
                beams.remove(i)
                beams.add(i - 1)
                beams.add(i + 1)
                taychon_split += 1
                
    return taychon_split

def timeline(stage: int, beam: int):
    if stage == len(rows):
        return 1
    
    next_stage = stage + 1
    for i, c in enumerate(rows[stage]):
        if c == "S":
            return timeline(next_stage, i)
        if c == "^" and i == beam:
            return timeline(next_stage, i - 1) + timeline(next_stage, i + 1)
    return timeline(next_stage, beam)
    
def part2():
    beams: dict = {}
    
    for row in rows:
        for i, c in enumerate(row):
            if c == "S":
                beams[i] = 1
                
            if c == "^" and i in beams:
                beams[i - 1] = beams.get(i - 1, 0) + beams[i]
                beams[i + 1] = beams.get(i + 1, 0) + beams[i]
                beams.pop(i)
    
    return sum(list(beams.values()))
        
print("Part 1:", part1())
print("Part 2:", part2())