document.addEventListener("DOMContentLoaded", () => {
    loadListings();
    setupProfileForm();
    setupFeedbackForm();
  });
  
  function loadListings() {
    fetch('api/mock-data.json')
      .then(response => response.json())
      .then(data => {
        const listingContainer = document.getElementById('listing-container');
        listingContainer.innerHTML = data.listings.map(listing => `
          <div class="listing">
            <h3>${listing.title}</h3>
            <p>${listing.description}</p>
            <p>Price: $${listing.price}</p>
          </div>
        `).join('');
      })
      .catch(error => console.error('Error loading listings:', error));
  }
  
  function setupProfileForm() {
    const form = document.getElementById('profile-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      alert(`Profile updated: ${username}, ${email}`);
    });
  }
  
  function setupFeedbackForm() {
    const form = document.getElementById('feedback-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const category = document.getElementById('feedback-category').value;
      const message = document.getElementById('feedback-message').value;
      alert(`Feedback submitted: ${category} - ${message}`);
    });
  }
  