document.addEventListener('DOMContentLoaded', () => {
    const appId = '61e7ca35'; // Replace with your Edamam API app ID
    const appKey = '472f5d5c28a92d390875041333dbe96b'; // Replace with your Edamam API app key
    const resultsContainer = document.getElementById('results');
    const searchButton = document.getElementById('searchButton');
    const queryInput = document.getElementById('query');

    searchButton.addEventListener('click', () => {
        const query = queryInput.value;
        if (query) {
            fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`)
                .then(response => response.json())
                .then(data => {
                    resultsContainer.innerHTML = '';
                    data.hits.forEach(hit => {
                        const recipe = hit.recipe;
                        const recipeElement = document.createElement('div');
                        recipeElement.classList.add('recipe');
                        recipeElement.innerHTML = `
                            <img src="${recipe.image}" alt="${recipe.label}">
                            <h3>${recipe.label}</h3>
                            <p>Calories: ${recipe.calories.toFixed(2)}</p>
                            <a href="${recipe.url}" target="_blank">View Recipe</a>
                        `;
                        resultsContainer.appendChild(recipeElement);
                    });
                })
                .catch(error => {
                    resultsContainer.innerHTML = 'Error fetching data.';
                    console.error('Error:', error);
                });
        } else {
            resultsContainer.innerHTML = 'Please enter a recipe name.';
        }
    });
});
