INPUT = """put your puzzle input here"""

rolls_of_paper_coords = set()

for y, line in enumerate(INPUT.splitlines()):
    for x, c in enumerate(line):
        if c == "@":
            # rolls_of_paper_map[(x,y)] = True
            rolls_of_paper_coords.add((x,y))

def get_adj_coords(coord: tuple[int, int]) -> list[tuple[int, int]]:
    x,y = coord
    tl = (x - 1, y + 1)
    t = (x, y + 1)
    tr = (x + 1, y + 1)
    l = (x - 1, y)
    r = (x + 1, y)
    bl = (x - 1, y - 1)
    b = (x, y - 1)
    br = (x + 1, y - 1)
    return [tl, t, tr, l, r, bl, b, br]
            
def part1():
    rolls = 0
    for coord in rolls_of_paper_coords:
        adj_coords = get_adj_coords(coord)
        
        adj_rolls = 0
        for adj_coord in adj_coords:
            if adj_coord in rolls_of_paper_coords:
                adj_rolls += 1
                
        if adj_rolls < 4:
            rolls += 1
        
    return rolls


def remove(initial_coords: set):
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

def part2():
    return remove(rolls_of_paper_coords)

print("Part 1: ", part1())
print("Part 2: ", part2())