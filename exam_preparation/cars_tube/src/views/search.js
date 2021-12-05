import { searchCars } from '../api/data.js';
import { html } from '../lib.js';

const searchTemplate = (cars, onSearch, params = '') => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value="${params || ''}">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="listing">
        ${cars.length == 0
        ? html`<p class="no-cars"> No results.</p>`
        : cars.map(carPreview)
    }
    </div>
</section>`;

const carPreview = (car) => html`
<div class="preview">
    <img src=${car.imageUrl}>
</div>
<h2>${car.brand} ${car.model}</h2>
<div class="info">
    <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
    </div>
    <div class="data-buttons">
        <a href="/details" class="button-carDetails">Details</a>
    </div>`;

export async function searchPage(ctx) {
    const params = Number(ctx.querystring.split('=')[1]);
    let cars = [];

    if (params) {
        cars = await searchCars(params);
    }

    ctx.render(searchTemplate(cars, onSearch, params));

    function onSearch() {
        const search = document.getElementById('search-input').value;

        if (search) {
            ctx.page.redirect('/search?query=' + search);
        }
    }
}

// export async function searchPage(context) {
//     const year = Number(context.querystring.split('=')[1]);
//     const cars = Number.isNaN(year) ? [] : await search(year);
//     context.render(template(cars, onSearch, year));

//     function onSearch() {
//         const query = document.getElementById('search-input').value;

//         if(Number.isNaN(query)==false){
//             context.page.redirect('/search?query='+query)
//         }else{
//             return alert('Year must be positive number!')
//         }
//     }
// }