import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="logo">
            <i className="fas fa-fire"></i>
            <span>FWI Prediction</span>
          </div>
          <h1 className="hero-title">
            Forest Fire Weather Index
            <br />
            <span className="highlight">Prediction System</span>
          </h1>
          <p className="hero-description">
            Advanced machine learning system to predict forest fire risk based on weather conditions and environmental factors.
            Get accurate predictions to help prevent and manage forest fires.
          </p>
          <div className="hero-buttons">
            <Link to="/predict" className="btn btn-primary">
              <i className="fas fa-rocket"></i>
              Start Prediction
            </Link>
            <a href="#features" className="btn btn-secondary">
              <i className="fas fa-info-circle"></i>
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-elements">
            <div className="element element-1">
              <i className="fas fa-thermometer-half"></i>
            </div>
            <div className="element element-2">
              <i className="fas fa-wind"></i>
            </div>
            <div className="element element-3">
              <i className="fas fa-cloud-rain"></i>
            </div>
            <div className="element element-4">
              <i className="fas fa-leaf"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-database"></i>
            </div>
            <h3>Data Collection</h3>
            <p>Collect weather and environmental data including temperature, humidity, wind speed, and moisture codes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-brain"></i>
            </div>
            <h3>AI Analysis</h3>
            <p>Our advanced Ridge Regression model analyzes the data to predict fire risk probability.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Risk Assessment</h3>
            <p>Get accurate predictions and risk assessments to make informed decisions about fire prevention.</p>
          </div>
        </div>
      </section>

      {/* Parameters Section */}
      <section className="parameters">
        <h2 className="section-title">Input Parameters</h2>
        <div className="parameters-grid">
          <div className="parameter-card">
            <div className="parameter-icon">
              <i className="fas fa-thermometer-half"></i>
            </div>
            <h4>Temperature</h4>
            <p>Air temperature in Celsius (°C)</p>
          </div>
          <div className="parameter-card">
            <div className="parameter-icon">
              <i className="fas fa-tint"></i>
            </div>
            <h4>Relative Humidity</h4>
            <p>Humidity percentage (%)</p>
          </div>
          <div className="parameter-card">
            <div className="parameter-icon">
              <i className="fas fa-wind"></i>
            </div>
            <h4>Wind Speed</h4>
            <p>Wind speed in kilometers per hour (km/h)</p>
          </div>
          <div className="parameter-card">
            <div className="parameter-icon">
              <i className="fas fa-cloud-rain"></i>
            </div>
            <h4>Rainfall</h4>
            <p>Precipitation in millimeters (mm)</p>
          </div>
          <div className="parameter-card">
            <div className="parameter-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h4>FFMC</h4>
            <p>Fine Fuel Moisture Code (0-100 scale)</p>
          </div>
          <div className="parameter-card">
            <div className="parameter-icon">
              <i className="fas fa-tree"></i>
            </div>
            <h4>DMC</h4>
            <p>Duff Moisture Code (0-300+ scale)</p>
          </div>
          <div className="parameter-card">
            <div className="parameter-icon">
              <i className="fas fa-fire"></i>
            </div>
            <h4>ISI</h4>
            <p>Initial Spread Index (0-56+ scale)</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Predict Fire Risk?</h2>
          <p>Start using our advanced prediction system to protect forests and communities.</p>
          <Link to="/predict" className="btn btn-primary btn-large">
            <i className="fas fa-play"></i>
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <i className="fas fa-fire"></i>
            <span>FWI Prediction</span>
          </div>
          <p>&copy; 2024 FWI Prediction System. Advanced forest fire risk assessment powered by machine learning.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
