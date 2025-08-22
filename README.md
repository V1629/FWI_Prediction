# FWI Prediction - Forest Fire Weather Index Prediction System

## Project Overview
This project focuses on **Forest Fire Weather Index (FWI) Prediction**, a machine learning system that predicts forest fire risk based on weather conditions and environmental factors. The system uses advanced Ridge Regression algorithms to analyze multiple parameters and provide accurate fire risk assessments.

## 🌟 Features



### 🔥 Core Functionality
- **Data Processing**: Efficient preparation of weather and environmental data
- **Machine Learning Models**: Ridge Regression implementation for accurate predictions
- **Real-time Validation**: Input validation with helpful error messages
- **Risk Assessment**: Comprehensive fire risk analysis with recommendations
- **Visualization**: Beautiful charts and interactive elements

### 📊 Input Parameters
The system analyzes the following parameters to predict fire risk:

| Parameter | Description | Range | Unit |
|-----------|-------------|-------|------|
| **Temperature** | Air temperature | -50°C to 60°C | Celsius |
| **RH** | Relative Humidity | 0% to 100% | Percentage |
| **WS** | Wind Speed | 0 to 100 | km/h |
| **Rain** | Rainfall | 0 to 100 | mm |
| **FFMC** | Fine Fuel Moisture Code | 0 to 100 | Scale |
| **DMC** | Duff Moisture Code | 0 to 300+ | Scale |
| **ISI** | Initial Spread Index | 0 to 56+ | Scale |
| **Classes** | Fire Status | 0 or 1 | Binary |
| **Region** | Geographic Region | 0 or 1 | Binary |

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip package manager

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/V1629/FWI_Prediction.git
   cd FWI_Prediction
   ```

2. **Set up virtual environment**:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   python application.py
   ```



## 🎯 Usage

### Web Interface
1. **Home Page**: Learn about the system and view parameter explanations
2. **Prediction Form**: Enter weather and environmental data
3. **Results**: Get fire risk probability with risk level assessment
4. **Recommendations**: Receive actionable fire prevention advice

### API Usage
The system provides a REST API endpoint:
- **POST** `/predictdata` - Submit data for fire risk prediction
- **GET** `/predictdata` - Display the prediction form

## 🏗️ Project Structure
```
FWI_Prediction/
├── application.py          # Main Flask application
├── models/                 # Pre-trained ML models
│   ├── ridgecv.pkl        # Ridge Regression model
│   └── scaler.pkl         # Data scaler
├── static/                 # Static assets
│   ├── css/               # Stylesheets
│   │   └── style.css      # Main CSS with animations
│   └── js/                # JavaScript files
│       └── animations.js  # Interactive animations
├── templates/              # HTML templates
│   ├── index.html         # Beautiful landing page
│   └── home.html          # Prediction form page
├── notebook/               # Jupyter notebooks for analysis
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## 🎨 Website Features

### Design Elements
- **Glassmorphism**: Modern translucent design with backdrop blur
- **Gradient Backgrounds**: Beautiful color transitions
- **Floating Animations**: Smooth hover effects and transitions
- **Responsive Grid**: Adaptive layouts for all device sizes
- **Interactive Elements**: Hover effects, focus states, and animations

### User Experience
- **Intuitive Navigation**: Clear navigation between pages
- **Form Validation**: Real-time input validation with helpful messages
- **Visual Feedback**: Immediate response to user actions
- **Accessibility**: High contrast and readable typography
- **Mobile Optimized**: Touch-friendly interface for mobile devices

## 🔧 Technical Details

### Frontend Technologies
- **HTML5**: Semantic markup structure
- **CSS3**: Advanced styling with animations and responsive design
- **JavaScript**: Interactive functionality and form validation
- **Font Awesome**: Professional icon library
- **Google Fonts**: Beautiful typography (Poppins)

### Backend Technologies
- **Flask**: Lightweight web framework
- **Scikit-learn**: Machine learning library
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Pickle**: Model serialization

### Machine Learning
- **Algorithm**: Ridge Regression with Cross-Validation
- **Features**: 9 environmental and weather parameters
- **Output**: Fire risk probability (0-1 scale)
- **Accuracy**: Optimized for forest fire prediction

## 📱 Responsive Design
The website is fully responsive and optimized for:
- **Desktop**: Full-featured experience with animations
- **Tablet**: Touch-optimized interface
- **Mobile**: Streamlined mobile experience
- **All Screen Sizes**: Adaptive layouts and typography



## 🚀 Deployment

### Local Development
```bash
python application.py
```

### Production Deployment
The project includes configurations for:
- **AWS Elastic Beanstalk**: Cloud deployment ready
- **Docker**: Containerization support
- **Heroku**: Platform-as-a-Service deployment

## 🤝 Contributing
Contributions are welcome! Please submit a pull request for any enhancements or bug fixes.

### Development Guidelines
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License
This project is open source and available under the MIT License.

## 🙏 Acknowledgments
- **Dataset**: Algerian Forest Fires Dataset
- **ML Framework**: Scikit-learn community
- **Design Inspiration**: Modern web design principles
- **Icons**: Font Awesome icon library

## 📞 Support
For questions or support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for forest fire prevention and community safety**

