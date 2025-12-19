INPUT = """put your puzzle input here"""

rows = []    

for line in INPUT.splitlines():
    values = []
    for c in line.split(" "):
        if c == "":
            continue
        values.append(c)
    rows.append(values)

import operator

operator_map = {
    "*": operator.mul,
    "+": operator.add
}

operators: list[int] = rows[-1]
numbers: list[list[int]] = rows[:-1]

p = len(operators)
n = len(numbers)

def part1():
    final_result = 0

    for i in range(p):
        operation = operator_map[operators[i]]
        result = None
        for j in range(n):
            n = int(numbers[j][i])
            if not result: result = n
            else : result = operation(result, n) 
        final_result += result
        
    return final_result

class CephalopodProblem:
    def __init__(self, full_numbers: list[str], length: int, operator: str):
        self.full_numbers = full_numbers
        self.length = length
        self.operator = operator

    def eval(self):
        cephalopod_numbers: list[int] = []
        for j in range(self.length):
            cephalopod_number = ""
            for number in self.full_numbers:
                if number[j] == " ":
                    continue
                cephalopod_number += number[j]

            cephalopod_numbers.append(int(cephalopod_number))
            
        result = None
        operation = operator_map[self.operator]
        for c_n in cephalopod_numbers:
            if not result: result = c_n
            else: result = operation(result, c_n)

        return result

def part2():
    problem_length_map: dict = {}
    
    offset = 0
    problems: list[CephalopodProblem] = []

    for i in range(p):
        length = 0
        for j in range(n):
            length = max(length, len(numbers[j][i]))
            
        problem_length_map[i] = length
        full_numbers = []
        for j in range(n):
            full_numbers.append(INPUT.splitlines()[j][offset:offset + length])
        
        problems.append(CephalopodProblem(full_numbers, length, operators[i]))
        offset += length + 1
    
    final_result = 0
    for problem in problems:
        final_result += problem.eval()
    
    return final_result

print("Part 1: ", part1()) 
print("Part 2: ", part2())