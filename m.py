# import math

# class eq:
#     def __init__(self, nomials:any, operation:str, type:str):
#         self.nomials = nomials
#         self.operation = operation
#         self.which = type
    
#     def doMath(self):
#         if self.which == 'trigonometry':
#             return self.trigonometry()
#         elif self.which == 'arithmetic':
#             return self.arithmas()

#     def arithmas(self):
#         if self.operation == '+':
#             return (self.nomials[0] + self.nomials[1]), self.nomials[0], self.nomials[1]

#     def trigonometry(self):
#         if self.operation == '+':
#             return (self.nomials[0] + self.nomials[1]), self.nomials[0], self.nomials[1]

#     def redian_to_deg(self, angle):
#         return math.degrees(angle)  

# pymath = eq((math.sin(math.radians(60)), math.cos(math.radians(90))), '+', 'trigonometry')

# # pymath = eq((5, 10),'+','arithmetic')

# print(pymath.doMath())

upatto = [2, 2, 3, 5, 6, 7, 7, 7, 10, 9, 5]

def prochurok(array):
    counts = []
    for y in upatto:
        counts.append(array.count(y))
    
    counts.sort()
    for i in array:
        if array.count(i) == counts[-1]:
            print(f'Prochurok: {i}')
            break;

prochurok(upatto)

# def searchInsert(nums, target):
#         """
#         :type nums: List[int]
#         :type target: int
#         :rtype: int
#         """
#         for x in nums:
#             if x == target:
#                 o = nums.index(x)
#                 return print(o)
# searchInsert([4, 6, 7, 8], 7)