from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import numpy as np
import pickle
import os

# Get path relative to the current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "diabatis_model.sav")
scaler_path = os.path.join(BASE_DIR, "scaler.sav")

model = pickle.load(open(model_path, "rb"))
scaler = pickle.load(open(scaler_path, "rb"))

app = FastAPI()

class DiabetesInput(BaseModel):
    Pregnancies: Optional[float] = 0.0
    Glucose: Optional[float] = 0.0
    BloodPressure: Optional[float] = 0.0
    SkinThickness: Optional[float] = 0.0
    Insulin: Optional[float] = 0.0
    BMI: Optional[float] = 0.0
    DiabetesPedigreeFunction: Optional[float] = 0.0
    Age: Optional[float] = 0.0

@app.get("/api/predict")
@app.get("/")
def home():
    return {"message": "Prediction API is alive"}

@app.post("/api/predict")
@app.post("/")
def predict(data: DiabetesInput):
    input_data = np.array([[
        data.Pregnancies,
        data.Glucose,
        data.BloodPressure,
        data.SkinThickness,
        data.Insulin,
        data.BMI,
        data.DiabetesPedigreeFunction,
        data.Age
    ]])
    scaled_data = scaler.transform(input_data)
    prediction = model.predict(scaled_data)
    return {"result": "Diabetic" if prediction[0] == 1 else "Not Diabetic"}

# This is key for Vercel
# The app object will be used as the handler.
