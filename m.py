height = float(input('Tell me your height (metre)= '))
weight = int(input('Tell me your weight= '))
age = int(input('Tell me your age= '))
class solve:
  def __init__(self, h, w, a) :
    self.height = h
    self.weight = w
    self.age = a

  def BMI(self):
    return self.weight / self.height*2 

  def BMR_M(self):
    result = 66+(13.7 * self.weight) + (5 * (self.height * 100)) - (6.8 * self.age)
    return result * 1.2

  def BMR_F(self):
    result = 665+(9.6 * self.weight) + (1.8 * (self.height * 100)) - (4.7 * self.age)
    return result

math = solve(height, weight, age)

print(
math.BMI(),
math.BMR_M(),
math.BMR_F()
)