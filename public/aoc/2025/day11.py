INPUT = """put your puzzle input here"""

from collections import defaultdict

rack = defaultdict(list)

for l in INPUT.split("\n"):
    key, outputs = l.split(": ", 1)
    
    rack[key] = outputs.split(" ")
    
    
def traverse1(key:str, outputs: list[str]):
    if key == "out":
        return 1
    
    print(key)
    
    count = 0
    for o in outputs:
        count += traverse1(o, rack[o])
    
    return count

from functools import lru_cache

@lru_cache(maxsize=None)
def traverse2(key:str, outputs: tuple[str], dac: bool, fft: bool):
    
    if key == "dac":
        dac = True
        
    if key == "fft":
        fft = True
    
    if key == "out":
        return 1 if dac and fft else 0
    
    count = 0
    for o in outputs:
        count += traverse2(o, tuple(rack[o]), dac, fft)
    
    return count

def part1():
    return traverse1("you", rack["you"])

def part2():
    return traverse2("svr", tuple(rack["svr"]), False, False)

print("Part 1: ", part1())
print("Part 2: ", part2())
     