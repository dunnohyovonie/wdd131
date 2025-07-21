// Wind Chill Calculation
const tempC = parseFloat(document.getElementById("temperature").textContent);
const windSpeed = parseFloat(document.getElementById("wind").textContent);

function calculateWindChill(t, v) {
  return (13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16)).toFixed(1);
}

if (tempC <= 10 && windSpeed > 4.8) {
  document.getElementById("windchill").textContent = `${calculateWindChill(tempC, windSpeed)} °C`;
} else {
  document.getElementById("windchill").textContent = "N/A";
}