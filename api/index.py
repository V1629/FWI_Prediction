from http.server import BaseHTTPRequestHandler
import json
import os
from pathlib import Path
import sys

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).parent.parent))

try:
    import pickle
    import pandas as pd
    import numpy as np
    from sklearn.preprocessing import StandardScaler
    
    # Import models
    try:
        standard_scaler = pickle.load(open('models/scaler.pkl', 'rb'))
        ridge_model = pickle.load(open('models/ridgecv.pkl', 'rb'))
        models_loaded = True
    except:
        models_loaded = False
        standard_scaler = None
        ridge_model = None
except ImportError:
    models_loaded = False

def load_template(template_name):
    """Load HTML template"""
    template_path = Path(__file__).parent.parent / 'templates' / template_name
    try:
        with open(template_path, 'r', encoding='utf-8') as f:
            return f.read()
    except:
        return f"<h1>Error loading {template_name}</h1>"

def render_home_template(results=None, error=None):
    """Render the home template with results"""
    template = load_template('home.html')
    
    if results is not None:
        template = template.replace('{{results}}', str(results))
    
    if error:
        template = template.replace('{{results}}', '0.5')
        template += f'<div style="color: red;">Error: {error}</div>'
    
    return template

def predict_fire_risk(data):
    """Predict fire risk using the ML model"""
    try:
        if not models_loaded:
            return 0.5, "Models not loaded"
        
        # Extract values from form data
        Temperature = float(data.get('Temperature', 25))
        RH = float(data.get('RH', 50))
        WS = float(data.get('WS', 10))
        Rain = float(data.get('Rain', 0))
        FFMC = float(data.get('FFMC', 50))
        DMC = float(data.get('DMC', 25))
        ISI = float(data.get('ISI', 5))
        Classes = float(data.get('Classes', 0))
        Region = float(data.get('Region', 0))
        
        # Make prediction
        new_data_scaled = standard_scaler.transform([[Temperature, RH, WS, Rain, FFMC, DMC, ISI, Classes, Region]])
        result = ridge_model.predict(new_data_scaled)
        
        return result[0], None
    except Exception as e:
        return 0.5, str(e)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests"""
        try:
            if self.path == '/':
                # Serve index page
                content = load_template('index.html')
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
                
            elif self.path == '/predictdata':
                # Serve prediction form
                content = render_home_template()
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
                
            else:
                # Try to serve static files
                static_path = Path(__file__).parent.parent / 'static' / self.path.lstrip('/')
                if static_path.exists() and static_path.is_file():
                    with open(static_path, 'rb') as f:
                        content = f.read()
                    
                    # Determine content type
                    if self.path.endswith('.css'):
                        content_type = 'text/css'
                    elif self.path.endswith('.js'):
                        content_type = 'application/javascript'
                    else:
                        content_type = 'text/plain'
                    
                    self.send_response(200)
                    self.send_header('Content-type', content_type)
                    self.end_headers()
                    self.wfile.write(content)
                else:
                    self.send_response(404)
                    self.end_headers()
                    self.wfile.write("Not Found".encode())
                    
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(f"Internal Server Error: {str(e)}".encode())
    
    def do_POST(self):
        """Handle POST requests for predictions"""
        try:
            if self.path == '/predictdata':
                # Get form data
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length).decode('utf-8')
                
                # Parse form data (simple parsing)
                form_data = {}
                for item in post_data.split('&'):
                    if '=' in item:
                        key, value = item.split('=', 1)
                        form_data[key] = value
                
                # Make prediction
                result, error = predict_fire_risk(form_data)
                
                # Render template with results
                content = render_home_template(result, error)
                
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
                
            else:
                self.send_response(404)
                self.end_headers()
                self.wfile.write("Not Found".encode())
                
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(f"Internal Server Error: {str(e)}".encode())

# For local testing
if __name__ == "__main__":
    print("This file is designed to run on Vercel")
    print("For local testing, use: python application.py") 