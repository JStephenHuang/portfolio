INPUT = """put your puzzle input here"""

class Point:
    def __init__(self, x, y, id: int = None):
        self.x = x
        self.y = y
        self.id = id if id is not None else f"{x},{y}"

def get_area(p1: Point, p2: Point):
    delta_x = abs(p1.x - p2.x) + 1
    delta_y = abs(p1.y - p2.y) + 1
    return delta_x * delta_y

points = [Point(*map(int, l.split(",", 1)), l) for l in INPUT.split("\n")]

n = len(points)

def part1():
    max_area = 0
    for i in range(n):
        p1 = points[i]
        for j in range(i+1, n):
            p2 = points[j]
            area = get_area(p1, p2)
            
            max_area = max(max_area, area)

    return max_area
    
def is_inside(p: Point):
    # ray casting to the right
    crossings = 0

    for i in range(n):
        p1 = points[i]
        p2 = points[(i + 1) % n]

        lower_y = min(p1.y, p2.y)
        upper_y = max(p1.y, p2.y)
        if p1.x == p2.x:
            if p.x < p1.x and lower_y < p.y < upper_y:
                crossings += 1

    return crossings % 2 == 1

# reverse it, instead of checking if an edge of the rectangle crosses polygon edges, check if any polygon edge crosses rectangle boundaries
def is_rect_crossing_boundaries(rect_min_x, rect_max_x, rect_min_y, rect_max_y):
    for i in range(n):
        v1 = points[i]
        v2 = points[(i + 1) % n]

        if v1.x == v2.x:  # Vertical polygon edge
            vx = v1.x
            vy_min, vy_max = min(v1.y, v2.y), max(v1.y, v2.y)

            if rect_min_x < vx < rect_max_x:
                if vy_min < rect_max_y and vy_max > rect_min_y:
                    return True

        else:
            vy = v1.y
            vx_min, vx_max = min(v1.x, v2.x), max(v1.x, v2.x)

            if rect_min_y < vy < rect_max_y:
                if vx_min < rect_max_x and vx_max > rect_min_x:
                    return True

    return False

def part2():
    max_area = 0
    for i in range(n):
        p1 = points[i]
        for j in range(i+1, n):
            p2 = points[j]

            min_x, max_x = min(p1.x, p2.x), max(p1.x, p2.x)
            min_y, max_y = min(p1.y, p2.y), max(p1.y, p2.y)

            # The other two corners of the rectangle
            c1 = Point(min_x, max_y)
            c2 = Point(max_x, min_y)

            # Check if the 2 other corners are valid (inside or on boundary)
            if not is_inside(c1) or not is_inside(c2):
                continue

            # Check if any polygon edge passes through the rectangle's interior
            if is_rect_crossing_boundaries(min_x, max_x, min_y, max_y):
                continue

            # Valid rectangle - compute area
            area = get_area(p1, p2)
            max_area = max(max_area, area)

    return max_area

print("Part 1: ", part1())
print("Part 2: ", part2())
    