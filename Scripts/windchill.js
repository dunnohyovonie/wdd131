// Wind Chill Calculation
function calculateWindChill(temp, windSpeed) {
    // Formula for wind chill in °C: 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
  }
  
  // Get DOM elements
  const tempElement = document.getElementById('temp');
  const windSpeedElement = document.getElementById('wind-speed');
  const windChillElement = document.getElementById('wind-chill');
  
  // Get values
  const temp = parseFloat(tempElement.textContent);
  const windSpeed = parseFloat(windSpeedElement.textContent);
  
  // Calculate wind chill if conditions are met
  if (temp <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temp, windSpeed);
    windChillElement.textContent = windChill.toFixed(1) + " °C";
  } else {
    windChillElement.textContent = "N/A";
  }