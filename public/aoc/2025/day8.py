INPUT = """put your puzzle input here"""

import math

n = 1000

class Point:
    def __init__(self, x:int, y:int, z:int, id:str):
        self.x = x
        self.y = y
        self.z = z
        self.id = id

def get_distance(p1: Point, p2: Point) -> float:
    delta_x = p1.x - p2.x
    delta_y = p1.y - p2.y
    delta_z = p1.z - p2.z
    return math.sqrt(delta_x ** 2 + delta_y ** 2 + delta_z ** 2)

points: list[Point] = []

for l in INPUT.split("\n"):
    x,y,z = map(int, l.split(","))
    points.append(Point(x,y,z,l))
    
m = len(points)

import heapq

class Pair:
    def __init__(self, id:tuple[str, str], d:float):
        self.id = id
        self.d = d
            
class UnionFind:
    def __init__(self, n):
        self.parent = n  # parent[i] stores the parent of element i

    def find(self, i):
        if self.parent[i] != i:
            return self.find(self.parent[i])
        else: return self.parent[i]
        
    def union(self, i, j):
        self.parent[self.find(i)] = self.find(j)
    
def part1():
    closest_pairs: list[Pair] = []
    
    for i in range(m):
        p1 = points[i]
        for j in range(i + 1, m):
            p2 = points[j]
            d = get_distance(p1, p2)
            heapq.heappush(closest_pairs, (d, (p1.id, p2.id)))
            
    edges: list[tuple[int, int]] = []
    vertices = {}

    for _ in range(n):
        _, (p1_id, p2_id) = heapq.heappop(closest_pairs)
        edges.append((p1_id, p2_id))
        
        vertices[p1_id] = p1_id
        vertices[p2_id] = p2_id

    uf = UnionFind(vertices)

    for e in edges:
        u, v = e 
        uf.union(u, v)
        
    groups = {}

    for v in vertices:
        parent = uf.find(v)
        groups[parent] = groups.get(parent, 0) + 1
                
    return math.prod(list(heapq.nlargest(3, groups.values())))

def part2():
    closest_pairs: list[Pair] = []
    
    for i in range(m):
        p1 = points[i]
        for j in range(i + 1, m):
            p2 = points[j]
            d = get_distance(p1, p2)
            heapq.heappush(closest_pairs, (d, (p1, p2)))
            
    vertices = {}
    
    for p in points:
        vertices[p.id] = p.id
    
    uf = UnionFind(vertices)
    
    c = len(vertices)
    n = len(closest_pairs)
    
    for _ in range(n):
        d, (p1, p2) = heapq.heappop(closest_pairs)
        
        if uf.find(p1.id) != uf.find(p2.id):
            uf.union(p1.id, p2.id)
            c -= 1
        
        if c == 1:
            return p1.x * p2.x
        
print("Part 1: ", part1())
print("Part 2: ", part2())