// Simple functionality for search bar
document.getElementById("search-btn").addEventListener("click", function () {
    const searchInput = document.getElementById("search-input").value.trim();
    if (searchInput) {
      alert(`Searching for: ${searchInput}`);
    } else {
      alert("Please enter a search term!");
    }
  });
  
  // CTA Button Click
  document.querySelector(".cta-btn").addEventListener("click", function () {
    alert("Redirecting to the seller registration page...");
  });  

  document.getElementById('send-button').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;
  
    // Display user input in chatbox
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    
    // Send the user input to Dialogflow API
    const response = await getDialogflowResponse(userInput);
    
    // Display Dialogflow response in chatbox
    chatbox.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;
    
    // Clear the input field
    document.getElementById('user-input').value = '';
  });
  
  async function getDialogflowResponse(query) {
    const projectId = 'your-project-id'; // replace with your Dialogflow project ID
    const sessionId = '12345';  // Replace with a unique session ID if necessary
    const languageCode = 'en-US';
  
    const queryText = query;
  
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: queryText,
          languageCode: languageCode,
        },
      },
    };
  
    // Send request to Dialogflow
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
  
    return result.fulfillmentText; // Return the bot's response
  }
  