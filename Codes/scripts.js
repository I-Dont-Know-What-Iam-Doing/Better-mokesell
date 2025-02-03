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

// Initialize the map centered on Singapore
var map = L.map('map').setView([1.3521, 103.8198], 12);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define locations with latitude, longitude, and name
const locations = [
  // Office Buildings
  { lat: 1.2793, lng: 103.8499, name: "Marina Bay Financial Centre Tower 1", address: "8 Marina Blvd, Singapore 018981" },
  { lat: 1.3005, lng: 103.8415, name: "Suntec Tower One", address: "7 Temasek Blvd, Singapore 038987" },
  { lat: 1.2843, lng: 103.7831, name: "Mapletree Business City", address: "20 Pasir Panjang Rd, Singapore 117439" },
  // MokeSell Collection Points
  { lat: 1.3521, lng: 103.9440, name: "Tampines Mall", address: "4 Tampines Central 5, Singapore 529510" },
  { lat: 1.3332, lng: 103.7438, name: "Causeway Point", address: "1 Woodlands Square, Singapore 738099" },
  { lat: 1.2645, lng: 103.8223, name: "VivoCity", address: "1 HarbourFront Walk, Singapore 098585" },
  { lat: 1.3000, lng: 103.8378, name: "Plaza Singapura", address: "68 Orchard Rd, Singapore 238839" },
  { lat: 1.3119, lng: 103.7798, name: "Clementi Mall", address: "3155 Commonwealth Ave W, Singapore 129588" },
  { lat: 1.3773, lng: 103.8490, name: "Ang Mo Kio Hub", address: "53 Ang Mo Kio Ave 3, Singapore 569933" },
  { lat: 1.4360, lng: 103.7863, name: "Northpoint City", address: "930 Yishun Ave 2, Singapore 769098" },
  { lat: 1.4043, lng: 103.9020, name: "Waterway Point", address: "83 Punggol Central, Singapore 828761" },
  { lat: 1.3526, lng: 103.7189, name: "Jurong Point", address: "1 Jurong West Central 2, Singapore 648886" },
  { lat: 1.2906, lng: 103.7764, name: "West Coast Plaza", address: "154 West Coast Rd, Singapore 127371" },
  { lat: 1.3008, lng: 103.8458, name: "Raffles City Shopping Centre", address: "252 North Bridge Rd, Singapore 179103" },
  { lat: 1.2931, lng: 103.8558, name: "Marina Square", address: "6 Raffles Blvd, Singapore 039594" },
  { lat: 1.3039, lng: 103.8318, name: "ION Orchard", address: "2 Orchard Turn, Singapore 238801" },
  { lat: 1.3040, lng: 103.8325, name: "Wisma Atria", address: "435 Orchard Rd, Singapore 238877" },
  { lat: 1.3010, lng: 103.8370, name: "The Cathay", address: "2 Handy Rd, Singapore 229233" },
  { lat: 1.3114, lng: 103.8565, name: "Bugis Junction", address: "200 Victoria St, Singapore 188021" },
  { lat: 1.3009, lng: 103.8456, name: "Funan Mall", address: "107 North Bridge Rd, Singapore 179105" },
  { lat: 1.3074, lng: 103.8318, name: "Ngee Ann City", address: "391 Orchard Rd, Singapore 238872" },
  { lat: 1.3035, lng: 103.8326, name: "Paragon Shopping Centre", address: "290 Orchard Rd, Singapore 238859" },
  { lat: 1.3002, lng: 103.8399, name: "The Heeren", address: "260 Orchard Rd, Singapore 238855" },
  { lat: 1.3015, lng: 103.8398, name: "Mandarin Gallery", address: "333A Orchard Rd, Singapore 238897" },
  { lat: 1.3048, lng: 103.8318, name: "Scotts Square", address: "6 Scotts Rd, Singapore 228209" },

{ lat: 1.3030, lng: 103.8325, name: "Tangs Plaza", address: "310 Orchard Rd, Singapore 238864" },
  { lat: 1.3011, lng: 103.8378, name: "The Atrium @ Orchard", address: "60B Orchard Rd, Singapore 238891" },
  { lat: 1.3004, lng: 103.8452, name: "Capitol Piazza", address: "13 Stamford Rd, Singapore 178905" },
  { lat: 1.3017, lng: 103.8375, name: "Orchard Central", address: "181 Orchard Rd, Singapore 238896" },
  { lat: 1.3023, lng: 103.8378, name: "313@Somerset", address: "313 Orchard Rd, Singapore 238895" },
  { lat: 1.3032, lng: 103.8325, name: "Lucky Plaza", address: "304" }
]

// Add markers for each office location
locations.forEach(function(location) {
  L.marker([location.lat, location.lng]).addTo(map)
    .bindPopup(<b>${location.name}</b><br>Lat: ${location.lat}, Lng: ${location.lng});
})

// Sample Product Data
const products = [
  { name: "iPhone 14", price: "$999", img: "https://via.placeholder.com/150", link: "product1.html" },
  { name: "Adidas Sneakers", price: "$120", img: "https://via.placeholder.com/150", link: "product2.html" },
  { name: "Wooden Dining Table", price: "$450", img: "https://via.placeholder.com/150", link: "product3.html" },
  { name: "Milk 1L", price: "$2.50", img: "https://via.placeholder.com/150", link: "product4.html" }
];

// Populate Featured Products
const productList = document.getElementById("product-list");
products.forEach(product => {
  let item = document.createElement("div");
  item.classList.add("product");
  item.innerHTML = `
    <a href="${product.link}">
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    </a>
  `;
  productList.appendChild(item);
});

// Initialize Map
var map = L.map('map').setView([1.3521, 103.8198], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
