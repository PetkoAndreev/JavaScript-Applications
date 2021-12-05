import { getCatalogGames } from '../api/data.js';
import { html } from '../lib.js';
import { gameCard } from './common.js';

const homeTemplate = (games) => html`
<section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="./images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>
    ${games.length != 0
        ? games.map(gameCard)
        : html`<p class="no-articles">No games yet</p>`
    }
    
</div>
</section>`;

export async function homePage(ctx) {
    const games = await getCatalogGames();
    ctx.render(homeTemplate(games));
}