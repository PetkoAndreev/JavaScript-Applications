import { searchAlbums } from '../api/data.js';
import { html } from '../lib.js';
import { albumPreview } from './common.js';

const searchTemplate = (albums, onSearch, params = '') => html`
<section id="searchPage">
    <h1>Search by Name</h1>
    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value="${params || ''}">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="search-result">
    ${albums.length == 0
        ? html`<p class="no-result">No result.</p>`
        : albums.map(albumPreview)
    }  
    </div>
</section>`;


export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1];
    let albums = [];

    if (params) {
        albums = await searchAlbums(params);
    }

    ctx.render(searchTemplate(albums, onSearch, params));

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