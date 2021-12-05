import { getAllGames } from '../api/data.js';
import { html } from '../lib.js';
import { catalogGameCard } from './common.js';

const catalogTemplate = (games) => html`
<section id="catalog-page">
<h1>All Games</h1>
${games.length != 0
        ? games.map(catalogGameCard)
        : html`<h3 class="no-articles">No articles yet</h3>`
    }
</section > `;


export async function catalogPage(ctx) {
    const games = await getAllGames();
    ctx.render(catalogTemplate(games));
}