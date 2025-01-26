// Attach event listener to the search button
document.getElementById("search-btn").addEventListener("click", function () {
  // Get the search input value and convert it to lowercase
  const searchInput = document.getElementById("search-input").value.trim().toLowerCase();

  // Define redirection rules
  const redirectionMap = {
    shoes: "fashion.html",
    furniture: "homenliving.html",
    milk: "fnb.html"
  };

  // Check if the input matches a keyword in the redirection map
  const targetPage = Object.keys(redirectionMap).find(keyword => searchInput.includes(keyword));

  // Redirect to the corresponding page if a match is found
  if (targetPage) {
    window.location.href = redirectionMap[targetPage];
  } else {
    // Optional: Handle no match (e.g., show an alert or a default page)
    alert("No matching category found. Please try searching for something else!");
  }
});

// Initialize the map
var map = L.map('map').setView([1.3521, 103.8198], 13); // Center map on Singapore

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define office locations (latitude, longitude, and name)
const officeLocations = [
  { lat: 1.2807, lng: 103.8412, name: "Headquarters - Southern Singapore" }, // Headquarters (Southern Singapore)
  { lat: 1.3157, lng: 103.8185, name: "Office 1" },
  { lat: 1.3114, lng: 103.8573, name: "Office 2" },
  { lat: 1.2952, lng: 103.8195, name: "Office 3" },
  { lat: 1.2965, lng: 103.7784, name: "Office 4" },
  { lat: 1.2999, lng: 103.8543, name: "Office 5" },
  { lat: 1.3076, lng: 103.8349, name: "Office 6" },
  { lat: 1.3151, lng: 103.8258, name: "Office 7" },
  { lat: 1.3240, lng: 103.8277, name: "Office 8" },
  { lat: 1.3323, lng: 103.8051, name: "Office 9" },
  { lat: 1.3297, lng: 103.7620, name: "Office 10" },
  { lat: 1.3355, lng: 103.7380, name: "Office 11" },
  { lat: 1.3372, lng: 103.7581, name: "Office 12" },
  { lat: 1.3459, lng: 103.7974, name: "Office 13" },
  { lat: 1.3557, lng: 103.8291, name: "Office 14" },
  { lat: 1.3638, lng: 103.8352, name: "Office 15" }
];

// Add markers for each office location
officeLocations.forEach(function(office) {
  L.marker([office.lat, office.lng]).addTo(map)
    .bindPopup(`<b>${office.name}</b><br>Location: ${office.lat}, ${office.lng}`);
});