document.getElementById('signup-form').addEventListener('submit', async function (e) {
  e.preventDefault();  // Prevent default form submission (page reload)

  // Get form field values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  try {
    // Make a POST request to the backend
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',  // Use POST method
      headers: {
        'Content-Type': 'application/json',  // Send data as JSON
      },
      body: JSON.stringify({ username, email, password, confirmPassword }),  // Send form data
    });

    if (response.ok) {
      const data = await response.json();  // Parse the response JSON
      alert(data.message);  // Show success message
    } else {
      const errorData = await response.json();  // Parse error message if any
      document.getElementById('error-message').innerText = errorData.message;  // Display error message
    }
  } catch (error) {
    console.error('Error signing up:', error);
    document.getElementById('error-message').innerText = 'Something went wrong. Please try again.';
  }
});
