from flask import Flask
from flask import request
from flask import render_template

import pandas as pd
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('subir.html')

@app.route('/prepro/<data>')
def preprocess(data = 'midata.csv'):
    return render_template('prepro.html', data=data)

@app.route('/visual/')
@app.route('/visual/<data>')
def visual(data = 'midata.csv'):
    df=pd.read_csv('static/'+data)
    info=df.columns.tolist()
    return render_template('visual.html', data=data, info=json.dumps(info))

if __name__ == '__main__':
    app.run(debug = True, port=8000)