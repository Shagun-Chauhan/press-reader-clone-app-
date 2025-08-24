document.addEventListener("DOMContentLoaded", function () {
    // Fetch the news from the backend
    fetch('http://localhost:3000/news')  // Corrected URL to backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the response as JSON
        })
        .then(data => {
            console.log('Fetched news:', data);  // Log the data to the console

            // Check if articles are available
            if (data && data.articles && data.articles.length > 0) {
                displayNews(data.articles);  // Display articles if available
            } else {
                displayNoResultsMessage();  // Show a message if no articles are found
            }
        })
        .catch(error => {
            console.error('Error fetching the news:', error);
            displayNoResultsMessage();  // Show a message if there's an error
        });
});

// Function to display the articles on the page
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';  // Clear any previous content

    // Loop through the articles and create HTML elements for each
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');

        // Title
        const title = document.createElement('h2');
        title.textContent = article.title || 'No title available';
        articleElement.appendChild(title);

        // Description
        const description = document.createElement('p');
        description.textContent = article.description || 'No description available';
        articleElement.appendChild(description);

        // Link to article
        const link = document.createElement('a');
        link.href = article.url || '#';
        link.textContent = 'Read more';
        link.target = '_blank';  // Open link in a new tab
        articleElement.appendChild(link);

        // Image (optional)
        if (article.urlToImage) {
            const image = document.createElement('img');
            image.src = article.urlToImage;
            image.alt = article.title || 'News image';            
            articleElement.appendChild(image);
        }

        newsContainer.appendChild(articleElement);
    });
}

// Function to display a message if no articles are found
function displayNoResultsMessage() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '<p>No news articles found at the moment. Please try again later.</p>';
}
