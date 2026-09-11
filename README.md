# FWI Prediction - Forest Fire Weather Index Prediction System

## 🔥 Project Overview
This project implements a **Forest Fire Weather Index (FWI) Prediction System** using machine learning to assess fire risk based on environmental and weather parameters. The system analyzes multiple factors including temperature, humidity, wind speed, rainfall, and fuel moisture codes to predict the probability of forest fires.

## 🎯 Core Features

### 🔬 Machine Learning Engine
- **Ridge Regression Model**: Optimized with cross-validation for accurate fire risk prediction
- **Feature Engineering**: 9 key environmental parameters for comprehensive risk assessment
- **Real-time Prediction**: Instant fire risk probability calculation
- **Model Persistence**: Pre-trained models using pickle for production deployment

### 📊 Input Parameters & Analysis
The system analyzes these critical parameters:

| Parameter | Description | Range | Impact on Fire Risk |
|-----------|-------------|-------|---------------------|
| **Temperature** | Air temperature in Celsius | -50°C to 60°C | Higher = Increased risk |
| **RH** | Relative Humidity percentage | 0% to 100% | Lower = Increased risk |
| **WS** | Wind Speed in km/h | 0 to 100 | Higher = Increased spread risk |
| **Rain** | Rainfall in millimeters | 0 to 100 | Higher = Decreased risk |
| **FFMC** | Fine Fuel Moisture Code | 0 to 100 | Higher = Increased risk |
| **DMC** | Duff Moisture Code | 0 to 300+ | Higher = Increased risk |
| **ISI** | Initial Spread Index | 0 to 56+ | Higher = Increased spread risk |
| **Classes** | Current fire status | 0 or 1 | Binary classification |
| **Region** | Geographic identifier | 0 or 1 | Regional factors |

## 🏗️ Technical Architecture

### Tech Stack
- **Backend**: FastAPI (Python) - High performance asynchronous API
- **Frontend**: React + Vite - Fast, modern UI with React Router
- **Machine Learning**: Scikit-learn, NumPy, Pandas
- **Infrastructure**: Docker & Docker Compose for seamless containerized deployment

### Machine Learning Pipeline
```
Input Data → Preprocessing → Feature Scaling → Ridge Regression → Risk Prediction
```

## 📁 Project Structure
```
FWI_Prediction/
├── backend/                # FastAPI backend service
│   ├── models/             # Pre-trained ML models (ridgecv.pkl, scaler.pkl)
│   ├── main.py             # Main FastAPI application
│   ├── Dockerfile          # Backend container configuration
│   └── requirements.txt    # Python dependencies
├── frontend/               # React + Vite frontend application
│   ├── src/                # React components and pages
│   ├── index.html          # Application entry point
│   ├── Dockerfile          # Frontend container configuration (Multi-stage Nginx)
│   └── package.json        # Node dependencies
├── docker-compose.yml      # Docker orchestration
└── README.md               # Project documentation
```

## 🚀 Quick Start (Recommended)

The easiest way to run the application is using Docker.

### Prerequisites
- Docker and Docker Compose

### Run with Docker
1. **Clone the repository**
   ```bash
   git clone https://github.com/V1629/FWI_Prediction.git
   cd FWI_Prediction
   ```

2. **Build and start the containers**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Web Interface: `http://localhost` (or `http://127.0.0.1`)
   - API Backend: `http://localhost:8000`

---

## 🛠️ Local Development Setup (Without Docker)

### Backend Setup
```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend Setup (In a separate terminal)
```bash
cd frontend
npm install
npm run dev
```

## 🎯 Usage Guide

### Web Interface
1. **Navigate to the home page**
2. **Click "Start Prediction"** to go to the prediction form
3. **Enter environmental parameters** with proper ranges
4. **Submit for analysis** - React sends data to the FastAPI backend
5. **Review results** - View your risk probability and detailed analysis directly on the page

### API Endpoints
- **POST** `/api/predict` - Submit JSON data and get prediction results

**Test prediction endpoint:**
```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"Temperature":25, "RH":65, "WS":15, "Rain":0, "FFMC":75, "DMC":25, "ISI":8, "Classes":0, "Region":0}'
```

## 📊 Model Performance & Validation
The Ridge Regression model provides:
- **Stable predictions** with regularization
- **Generalization** to new environmental conditions
- **Interpretable results** with risk factor analysis

## 📄 License
This project is open source and available under the MIT License.
