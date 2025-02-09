# Group name: Githubbies
it's github buddies, not github husbands

# Project: Better Mokesell
MokeSell is an innovative consumer-to-consumer (C2C) marketplace that facilitates the buying and selling of new and second-hand goods. While the platform supports a broad range of product categories, its unique selling proposition (USP) lies in its focus on reducing food waste by promoting the sale of bruised, “ugly,” or slightly damaged produce at discounted prices. This initiative aims to educate consumers on the edibility of such products, encourage sustainable shopping habits, and provide an economic benefit to both buyers and sellers.

Globally, food waste is a major issue, with a significant portion of fruits and vegetables being discarded due to cosmetic imperfections, despite being perfectly safe for consumption. Consumers often overlook these products due to misconceptions about their quality, contributing to unnecessary waste and financial losses for sellers.

Additionally, existing online marketplaces do not specifically incentivize or highlight imperfect but edible produce, making it difficult for buyers who are conscious of food waste to find and purchase such items.

# Design Process
The design process of MokeSell followed a structured and iterative approach, ensuring that the website is functional, user-friendly, and aligns with our unique value proposition: encouraging consumers to purchase bruised or "ugly" produce by offering incentives and discounts while maintaining a general marketplace for second-hand goods. We began with extensive research and concept development, analyzing existing online marketplaces and consumer behavior regarding imperfect produce. Our research revealed that many buyers avoid bruised fruits and vegetables due to aesthetic concerns, despite them being perfectly edible. This insight led to the core concept of our platform: providing a financial incentive (a 5% discount) for purchasing "ugly" but edible products, helping to reduce food waste while also benefiting cost-conscious shoppers. We also identified a need for sellers to promote their listings more effectively, which inspired our bump system, allowing sellers to pay for increased visibility of their products. With these concepts in mind, we moved on to planning and wireframing, sketching out the homepage, product listing pages, cart, and checkout experience while mapping out the user journey from account creation to purchase completion. A key aspect of this stage was defining how products would be categorized, ensuring that users could easily find what they need through an intuitive navigation system and search functionality with filters.

Once the wireframes were finalized, we structured our Firebase Firestore database, designing an efficient hierarchical system to organize products into collections and subcategories (e.g., "groceries" → "fruits and vegetable" → "fruits"). This allowed us to implement real-time updates, ensuring that newly listed or bumped items immediately reflect on the site without requiring page reloads. Products tagged as "ugly" automatically trigger a discount at checkout, a feature integrated directly into our cart calculation logic. Moving forward, we proceeded with the front-end development, building the website with HTML, CSS, and JavaScript. The homepage was designed to be engaging, featuring a "Featured Listings" section that dynamically updates with the most bumped products, ensuring visibility for popular or promoted items. The navigation system provides quick access to various categories, allowing users to browse through electronics, fashion, home and living, groceries, books, and beauty products. The product listing pages dynamically fetch product data from Firestore and group them into categories such as fruits, vegetables, dairy, and snacks, displaying important details like price, seller, stock count, and bump status. Clicking on a product redirects users to the Product Details Page, where they can view more information, add items to their cart, and choose quantities before purchasing.

To enhance usability, we integrated an interactive cart system that fetches data from both local storage and Firestore, allowing users to review and modify their selected products before checkout. A key challenge was implementing the discount logic for "ugly" products, which we addressed by checking product statuses in Firestore during cart calculations—if any product had the "ugly" tag, a 5% discount is automatically applied to the overall total. Our checkout process, while not handling direct payments due to project scope limitations, redirects users to a confirmation page where they can finalize transactions outside the platform. Throughout the design and development process, usability and user experience were prioritized, ensuring the website remains intuitive, responsive, and visually appealing. We also ensured consistency in branding and styling, refining the footer and overall page structure to maintain a clean and professional appearance. Our design rationale revolves around creating an eco-conscious marketplace that incentivizes sustainable shopping habits while offering the flexibility of a general consumer-to-consumer platform. The combination of financial incentives, real-time updates, dynamic listings, and an easy-to-use interface positions MokeSell as a unique and socially responsible alternative to conventional e-commerce platforms.

# Features
1. “Ugly” Produce Tagging & Discounts
Sellers can label their produce as "Ugly" if it has cosmetic imperfections but remains safe for consumption.
When a buyer adds an “Ugly” product to their cart, the system automatically applies a 5% discount to the total order.
The cart dynamically checks for eligible products in the database and updates the discount accordingly.

2. Bump System for Increased Visibility
Since older listings gradually lose visibility, sellers of bruised produce receive free or discounted bumps to encourage sales.
This aligns with MokeSell’s broader bump system, where listings are promoted based on payment or engagement.

3. Sustainable Shopping Recognition
Buyers who purchase “Ugly” products earn eco-points that could be used for future discounts.
A carbon footprint tracker shows the environmental impact of reducing food waste.

4. Dynamic Featured Listings
Automatically Displays Top 6 Most Bumped Products: Uses Firebase Firestore to fetch the most frequently bumped products and display them on the homepage dynamically.

5. Search & Filter Functionality
Keyword Search: Users can search for items by name.
Category Filters: Allows filtering by category, price range, and product condition.
Real-Time Product Availability: Listings update dynamically based on stock levels.

6. Interactive Shopping Cart
Real-Time Price Calculation: Automatically calculates the total cost, including the 5% discount for "ugly" products.
Editable Cart: Users can increase, decrease, or remove items directly from the cart.
Local Storage & Firestore Sync: The cart saves data in localStorage but also checks Firestore for the latest product prices and availability.

7. Checkout & Transactions
External Payment Processing: Since MokeSell does not handle transactions in-app, users finalize payments externally.
Order Confirmation: Redirects to a confirmation page once a user submits an offer.
Chat System for Negotiations: Buyers can chat with sellers before making an offer.

8. (API) Firebase Firestore (Database)
Stores all user, product, and transaction data.
Manages real-time updates (e.g., stock levels, new listings, bumps).
Fetches and displays product listings dynamically.

9. (API) Firebase Authentication
Handles user registration and login.
Ensures secure authentication before allowing access to platform features.

10. (API) Geolocation API
Used for Location-Based Deals: Shows users nearby discounted grocery items.
Helps categorize listings by location.

11. Customer Support & Feedback
User Feedback System: Users can report issues, complaints, and suggestions.

# Technologies used
1. Database: https://firebase.google.com
2. https://unpkg.com
3. https://cdnjs.cloudflare.com
4. https://www.google.com/recaptcha/api.js

# Credits
1. https://chatgpt.com
2. https://w3schools.com
3. https://unpkg.com
