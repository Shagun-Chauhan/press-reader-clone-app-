document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Create the feedback data object
    const feedbackData = {
      name: name,
      email: email,
      message: message
    };
  
    // Send data to the backend
    fetch('/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackData)
    })
    .then(response => response.json())
    .then(data => {
      // Display success message
      document.getElementById('responseMessage').innerText = data.message;
    })
    .catch(error => {
      document.getElementById('responseMessage').innerText = "Error submitting feedback!";
      console.error('Error:', error);
    });
  });
  