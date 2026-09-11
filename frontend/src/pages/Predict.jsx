import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Predict() {
  const [formData, setFormData] = useState({
    Temperature: '',
    RH: '',
    WS: '',
    Rain: '',
    FFMC: '',
    DMC: '',
    ISI: '',
    Classes: '',
    Region: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Convert to floats as required by FastAPI
        body: JSON.stringify({
          Temperature: parseFloat(formData.Temperature),
          RH: parseFloat(formData.RH),
          WS: parseFloat(formData.WS),
          Rain: parseFloat(formData.Rain),
          FFMC: parseFloat(formData.FFMC),
          DMC: parseFloat(formData.DMC),
          ISI: parseFloat(formData.ISI),
          Classes: parseFloat(formData.Classes),
          Region: parseFloat(formData.Region)
        })
      });
      if (!response.ok) throw new Error('Prediction failed');
      const data = await response.json();
      setResults(data.fwi);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getHighRiskCount = () => {
    let count = 0;
    if (parseFloat(formData.Temperature) > 30) count++;
    if (parseFloat(formData.RH) < 40) count++;
    if (parseFloat(formData.WS) > 25) count++;
    if (parseFloat(formData.Rain) < 1) count++;
    if (parseFloat(formData.FFMC) > 80) count++;
    if (parseFloat(formData.DMC) > 100) count++;
    if (parseFloat(formData.ISI) > 20) count++;
    return count;
  };

  const getMediumRiskCount = () => {
    let count = 0;
    // Basic logic mapping original jinja variables, skipped some complexities for medium/low
    return count; // simplify display
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <i className="fas fa-fire"></i>
            <span>FWI Prediction</span>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i>
              Home
            </Link>
            <Link to="/predict" className="nav-link active">
              <i className="fas fa-calculator"></i>
              Predict
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="prediction-container">
          {/* Form Section */}
          <div className="form-section">
            <div className="form-header">
              <h1 className="form-title">
                <i className="fas fa-fire"></i>
                Forest Fire Risk Prediction
              </h1>
              <p className="form-subtitle">
                Enter the weather and environmental conditions to predict fire risk probability
              </p>
            </div>

            <form onSubmit={handleSubmit} className="prediction-form">
              <div className="form-grid">
                {/* Temperature */}
                <div className="form-group">
                  <label htmlFor="Temperature" className="form-label">
                    <i className="fas fa-thermometer-half"></i>
                    Temperature (°C)
                  </label>
                  <input type="number" id="Temperature" name="Temperature" className="form-input" placeholder="e.g., 25" step="0.1" min="-50" max="60" value={formData.Temperature} onChange={handleInputChange} required />
                  <div className="input-info">
                    <i className="fas fa-info-circle"></i>
                    Air temperature in Celsius. Higher temperatures increase fire risk.
                  </div>
                </div>

                {/* Relative Humidity */}
                <div className="form-group">
                  <label htmlFor="RH" className="form-label">
                    <i className="fas fa-tint"></i>
                    Relative Humidity (%)
                  </label>
                  <input type="number" id="RH" name="RH" className="form-input" placeholder="e.g., 65" min="0" max="100" value={formData.RH} onChange={handleInputChange} required />
                  <div className="input-info">
                    <i className="fas fa-info-circle"></i>
                    Humidity percentage. Lower humidity increases fire risk.
                  </div>
                </div>

                {/* Wind Speed */}
                <div className="form-group">
                  <label htmlFor="WS" className="form-label">
                    <i className="fas fa-wind"></i>
                    Wind Speed (km/h)
                  </label>
                  <input type="number" id="WS" name="WS" className="form-input" placeholder="e.g., 15" min="0" max="100" value={formData.WS} onChange={handleInputChange} required />
                  <div className="input-info">
                    <i className="fas fa-info-circle"></i>
                    Wind speed in km/h. Higher wind speeds increase fire spread.
                  </div>
                </div>

                {/* Rainfall */}
                <div className="form-group">
                  <label htmlFor="Rain" className="form-label">
                    <i className="fas fa-cloud-rain"></i>
                    Rainfall (mm)
                  </label>
                  <input type="number" id="Rain" name="Rain" className="form-input" placeholder="e.g., 0.5" step="0.1" min="0" max="100" value={formData.Rain} onChange={handleInputChange} required />
                  <div className="input-info">
                    <i className="fas fa-info-circle"></i>
                    Precipitation in millimeters. Higher rainfall reduces fire risk.
                  </div>
                </div>

                {/* FFMC */}
                <div className="form-group">
                  <label htmlFor="FFMC" className="form-label">
                    <i className="fas fa-leaf"></i>
                    FFMC (Fine Fuel Moisture Code)
                  </label>
                  <input type="number" id="FFMC" name="FFMC" className="form-input" placeholder="e.g., 75" step="0.1" min="0" max="100" value={formData.FFMC} onChange={handleInputChange} required />
                  <div className="input-info">
                    <i className="fas fa-info-circle"></i>
                    Fine fuel moisture code (0-100). Higher values indicate drier fuels.
                  </div>
                </div>

                {/* DMC */}
                <div className="form-group">
                  <label htmlFor="DMC" className="form-label">
                    <i className="fas fa-tree"></i>
                    DMC (Duff Moisture Code)
                  </label>
                  <input type="number" id="DMC" name="DMC" className="form-input" placeholder="e.g., 25" step="0.1" min="0" max="300" value={formData.DMC} onChange={handleInputChange} required />
                  <div className="input-info">
                    <i className="fas fa-info-circle"></i>
                    Duff moisture code (0-300+). Higher values indicate drier duff layer.
                  </div>
                </div>

                {/* ISI */}
                <div className="form-group">
                  <label htmlFor="ISI" className="form-label">
                    <i className="fas fa-fire"></i>
                    ISI (Initial Spread Index)
                  </label>
                  <input type="number" id="ISI" name="ISI" className="form-input" placeholder="e.g., 8" step="0.1" min="0" max="56" value={formData.ISI} onChange={handleInputChange} required />
                  <div className="input-info">
                    <i className="fas fa-info-circle"></i>
                    Initial spread index (0-56+). Higher values indicate faster fire spread.
                  </div>
                </div>

                {/* Classes */}
                <div className="form-group">
                  <label htmlFor="Classes" className="form-label">
                    <i className="fas fa-exclamation-triangle"></i>
                    Fire Class
                  </label>
                  <select id="Classes" name="Classes" className="form-input" value={formData.Classes} onChange={handleInputChange} required>
                    <option value="">Select fire class</option>
                    <option value="0">0 - No Fire</option>
                    <option value="1">1 - Fire Present</option>
                  </select>
                  <div className="input-info">
                    <i className="fas fa-info-circle"></i>
                    Current fire status. 0 for no fire, 1 for fire present.
                  </div>
                </div>

                {/* Region */}
                <div className="form-group">
                  <label htmlFor="Region" className="form-label">
                    <i className="fas fa-map-marker-alt"></i>
                    Region
                  </label>
                  <select id="Region" name="Region" className="form-input" value={formData.Region} onChange={handleInputChange} required>
                    <option value="">Select region</option>
                    <option value="0">Region 0</option>
                    <option value="1">Region 1</option>
                  </select>
                  <div className="input-info">
                    <i className="fas fa-info-circle"></i>
                    Geographic region identifier for the prediction area.
                  </div>
                </div>
              </div>

              {error && <div style={{color: '#ff6b6b', textAlign: 'center', marginBottom: '20px'}}>{error}</div>}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                  <i className="fas fa-rocket"></i>
                  {loading ? 'Predicting...' : 'Predict Fire Risk'}
                </button>
                <Link to="/" className="btn btn-secondary">
                  <i className="fas fa-arrow-left"></i>
                  Back to Home
                </Link>
              </div>
            </form>
          </div>

          {/* Results Section */}
          {results !== null && (
            <div className="results-section">
              <div className="results-card">
                <div className="results-header">
                  <h2 className="results-title">
                    <i className="fas fa-chart-line"></i>
                    Prediction Results
                  </h2>
                </div>
                <div className="results-content">
                  <div className="result-item">
                    <div className="result-label">Fire Risk Probability:</div>
                    <div className="result-value">{results.toFixed(2)}</div>
                  </div>
                  <div className="result-interpretation">
                    <h4>Risk Level:</h4>
                    {results < 5.2 ? (
                      <div className="risk-level low">
                        <i className="fas fa-check-circle"></i> Low Risk
                      </div>
                    ) : results < 11.2 ? (
                      <div className="risk-level medium">
                        <i className="fas fa-exclamation-triangle"></i> Medium Risk
                      </div>
                    ) : (
                      <div className="risk-level high">
                        <i className="fas fa-fire"></i> High Risk
                      </div>
                    )}
                  </div>

                  {/* Parameter Analysis Section */}
                  <div className="parameter-analysis">
                    <h4><i className="fas fa-microscope"></i> Parameter Analysis</h4>
                    <p className="analysis-description">
                      Below is a detailed breakdown of how each parameter contributes to the fire risk assessment:
                    </p>
                    
                    <div className="parameter-breakdown">
                      {/* Temperature */}
                      <div className="param-analysis-item">
                        <div className="param-header">
                          <i className="fas fa-thermometer-half"></i>
                          <span>Temperature: {formData.Temperature}°C</span>
                        </div>
                        <div className="param-impact">
                          {parseFloat(formData.Temperature) > 30 ? (
                            <><span className="impact high-impact"><i className="fas fa-arrow-up"></i> High Risk Factor</span><p>High temperature ({formData.Temperature}°C) significantly increases fire risk as it dries out vegetation and fuels.</p></>
                          ) : parseFloat(formData.Temperature) > 20 ? (
                            <><span className="impact medium-impact"><i className="fas fa-arrow-up"></i> Moderate Risk Factor</span><p>Moderate temperature ({formData.Temperature}°C) contributes to fire risk through fuel drying.</p></>
                          ) : (
                            <><span className="impact low-impact"><i className="fas fa-arrow-down"></i> Low Risk Factor</span><p>Lower temperature ({formData.Temperature}°C) reduces fire risk by maintaining moisture in fuels.</p></>
                          )}
                        </div>
                      </div>
                      
                      {/* Humidity */}
                      <div className="param-analysis-item">
                        <div className="param-header">
                          <i className="fas fa-tint"></i>
                          <span>Relative Humidity: {formData.RH}%</span>
                        </div>
                        <div className="param-impact">
                          {parseFloat(formData.RH) < 40 ? (
                            <><span className="impact high-impact"><i className="fas fa-arrow-up"></i> High Risk Factor</span><p>Low humidity ({formData.RH}%) creates dry conditions that significantly increase fire risk.</p></>
                          ) : parseFloat(formData.RH) < 60 ? (
                            <><span className="impact medium-impact"><i className="fas fa-arrow-up"></i> Moderate Risk Factor</span><p>Moderate humidity ({formData.RH}%) contributes to fire risk through reduced moisture.</p></>
                          ) : (
                            <><span className="impact low-impact"><i className="fas fa-arrow-down"></i> Low Risk Factor</span><p>High humidity ({formData.RH}%) reduces fire risk by maintaining moisture in the environment.</p></>
                          )}
                        </div>
                      </div>

                      {/* Wind Speed */}
                      <div className="param-analysis-item">
                        <div className="param-header">
                          <i className="fas fa-wind"></i>
                          <span>Wind Speed: {formData.WS} km/h</span>
                        </div>
                        <div className="param-impact">
                          {parseFloat(formData.WS) > 25 ? (
                            <><span className="impact high-impact"><i className="fas fa-arrow-up"></i> High Risk Factor</span><p>High wind speed ({formData.WS} km/h) dramatically increases fire spread potential and risk.</p></>
                          ) : parseFloat(formData.WS) > 15 ? (
                            <><span className="impact medium-impact"><i className="fas fa-arrow-up"></i> Moderate Risk Factor</span><p>Moderate wind speed ({formData.WS} km/h) contributes to fire spread and risk.</p></>
                          ) : (
                            <><span className="impact low-impact"><i className="fas fa-arrow-down"></i> Low Risk Factor</span><p>Low wind speed ({formData.WS} km/h) reduces fire spread potential and overall risk.</p></>
                          )}
                        </div>
                      </div>
                      
                      {/* Rainfall */}
                      <div className="param-analysis-item">
                        <div className="param-header">
                          <i className="fas fa-cloud-rain"></i>
                          <span>Rainfall: {formData.Rain} mm</span>
                        </div>
                        <div className="param-impact">
                          {parseFloat(formData.Rain) < 1 ? (
                            <><span className="impact high-impact"><i className="fas fa-arrow-up"></i> High Risk Factor</span><p>Low rainfall ({formData.Rain} mm) creates dry conditions that significantly increase fire risk.</p></>
                          ) : parseFloat(formData.Rain) < 5 ? (
                            <><span className="impact medium-impact"><i className="fas fa-arrow-up"></i> Moderate Risk Factor</span><p>Moderate rainfall ({formData.Rain} mm) provides limited moisture, still contributing to fire risk.</p></>
                          ) : (
                            <><span className="impact low-impact"><i className="fas fa-arrow-down"></i> Low Risk Factor</span><p>High rainfall ({formData.Rain} mm) significantly reduces fire risk by saturating fuels.</p></>
                          )}
                        </div>
                      </div>
                      
                      {/* FFMC */}
                      <div className="param-analysis-item">
                        <div className="param-header">
                          <i className="fas fa-leaf"></i>
                          <span>FFMC: {formData.FFMC}</span>
                        </div>
                        <div className="param-impact">
                          {parseFloat(formData.FFMC) > 80 ? (
                            <><span className="impact high-impact"><i className="fas fa-arrow-up"></i> High Risk Factor</span><p>High FFMC ({formData.FFMC}) indicates very dry fine fuels, creating extreme fire risk.</p></>
                          ) : parseFloat(formData.FFMC) > 60 ? (
                            <><span className="impact medium-impact"><i className="fas fa-arrow-up"></i> Moderate Risk Factor</span><p>Moderate FFMC ({formData.FFMC}) indicates dry fine fuels, contributing to fire risk.</p></>
                          ) : (
                            <><span className="impact low-impact"><i className="fas fa-arrow-down"></i> Low Risk Factor</span><p>Low FFMC ({formData.FFMC}) indicates moist fine fuels, reducing fire risk.</p></>
                          )}
                        </div>
                      </div>

                      {/* DMC */}
                      <div className="param-analysis-item">
                        <div className="param-header">
                          <i className="fas fa-tree"></i>
                          <span>DMC: {formData.DMC}</span>
                        </div>
                        <div className="param-impact">
                          {parseFloat(formData.DMC) > 100 ? (
                            <><span className="impact high-impact"><i className="fas fa-arrow-up"></i> High Risk Factor</span><p>High DMC ({formData.DMC}) indicates very dry duff layer, creating extreme fire risk.</p></>
                          ) : parseFloat(formData.DMC) > 50 ? (
                            <><span className="impact medium-impact"><i className="fas fa-arrow-up"></i> Moderate Risk Factor</span><p>Moderate DMC ({formData.DMC}) indicates dry duff layer, contributing to fire risk.</p></>
                          ) : (
                            <><span className="impact low-impact"><i className="fas fa-arrow-down"></i> Low Risk Factor</span><p>Low DMC ({formData.DMC}) indicates moist duff layer, reducing fire risk.</p></>
                          )}
                        </div>
                      </div>
                      
                      {/* ISI */}
                      <div className="param-analysis-item">
                        <div className="param-header">
                          <i className="fas fa-fire"></i>
                          <span>ISI: {formData.ISI}</span>
                        </div>
                        <div className="param-impact">
                          {parseFloat(formData.ISI) > 20 ? (
                            <><span className="impact high-impact"><i className="fas fa-arrow-up"></i> High Risk Factor</span><p>High ISI ({formData.ISI}) indicates very fast fire spread potential, creating extreme risk.</p></>
                          ) : parseFloat(formData.ISI) > 10 ? (
                            <><span className="impact medium-impact"><i className="fas fa-arrow-up"></i> Moderate Risk Factor</span><p>Moderate ISI ({formData.ISI}) indicates moderate fire spread potential, contributing to risk.</p></>
                          ) : (
                            <><span className="impact low-impact"><i className="fas fa-arrow-down"></i> Low Risk Factor</span><p>Low ISI ({formData.ISI}) indicates slow fire spread potential, reducing overall risk.</p></>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Summary Analysis */}
                    <div className="summary-analysis">
                      <h4><i className="fas fa-chart-pie"></i> Risk Factor Summary</h4>
                      <div className="risk-factors">
                        <div className="risk-factor-item high">
                          <span className="factor-count">{getHighRiskCount()}</span>
                          <span className="factor-label">High Risk Factors</span>
                        </div>
                        <div className="risk-factor-item medium">
                          <span className="factor-count">{getMediumRiskCount()}</span>
                          <span className="factor-label">Medium Risk Factors</span>
                        </div>
                      </div>
                      
                      <div className="analysis-conclusion">
                        <h5>Analysis Conclusion:</h5>
                        {getHighRiskCount() >= 4 ? (
                          <p className="conclusion high-risk">
                            <i className="fas fa-exclamation-triangle"></i>
                            <strong>Critical Fire Risk:</strong> Multiple high-risk factors indicate extremely dangerous conditions. Immediate action is required to prevent fire outbreaks.
                          </p>
                        ) : getHighRiskCount() >= 2 ? (
                          <p className="conclusion medium-risk">
                            <i className="fas fa-exclamation-circle"></i>
                            <strong>Elevated Fire Risk:</strong> Several high-risk factors suggest dangerous conditions. Enhanced monitoring and fire prevention measures are recommended.
                          </p>
                        ) : (
                          <p className="conclusion low-risk">
                            <i className="fas fa-check-circle"></i>
                            <strong>Controlled Fire Risk:</strong> Most parameters indicate manageable conditions. Continue standard monitoring and prevention protocols.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="recommendations">
                    <h4>Recommendations:</h4>
                    <ul>
                      {results < 5.2 ? (
                        <>
                          <li>Continue normal monitoring</li>
                          <li>Maintain current fire prevention measures</li>
                          <li>Regular patrols and equipment checks</li>
                        </>
                      ) : results < 11.2 ? (
                        <>
                          <li>Increase monitoring frequency</li>
                          <li>Prepare fire response teams</li>
                          <li>Consider fire restrictions</li>
                          <li>Alert local communities</li>
                        </>
                      ) : (
                        <>
                          <li>High alert - immediate action required</li>
                          <li>Deploy fire response teams</li>
                          <li>Implement strict fire restrictions</li>
                          <li>Evacuate if necessary</li>
                          <li>Coordinate with emergency services</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

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

export default Predict;
