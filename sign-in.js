document.getElementById('signin-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5500/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
    } else {
      document.getElementById('error-message').innerText = data.message;
    }
  } catch (error) {
    console.error('Error signing in:', error);
    document.getElementById('error-message').innerText = 'Something went wrong. Please try again.';
  }
});
