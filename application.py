from flask import Flask , render_template,request,jsonify
import pickle
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import os

application=Flask(__name__)
app=application

#import ridge regressor and standard scaler pickle
standard_scaler=pickle.load(open('models/scaler.pkl','rb'))
ridge_model=pickle.load(open('models/ridgecv.pkl','rb'))


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/predictdata",methods=['GET','POST'])
def predict_datapoint():
    if request.method=="POST":
        Temperature=float(request.form.get('Temperature'))
        RH=float(request.form.get('RH'))
        WS=float(request.form.get('WS'))
        Rain=float(request.form.get('Rain'))
        FFMC=float(request.form.get('FFMC'))
        DMC=float(request.form.get('DMC'))
        ISI=float(request.form.get('ISI'))
        Classes=float(request.form.get('Classes'))
        Region=float(request.form.get('Region'))


        new_data_scaled=standard_scaler.transform([[Temperature,RH,WS,Rain,FFMC,DMC,ISI,Classes,Region]])
        result=ridge_model.predict(new_data_scaled)
        return render_template('home.html',results=result[0])
    else:
        return render_template('home.html')
    

if __name__ == "__main__":
    # Get port from environment variable (for production) or use 5000 for local development
    port = int(os.environ.get('PORT', 5000))
    # Use 0.0.0.0 for production, localhost for development
    host = '0.0.0.0' if os.environ.get('PORT') else '127.0.0.1'
    app.run(host=host, port=port, debug=False)
