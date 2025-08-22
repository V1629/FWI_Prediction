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

### 🧠 Intelligent Risk Assessment
- **Multi-factor Analysis**: Each parameter contributes to overall risk calculation
- **Risk Level Classification**: Low, Medium, High risk categorization
- **Parameter Impact Analysis**: Detailed breakdown of how each factor affects prediction
- **Actionable Recommendations**: Specific fire prevention measures based on risk level

## 🏗️ Technical Architecture

### Backend Technologies
- **Flask**: Lightweight web framework for API and web interface
- **Scikit-learn**: Machine learning library for Ridge Regression
- **NumPy & Pandas**: Data manipulation and numerical computing
- **Pickle**: Model serialization for production deployment
- **Gunicorn**: Production WSGI server for deployment

### Machine Learning Pipeline
```
Input Data → Preprocessing → Feature Scaling → Ridge Regression → Risk Prediction
```

### Model Performance
- **Algorithm**: Ridge Regression with Cross-Validation
- **Training Data**: Algerian Forest Fires Dataset
- **Features**: 9 environmental parameters
- **Output**: Fire risk probability (0-1 scale)
- **Validation**: Cross-validation for model reliability

## 📁 Project Structure
```
FWI_Prediction/
├── application.py          # Main Flask application
├── models/                 # Pre-trained ML models
│   ├── ridgecv.pkl        # Ridge Regression model
│   └── scaler.pkl         # Data standardization scaler
├── static/                 # Static assets (CSS, JS)
├── templates/              # HTML templates
├── notebook/               # Jupyter notebooks for analysis
│   ├── Ridge and lasso regression.ipynb
│   └── Algerian_forest_fires_dataset.csv
├── requirements.txt        # Python dependencies
└── README.md              # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip package manager
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/V1629/FWI_Prediction.git
   cd FWI_Prediction
   ```

2. **Create virtual environment**
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python application.py
   ```

5. **Access the application**
   - Open browser: `http://localhost:5000`
   - Home page: Overview and parameter explanations
   - Prediction form: `/predictdata` route

## 🎯 Usage Guide

### Web Interface
1. **Navigate to prediction form** (`/predictdata`)
2. **Enter environmental parameters** with proper ranges
3. **Submit for analysis** - ML model processes inputs
4. **Review results** - Risk probability and detailed analysis
5. **Get recommendations** - Actionable fire prevention advice

### API Endpoints
- **GET** `/` - Landing page with project information
- **GET** `/predictdata` - Display prediction form
- **POST** `/predictdata` - Submit data and get prediction results

### Input Validation
The system includes comprehensive input validation:
- **Range checking** for all numerical parameters
- **Real-time validation** with helpful error messages
- **Data type verification** for form inputs
- **Fallback handling** for edge cases

## 🔧 Development

### Model Training
The ML models were trained using the Algerian Forest Fires Dataset:
- **Dataset**: 245 samples with environmental parameters
- **Features**: 9 input parameters for fire risk prediction
- **Target**: Binary fire classification (fire/no fire)
- **Preprocessing**: Data cleaning, standardization, and feature scaling

### Adding New Features
1. **Modify `application.py`** for new routes
2. **Update templates** for UI changes
3. **Add validation** in the prediction logic
4. **Test locally** before deployment

### Testing
```bash
# Test the application locally
python application.py

# Test prediction endpoint
curl -X POST http://localhost:5000/predictdata \
  -d "Temperature=25&RH=65&WS=15&Rain=0&FFMC=75&DMC=25&ISI=8&Classes=0&Region=0"
```


### Environment Variables
For production deployment, consider setting:
- `FLASK_ENV=production`
- `DEBUG=False`
- Custom port configurations

## 📊 Model Performance & Validation

### Training Metrics
- **Cross-validation**: Ensures model reliability
- **Feature importance**: All 9 parameters contribute to prediction
- **Data quality**: Cleaned and validated dataset

### Prediction Accuracy
The Ridge Regression model provides:
- **Stable predictions** with regularization
- **Generalization** to new environmental conditions
- **Interpretable results** with risk factor analysis

## 🤝 Contributing

### Development Workflow
1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-feature`
3. **Make changes** and test locally
4. **Commit changes**: `git commit -m "Add new feature"`
5. **Push to branch**: `git push origin feature/new-feature`
6. **Create Pull Request**

### Areas for Improvement
- **Additional ML algorithms** (Random Forest, Neural Networks)
- **More environmental parameters** (soil moisture, vegetation type)
- **Real-time data integration** (weather APIs)
- **Mobile application** development
- **API rate limiting** and authentication

## 📄 License
This project is open source and available under the MIT License.

## 🙏 Acknowledgments
- **Dataset**: Algerian Forest Fires Dataset
- **ML Framework**: Scikit-learn community
- **Web Framework**: Flask development team
- **Deployment**: Render platform

## 📞 Support & Issues
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check this README and code comments
- **Community**: Contribute to improve the project

## 🔮 Future Enhancements
- **Real-time weather data integration**
- **Multiple ML model ensemble**
- **Geographic risk mapping**
- **Mobile application**
- **API authentication and rate limiting**
- **Advanced visualization dashboards**

---

**Built with ❤️ for forest fire prevention and community safety**

*This project demonstrates the power of machine learning in environmental protection and fire risk assessment.*

