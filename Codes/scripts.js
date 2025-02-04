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

document.addEventListener('DOMContentLoaded', function () {
  // Customer Review Swiper (Ensures it doesn't affect other sections)
  var customerReviewSwiper = new Swiper('.customer-swiper', {
    loop: true,
    pagination: {
      el: '.customer-swiper .swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.customer-swiper .swiper-button-next',
      prevEl: '.customer-swiper .swiper-button-prev'
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });
});




// MAP
// Initialize the map centered on Singapore
var map = L.map('map').setView([1.3521, 103.8198], 12);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define different colored pin markers
const officePin = L.ExtraMarkers.icon({
  icon: 'fa-building', // Office icon
  markerColor: 'blue', // Blue pin for offices
  shape: 'circle', // Pin shape (circle, square, star)
  prefix: 'fa' // FontAwesome icon prefix
});

const collectionPin = L.ExtraMarkers.icon({
  icon: 'fa-box', // Collection icon
  markerColor: 'red', // Red pin for collection points
  shape: 'circle', // Same shape to keep consistency
  prefix: 'fa'
});

// Define locations with latitude, longitude, and name
const locations = [
  // Office Buildings
  { lat: 1.2793, lng: 103.8499, name: "🏢Marina Bay Financial Centre Tower 1 (Office Building)", address: "8 Marina Blvd, Singapore 018981" },
  { lat: 1.3005, lng: 103.8415, name: "🏢Suntec Tower One (Office Building)", address: "7 Temasek Blvd, Singapore 038987" },
  { lat: 1.2843, lng: 103.7831, name: "🏢Mapletree Business City (Office Building)", address: "20 Pasir Panjang Rd, Singapore 117439" },

  // MokeSell Collection Points
  { lat: 1.3246, lng: 103.9291, name: "📦Bedok Mall (MSCollect!)", address: "311 New Upper Changi Rd, Singapore 467360" },
  { lat: 1.3347, lng: 103.9632, name: "📦Changi City Point (MSCollect!)", address: "5 Changi Business Park Central 1, Singapore 486038" },
  { lat: 1.3180, lng: 103.8937, name: "📦Paya Lebar Quarter (MSCollect!)", address: "10 Paya Lebar Rd, Singapore 409057" },
  { lat: 1.3432, lng: 103.9533, name: "📦Eastpoint Mall (MSCollect!)", address: "3 Simei Street 6, Singapore 528833" },
  { lat: 1.3521, lng: 103.9440, name: "📦Tampines Mall (MSCollect!)", address: "4 Tampines Central 5, Singapore 529510" },
  { lat: 1.2645, lng: 103.8223, name: "📦VivoCity (MSCollect!)", address: "1 HarbourFront Walk, Singapore 098585" },
  { lat: 1.3335, lng: 103.7406, name: "📦JCube (MSCollect!)", address: "2 Jurong East Central 1, Singapore 609731" },
  { lat: 1.3344, lng: 103.7464, name: "📦IMM (MSCollect!)", address: "2 Jurong East Street 21, Singapore 609601" },
  { lat: 1.3508, lng: 103.7492, name: "📦West Mall (MSCollect!)", address: "1 Bukit Batok Central Link, Singapore 658713" },
  { lat: 1.3787, lng: 103.7632, name: "📦Hillion Mall (MSCollect!)", address: "17 Petir Rd, Singapore 678278" },
  { lat: 1.3500, lng: 103.8722, name: "📦Serangoon NEX (MSCollect!)", address: "23 Serangoon Central, Singapore 556083" },
  { lat: 1.2938, lng: 103.8312, name: "📦Great World City (MSCollect!)", address: "1 Kim Seng Promenade, Singapore 237994" },
  { lat: 1.2839, lng: 103.8515, name: "📦One Raffles Place (MSCollect!)", address: "1 Raffles Place, Singapore 048616" },
  { lat: 1.2849, lng: 103.8281, name: "📦Tiong Bahru Plaza (MSCollect!)", address: "302 Tiong Bahru Rd, Singapore 168732" },
  { lat: 1.2963, lng: 103.8271, name: "📦Valley Point (MSCollect!)", address: "491 River Valley Rd, Singapore 248371" },
  { lat: 1.2657, lng: 103.8207, name: "📦HarbourFront Centre (MSCollect!)", address: "1 Maritime Square, Singapore 099253" },
  { lat: 1.3065, lng: 103.7892, name: "📦The Star Vista (MSCollect!)", address: "1 Vista Exchange Green, Singapore 138617" },
  { lat: 1.2736, lng: 103.8013, name: "📦Alexandra Retail Centre (MSCollect!)", address: "460 Alexandra Rd, Singapore 119963" },
  { lat: 1.3332, lng: 103.7438, name: "📦Causeway Point (MSCollect!)", address: "1 Woodlands Square, Singapore 738099" },
  { lat: 1.3000, lng: 103.8378, name: "📦Plaza Singapura (MSCollect!)", address: "68 Orchard Rd, Singapore 238839" },
  { lat: 1.3119, lng: 103.7798, name: "📦Clementi Mall (MSCollect!)", address: "3155 Commonwealth Ave W, Singapore 129588" },
  { lat: 1.3773, lng: 103.8490, name: "📦Ang Mo Kio Hub (MSCollect!)", address: "53 Ang Mo Kio Ave 3, Singapore 569933" },
  { lat: 1.4360, lng: 103.7863, name: "📦Northpoint City (MSCollect!)", address: "930 Yishun Ave 2, Singapore 769098" },
  { lat: 1.4043, lng: 103.9020, name: "📦Waterway Point (MSCollect!)", address: "83 Punggol Central, Singapore 828761" },
  { lat: 1.3526, lng: 103.7189, name: "📦Jurong Point (MSCollect!)" , address: "1 Jurong West Central 2, Singapore 648886" },
  { lat: 1.2906, lng: 103.7764, name: "📦West Coast Plaza (MSCollect!)", address: "154 West Coast Rd, Singapore 127371" },
  { lat: 1.3008, lng: 103.8458, name: "📦Raffles City Shopping Centre (MSCollect!)", address: "252 North Bridge Rd, Singapore 179103" },
  { lat: 1.2931, lng: 103.8558, name: "📦Marina Square (MSCollect!)", address: "6 Raffles Blvd, Singapore 039594" },
  { lat: 1.3039, lng: 103.8318, name: "📦ION Orchard (MSCollect!)", address: "2 Orchard Turn, Singapore 238801" },
  { lat: 1.3040, lng: 103.8325, name: "📦Wisma Atria (MSCollect!)", address: "435 Orchard Rd, Singapore 238877" },
  { lat: 1.3010, lng: 103.8370, name: "📦The Cathay (MSCollect!)", address: "2 Handy Rd, Singapore 229233" },
  { lat: 1.3114, lng: 103.8565, name: "📦Bugis Junction (MSCollect!)", address: "200 Victoria St, Singapore 188021" },
  { lat: 1.3009, lng: 103.8456, name: "📦Funan Mall (MSCollect!)", address: "107 North Bridge Rd, Singapore 179105" },
  { lat: 1.3074, lng: 103.8318, name: "📦Ngee Ann City (MSCollect!)", address: "391 Orchard Rd, Singapore 238872" },
  { lat: 1.3035, lng: 103.8326, name: "📦Paragon Shopping Centre (MSCollect!)", address: "290 Orchard Rd, Singapore 238859" },
  { lat: 1.3002, lng: 103.8399, name: "📦The Heeren (MSCollect!)", address: "260 Orchard Rd, Singapore 238855" },
  { lat: 1.3015, lng: 103.8398, name: "📦Mandarin Gallery (MSCollect!)", address: "333A Orchard Rd, Singapore 238897" },
  { lat: 1.3048, lng: 103.8318, name: "📦Scotts Square (MSCollect!)", address: "6 Scotts Rd, Singapore 228209" },
  { lat: 1.3030, lng: 103.8325, name: "📦Tangs Plaza (MSCollect!)", address: "310 Orchard Rd, Singapore 238864" },
  { lat: 1.3011, lng: 103.8378, name: "📦The Atrium @ Orchard (MSCollect!)", address: "60B Orchard Rd, Singapore 238891" },
  { lat: 1.3004, lng: 103.8452, name: "📦Capitol Piazza (MSCollect!)", address: "13 Stamford Rd, Singapore 178905" },
  { lat: 1.3017, lng: 103.8375, name: "📦Orchard Central (MSCollect!)", address: "181 Orchard Rd, Singapore 238896" },
  { lat: 1.3023, lng: 103.8378, name: "📦313@Somerset (MSCollect!)", address: "313 Orchard Rd, Singapore 238895" },
  { lat: 1.3032, lng: 103.8325, name: "📦Lucky Plaza (MSCollect!)", address: "304 Orchard Rd, Singapore 238863" }
]

// Add markers with different colored pins
locations.forEach(function(location) {
  const isOffice = location.name.includes("Office Building");
  const pinIcon = isOffice ? officePin : collectionPin;

  L.marker([location.lat, location.lng], { icon: pinIcon }).addTo(map)
    .bindPopup(`<b>${location.name}</b><br>📍 Address: ${location.address}`);
});





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

// Feedback Submission
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Swiper
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });

  // Submit Feedback Function
  window.submitFeedback = function () {
    const category = document.getElementById('feedback-category').value;
    const feedbackText = document.getElementById('feedback-text').value.trim();

    if (!feedbackText) {
      alert("Please enter your feedback.");
      return;
    }

    // Format feedback
    const newFeedback = `"${feedbackText}" - (${category})`;

    // Add new feedback to the Swiper carousel
    let newSlide = document.createElement('div');
    newSlide.classList.add('swiper-slide');
    newSlide.textContent = newFeedback;

    // Append the new slide and update Swiper
    document.querySelector('.swiper-wrapper').appendChild(newSlide);
    swiper.update();

    // Clear the input field
    document.getElementById('feedback-text').value = '';

    alert("Thank you for your feedback!");
  };
});
