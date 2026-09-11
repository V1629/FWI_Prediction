from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

base_dir = os.path.dirname(os.path.abspath(__file__))
standard_scaler = pickle.load(open(os.path.join(base_dir, 'models', 'scaler.pkl'), 'rb'))
ridge_model = pickle.load(open(os.path.join(base_dir, 'models', 'ridgecv.pkl'), 'rb'))

class PredictionRequest(BaseModel):
    Temperature: float
    RH: float
    WS: float
    Rain: float
    FFMC: float
    DMC: float
    ISI: float
    Classes: float
    Region: float

@app.post("/api/predict")
def predict_datapoint(data: PredictionRequest):
    new_data_scaled = standard_scaler.transform([[
        data.Temperature, data.RH, data.WS, data.Rain, 
        data.FFMC, data.DMC, data.ISI, data.Classes, data.Region
    ]])
    result = ridge_model.predict(new_data_scaled)
    return {"fwi": float(result[0])}
