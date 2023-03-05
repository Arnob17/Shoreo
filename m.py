# height = float(input('Tell me your height (metre)= '))
# weight = int(input('Tell me your weight= '))
# age = int(input('Tell me your age= '))
# class solve:
#   def __init__(self, h, w, a) :
#     self.height = h
#     self.weight = w
#     self.age = a

#   def BMI(self):
#     return self.weight / self.height*2 

#   def BMR_M(self):
#     result = 66+(13.7 * self.weight) + (5 * (self.height * 100)) - (6.8 * self.age)
#     return result * 1.2

#   def BMR_F(self):
#     result = 665+(9.6 * self.weight) + (1.8 * (self.height * 100)) - (4.7 * self.age)
#     return result

# math = solve(height, weight, age)

# print(
# math.BMI(),
# math.BMR_M(),
# math.BMR_F()
# )


from sklearn.datasets import make_classification
from sklearn import tree
from sklearn.model_selection import train_test_split
 
X, t = make_classification(100, 5, n_classes=2, shuffle=True, random_state=10)
X_train, X_test, t_train, t_test = train_test_split(
    X, t, test_size=0.3, shuffle=True, random_state=1)
 
model = tree.DecisionTreeClassifier()
model = model.fit(X_train, t_train)
 
predicted_value = model.predict(X_test)
print(predicted_value)
 
tree.plot_tree(model)
 
zeroes = 0
ones = 0
for i in range(0, len(t_train)):
    if t_train[i] == 0:
        zeroes += 1
    else:
        ones += 1
 
print(zeroes)
print(ones)
 
val = 1 - ((zeroes/70)*(zeroes/70) + (ones/70)*(ones/70))
print("Gini :", val)
 
match = 0
UnMatch = 0
 
for i in range(30):
    if predicted_value[i] == t_test[i]:
        match += 1
    else:
        UnMatch += 1
 
accuracy = match/30
print("Accuracy is: ", accuracy)