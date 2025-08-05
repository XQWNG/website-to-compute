// Initialize Leaflet map centered on Toronto
const map = L.map('map').setView([43.7, -79.4], 11);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Use your online JPG URL here
const imageUrl = 'https://yourserver.com/path/to/official_plan.jpg';

// Define the geographic bounds for the image overlay (replace with your map's bounds)
const imageBounds = [
  [43.581024, -79.639219], // SW corner lat/lng
  [43.855457, -79.116897]  // NE corner lat/lng
];

// Add the image overlay
L.imageOverlay(imageUrl, imageBounds).addTo(map);
map.fitBounds(imageBounds);

// Your Google Maps Geocoding API key
const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

async function locate() {
  const address = document.getElementById('addressInput').value;
  if (!address) {
    alert('Please enter an address');
    return;
  }
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== 'OK' || !data.results.length) {
      alert('Address not found. Please try again.');
      return;
    }
    const location = data.results[0].geometry.location;

    // Add marker at geocoded location
    L.marker([location.lat, location.lng])
      .addTo(map)
      .bindPopup(address)
      .openPopup();

    // Center the map on the location
    map.setView([location.lat, location.lng], 15);
  } catch (error) {
    alert('Error fetching geocode data.');
    console.error(error);
  }
}
