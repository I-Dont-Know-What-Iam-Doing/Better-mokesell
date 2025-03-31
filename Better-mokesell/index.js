// SEARCH FUNCTION
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

// DOWNLOAD MOKESELL
document.addEventListener("scroll", function () {
  let scrollY = window.scrollY;
  
  // Move the image smoothly to the right
  let image = document.querySelector(".shop-image");
  let imageMoveX = Math.min(scrollY / 10, 50); // Limit movement to 50px
  image.style.transform = `translateX(${imageMoveX}px)`;

  // Move the background smoothly in both X & Y directions
  let section = document.querySelector(".shop-with-us");
  let backgroundMoveX = Math.min(scrollY / 30, 10); // Moves left & right
  let backgroundMoveY = Math.min(scrollY / 20, 10); // Moves up & down

  section.style.backgroundPosition = `${50 + backgroundMoveX}% ${50 + backgroundMoveY}%`;
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

const officeOutletPin = L.ExtraMarkers.icon({
  icon: 'fa-store', // Community center office outlet icon
  markerColor: 'green', // Green pin for office outlets
  shape: 'circle',
  prefix: 'fa'
});

// Define locations with latitude, longitude, and name
const locations = [
  // Office Buildings
  { lat: 1.2801, lng: 103.8545, name: "🏢Marina Bay Financial Centre Tower 1 (Office Building)", address: "8 Marina Blvd, Singapore 018981" },
  { lat: 1.2935, lng: 103.8572, name: "🏢Suntec Tower One (Office Building)", address: "7 Temasek Blvd, Singapore 038987" },
  { lat: 1.2767, lng: 103.8010, name: "🏢Mapletree Business City (Office Building)", address: "20 Pasir Panjang Rd, Singapore 117439" },
  { lat: 1.2879, lng: 103.8518, name: "🏢One Raffles Place (Office Building)", address: "1 Raffles Place, Singapore 048616" },
  { lat: 1.2843, lng: 103.8515, name: "🏢Ocean Financial Centre (Office Building)", address: "10 Collyer Quay, Singapore 049315" },
  { lat: 1.2930, lng: 103.8563, name: "🏢South Beach Tower (Office Building)", address: "38 Beach Rd, Singapore 189767" },
  { lat: 1.3009, lng: 103.8411, name: "🏢UOB Plaza (Office Building)", address: "80 Raffles Place, Singapore 048624" },
  { lat: 1.2785, lng: 103.8510, name: "🏢Asia Square Tower 1 (Office Building)", address: "8 Marina View, Singapore 018960" }, 
  { lat: 1.2785, lng: 103.8510, name: "🏢Asia Square Tower 2 (Office Building)", address: "12 Marina View, Singapore 018961" },
  { lat: 1.2828, lng: 103.8515, name: "🏢Republic Plaza (Office Building)", address: "9 Raffles Place, Singapore 048619" }, 
  { lat: 1.2856, lng: 103.8497, name: "🏢UOB Plaza One (Office Building)", address: "80 Raffles Place, Singapore 048624" }, 
  { lat: 1.2847, lng: 103.8510, name: "🏢One Raffles Quay North Tower (Office Building)", address: "1 Raffles Quay, Singapore 048583" },
  { lat: 1.2847, lng: 103.8510, name: "🏢One Raffles Quay South Tower (Office Building)", address: "1 Raffles Quay, Singapore 048583" },
  { lat: 1.2820, lng: 103.8510, name: "🏢Marina One East Tower (Office Building)", address: "7 Straits View, Singapore 018936" },
  { lat: 1.2820, lng: 103.8510, name: "🏢Marina One West Tower (Office Building)", address: "9 Straits View, Singapore 018937" },

  // Community Centers
  { lat: 1.4275, lng: 103.7922, name: "🏢ACE The Place Community Club (Office Outlet)", address: "120 Woodlands Avenue 1, Singapore 739069" },
  { lat: 1.3547, lng: 103.8895, name: "🏢Aljunied Community Club (Office Outlet)", address: "110 Hougang Avenue 1, #01-1048, Singapore 530110" },
  { lat: 1.3925, lng: 103.8944, name: "🏢Sengkang Community Club (Office Outlet)", address: "2 Sengkang Square, Singapore 545025" },
  { lat: 1.3667, lng: 103.8000, name: "🏢Yio Chu Kang Community Club (Office Outlet)", address: "50 Ang Mo Kio Street 61, Singapore 569163" },
  { lat: 1.3450, lng: 103.9832, name: "🏢Changi Simei Community Club (Office Outlet)", address: "10 Simei Street 2, Singapore 529915" },
  { lat: 1.3521, lng: 103.8198, name: "🏢Toa Payoh Central Community Club (Office Outlet)", address: "93 Toa Payoh Central, Singapore 319194" },
  { lat: 1.3483, lng: 103.6831, name: "🏢Jurong Spring Community Club (Office Outlet)", address: "8 Jurong West Street 52, Singapore 649296" },
  { lat: 1.3521, lng: 103.9440, name: "🏢Tampines West Community Club (Office Outlet)", address: "5 Tampines Avenue 3, Singapore 529705" },
  { lat: 1.3521, lng: 103.8198, name: "🏢Bishan Community Club (Office Outlet)", address: "51 Bishan Street 13, Singapore 579799" },
  { lat: 1.3691, lng: 103.8454, name: "🏢Ang Mo Kio Community Centre (Office Outlet)", address: "795 Ang Mo Kio Avenue 1, Singapore 569976" },
  { lat: 1.4296, lng: 103.8275, name: "🏢Nee Soon East Community Club (Office Outlet)", address: "1 Yishun Avenue 9, Singapore 768893" },
  { lat: 1.4457, lng: 103.7866, name: "🏢Woodlands Community Club (Office Outlet)", address: "1 Woodlands Street 81, Singapore 738526" },
  { lat: 1.4396, lng: 103.7741, name: "🏢Marsiling Community Club (Office Outlet)", address: "100 Admiralty Road, Singapore 739980" },
  { lat: 1.3787, lng: 103.7632, name: "🏢Bukit Panjang Community Club (Office Outlet)", address: "8 Pending Road, Singapore 678295" },
  { lat: 1.3412, lng: 103.7766, name: "🏢Bukit Timah Community Club (Office Outlet)", address: "20 Toh Yi Drive, Singapore 596569" },
  { lat: 1.3151, lng: 103.7654, name: "🏢Clementi Community Centre (Office Outlet)", address: "220 Clementi Avenue 4, Singapore 129880" },
  { lat: 1.2946, lng: 103.8035, name: "🏢Queenstown Community Centre (Office Outlet)", address: "365 Commonwealth Avenue, Singapore 149732" },
  { lat: 1.2730, lng: 103.8410, name: "🏢Tanjong Pagar Community Club (Office Outlet)", address: "101 Cantonment Road, Singapore 089774" },
  { lat: 1.3025, lng: 103.8630, name: "🏢Kampong Glam Community Club (Office Outlet)", address: "385 Beach Road, Singapore 199581" },
  { lat: 1.3070, lng: 103.8600, name: "🏢Jalan Besar Community Club (Office Outlet)", address: "69 Jellicoe Road, Singapore 208737" },

  // MokeSell Collection Points
  { lat: 1.4360, lng: 103.7863, name: "📦Northpoint City (MSCollect!)", address: "930 Yishun Ave 2, Singapore 769098" },
  { lat: 1.3773, lng: 103.8490, name: "📦AMK Hub (MSCollect!)", address: "53 Ang Mo Kio Ave 3, Singapore 569933" },
  { lat: 1.3500, lng: 103.8722, name: "📦NEX (MSCollect!)", address: "23 Serangoon Central, Singapore 556083" },
  { lat: 1.3821, lng: 103.8940, name: "📦Compass One (MSCollect!)", address: "1 Sengkang Square, Singapore 545078" },
  { lat: 1.4043, lng: 103.9020, name: "📦Waterway Point (MSCollect!)", address: "83 Punggol Central, Singapore 828761" },
  { lat: 1.3521, lng: 103.9440, name: "📦Tampines Mall (MSCollect!)", address: "4 Tampines Central 5, Singapore 529510" },
  { lat: 1.3526, lng: 103.7189, name: "📦Jurong Point (MSCollect!)", address: "1 Jurong West Central 2, Singapore 648886" },
  { lat: 1.3119, lng: 103.7798, name: "📦The Clementi Mall (MSCollect!)", address: "3155 Commonwealth Ave W, Singapore 129588" },
  { lat: 1.3787, lng: 103.7632, name: "📦Hillion Mall (MSCollect!)", address: "17 Petir Rd, Singapore 678278" },
  { lat: 1.3508, lng: 103.7492, name: "📦West Mall (MSCollect!)", address: "1 Bukit Batok Central Link, Singapore 658713" },
  { lat: 1.3521, lng: 103.8198, name: "📦Junction 8 (MSCollect!)", address: "9 Bishan Pl, Singapore 579837" },
  { lat: 1.3344, lng: 103.7464, name: "📦IMM (MSCollect!)", address: "2 Jurong East Street 21, Singapore 609601" },
  { lat: 1.3347, lng: 103.9632, name: "📦Changi City Point (MSCollect!)", address: "5 Changi Business Park Central 1, Singapore 486038" },
  { lat: 1.3180, lng: 103.8937, name: "📦Paya Lebar Quarter (MSCollect!)", address: "10 Paya Lebar Rd, Singapore 409057" },
  { lat: 1.3432, lng: 103.9533, name: "📦Eastpoint Mall (MSCollect!)", address: "3 Simei Street 6, Singapore 528833" },
  { lat: 1.3246, lng: 103.9291, name: "📦Bedok Mall (MSCollect!)", address: "311 New Upper Changi Rd, Singapore 467360" },
  { lat: 1.3521, lng: 103.9440, name: "📦Century Square (MSCollect!)", address: "2 Tampines Central 5, Singapore 529509" },
  { lat: 1.3521, lng: 103.9440, name: "📦Tampines 1 (MSCollect!)", address: "10 Tampines Central 1, Singapore 529536" },
  { lat: 1.3521, lng: 103.8198, name: "📦Toa Payoh HDB Hub (MSCollect!)", address: "480 Lorong 6 Toa Payoh, Singapore 310480" },
  { lat: 1.3521, lng: 103.8198, name: "📦Bishan North Shopping Mall (MSCollect!)", address: "245 Bishan Street 22, Singapore 570245" },
  { lat: 1.3521, lng: 103.8198, name: "📦Ang Mo Kio Hub (MSCollect!)", address: "53 Ang Mo Kio Ave 3, Singapore 569933" },
  { lat: 1.3521, lng: 103.8198, name: "📦Hougang Mall (MSCollect!)", address: "90 Hougang Ave 10, Singapore 538766" },
  { lat: 1.3521, lng: 103.8198, name: "📦Heartland Mall (MSCollect!)", address: "205 Hougang Street 21, Singapore 530205" },
  { lat: 1.3521, lng: 103.8198, name: "📦Rivervale Mall (MSCollect!)", address: "11 Rivervale Crescent, Singapore 545082" },
  { lat: 1.3521, lng: 103.8198, name: "📦Rivervale Plaza (MSCollect!)", address: "118 Rivervale Drive, Singapore 540118" },
  { lat: 1.3521, lng: 103.8198, name: "📦Punggol Plaza (MSCollect!)", address: "168 Punggol Field, Singapore 820168" },
  { lat: 1.3521, lng: 103.8198, name: "📦The Seletar Mall (MSCollect!)", address: "33 Sengkang West Ave, Singapore 797653" },
  { lat: 1.3521, lng: 103.8198, name: "📦Hougang 1 (MSCollect!)", address: "1 Hougang Street 91, Singapore 538692" },
  { lat: 1.3521, lng: 103.8198, name: "📦Greenwich V (MSCollect!)", address: "1 Seletar Road, Singapore 807011" },
  { lat: 1.3521, lng: 103.8198, name: "📦myVillage at Serangoon Garden (MSCollect!)", address: "1 Maju Ave, Singapore 556679" },
  { lat: 1.3521, lng: 103.8198, name: "📦Sun Plaza (MSCollect!)", address: "30 Sembawang Drive, Singapore 757713" },
  { lat: 1.3521, lng: 103.8198, name: "📦Sembawang Shopping Centre (MSCollect!)", address: "604 Sembawang Rd, Singapore 758459" },
  { lat: 1.3521, lng: 103.8198, name: "📦Lot One Shoppers' Mall (MSCollect!)", address: "21 Choa Chu Kang Ave 4, Singapore 689812" },
  { lat: 1.3521, lng: 103.8198, name: "📦Bukit Panjang Plaza (MSCollect!)", address: "1 Jelebu Rd, Singapore 677743" }
]

// Add markers with different colored pins
locations.forEach(function(location) {
  let pinIcon;
  if (location.name.includes("Office Building")) {
    pinIcon = officePin;
  } else if (location.name.includes("Office Outlet")) {
    pinIcon = officeOutletPin;
  } else {
    pinIcon = collectionPin;
  }

  L.marker([location.lat, location.lng], { icon: pinIcon }).addTo(map)
    .bindPopup(`<b>${location.name}</b><br>📍 Address: ${location.address}`);
});










