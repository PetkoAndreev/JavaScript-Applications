import { getAllBooks } from '../api/data.js';
import { html } from '../lib.js';
import { bookPreview, pageTemplate } from './common.js';
// import { getUserData } from '../util.js';

const homeTemplate = (books, pages, page) => html`
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
${pageTemplate(pages, page)}
${books.length == 0
        ? html`<p class="no-books">No books in database!</p>`
        : html`<ul class="other-books-list">
                    ${books.map(bookPreview)}
            </ul>`}
</section>`;

export async function homePage(ctx) {
    const page = Number(ctx.querystring.split('=')[1] || 1);
    const result = await getAllBooks(page);
    const books = result.data;
    const pages = result.pages;
    // if (getUserData()) {
    //     ctx.page.redirect('/memes');
    // }
    // else {
    //     ctx.render(homeTemplate());
    // }
    ctx.render(homeTemplate(books, pages, page));
}