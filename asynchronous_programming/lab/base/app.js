window.addEventListener('DOMContentLoaded', start);

async function start() {
    const main = document.querySelector('main');

    const recipes = await getRecipes();
    main.replaceChildren();

    recipes.map(createPreview).forEach(e => main.appendChild(e));
}

function createPreview(recipe) {
    const articleElement = document.createElement('article');
    articleElement.className = 'preview';
    articleElement.innerHTML = `<div class="title">
    <h2>${recipe.name}</h2>
</div>
<div class="small">
    <img src="${recipe.img}">
</div>`;

    articleElement.addEventListener('click', () => {
        articleElement.querySelector('h2').textContent = 'Loading...'
        togglePreview(recipe._id, articleElement)
    })
    return articleElement;
}

async function togglePreview(id, preview) {
    const recipe = await getRecipeById(id);

    const element = document.createElement('article');
    element.innerHTML = `<h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb">
            <img src="${recipe.img}">
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map(s => `<p>${s}</p>`).join('')}
    </div>`;

    preview.replaceWith(element);
}

async function getRecipes() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';

    const res = await fetch(url);
    const data = await res.json();

    return Object.values(data);
}

async function getRecipeById(recipeId) {
    const url = 'http://localhost:3030/jsonstore/cookbook/details/' + recipeId;

    const res = await fetch(url);
    const data = res.json();

    return data;
}