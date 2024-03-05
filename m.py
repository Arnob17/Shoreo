import collections

# def x(listx):
#     y = []
#     for i in listx:
#         if (listx.count(i) == 1):
#             y.append(i)
#     return(sum(y))


# print(x([5,5,3,2,4,4]))


def mostFrequentEven(nums) -> int:
    if len(nums) >= 1 and len(nums) <= 1e05:
        x = []
        y = []
        victory=[]
        for i in nums:
            if (i % 2) == 0:
                x.append(i)

        for j in x:
            y.append(nums.count(j))
        y.sort(reverse=True)
        for o in x:
            if (x.count(o) >= y[0]):
                victory.append(o)
    
        if len(victory) == 0:
            return -1
        else:
            all_item = []
            for x in victory:
               y = victory.count(x)
               all_item.append(y)
            
            all_item.sort(reverse=True)

            for y in victory:
               if victory.count(y) == all_item[0]:
                  victory = []
                  victory.append(y)
            print(victory)
class Solution:
  def mostFrequentEven(self, nums) -> int:
    ans = -1
    count = collections.Counter()

    for num in nums:
      if num & 1:
        continue
      count[num] += 1
      newCount = count[num]
      maxCount = count[ans]
      if newCount > maxCount or newCount == maxCount and num < ans:
        ans = num

    return ans
solution = Solution()

problems = [[2,2,4,3,3,5,5], [5,6,6,8,8,7,5,2,2],[5,54,2,11,2,4,5,6]]

# for p in problems:
#    print('AmaarSolve->',mostFrequentEven(p))
#    print('EngErSolve->',solution.mostFrequentEven(p))
#    print('--------------')
mostFrequentEven(problems[1])