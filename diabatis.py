import pandas as pd
import numpy as np
import pickle
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix,classification_report
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier


sc_x = StandardScaler()

data = pd.read_csv('diabetes.csv',encoding='ISO-8859-1')
print(data.head())
print(data.describe())
print(data.info())
print(data.isna().sum())
print(data.duplicated().sum())

# various data visualization graph models

plt.figure(figsize=(12,6))
sns.countplot(x='Outcome',data = data)
plt.show()

#observing outlayers of subplot , boxplot

plt.figure(figsize=(12,12))
for i , col in enumerate(['Pregnancies','Glucose','BloodPressure','SkinThickness','Insulin','BMI','DiabetesPedigreeFunction','Age','Outcome']):
    plt.subplot(3,3,i+1)
    sns.boxplot(x=col , data=data)
plt.show()

#pairplot

sns.pairplot(data, hue='Outcome')
plt.show()

#histplot , subplot

plt.figure(figsize= (12,12))
for i , col in enumerate(['Pregnancies','Glucose','BloodPressure','SkinThickness','Insulin','BMI','DiabetesPedigreeFunction','Age','Outcome']):
    plt.subplot(3,3,i+1)
    sns.histplot(x=col , data=data)
plt.show()

#heatmap

plt.figure(figsize= (12,12))
sns.heatmap(data.corr(),vmin=-1.0,center=0,cmap='RdBu_r',annot=True)
plt.show()

#standard scalling and labeling encodeing

x = pd.DataFrame(
    sc_x.fit_transform(data.drop('Outcome', axis=1)),
    columns=['Pregnancies','Glucose','BloodPressure','SkinThickness',
             'Insulin','BMI','DiabetesPedigreeFunction','Age']
)

x.head()
y = data['Outcome']

x_train,x_test,y_train,y_test = train_test_split(x,y, test_size=0.3,random_state=2)

test_score = []
train_score = []
for i in range(1,15):
 knn = KNeighborsClassifier()
 knn.fit(x_train,y_train)
 train_score.append(knn.score(x_train,y_train))
 test_score.append(knn.score(x_test,y_test))
max_train_score = max(train_score)
train_score_index = [ i for i, v in enumerate(train_score) if v == max_train_score ]
print("max train score {} % and k = {}".format(max_train_score*100,list(map(lambda x:x+1,train_score_index))))

max_test_score = max(test_score)
test_score_index = [ i for i, v in enumerate(test_score) if v == max_test_score ]
print("max test score {} % and k = {}".format(max_test_score*100,list(map(lambda x:x+1,train_score_index))))
plt.figure(figsize=(12,5))
print(sns.lineplot(x=range(1,15),y=train_score,marker='*',label='train_score'))
print(sns.lineplot(x=range(1,15),y=test_score,marker='o',label='test_score'))

knn = KNeighborsClassifier(13)
knn.fit(x_train,y_train)
print(knn.score(x_test,y_test))

y_pred = knn.predict(x_test)
print(confusion_matrix(y_test,y_pred))

print(classification_report(y_test,y_pred))

 #save the model and scaler

pickle.dump(knn,open('diabatis_model.sav','wb'))
pickle.dump(sc_x,open("scaler.sav",'wb'))


