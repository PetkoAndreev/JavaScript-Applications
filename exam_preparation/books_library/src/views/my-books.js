import { getMyBooks } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';
import { bookPreview, pageTemplate } from './common.js';

const myBooksTemplate = (books, pages, page) => html`
<section id="my-books-page" class="my-books">
<h1>My Books</h1>
${pageTemplate(pages, page)}
${books.length == 0
    ? html`<p class="no-books">No books in database!</p>`
    : html`<ul class="my-books-list">
                ${books.map(bookPreview)}
        </ul>`}
</section>`;

export async function myBooksPage(ctx) {
    const page = Number(ctx.querystring.split('=')[1] || 1);
    const userData = getUserData();
    const result = await getMyBooks(userData.id, page);
    const books = result.data;
    const pages = result.pages;
    // if (getUserData()) {
    //     ctx.page.redirect('/memes');
    // }
    // else {
    //     ctx.render(homeTemplate());
    // }
    ctx.render(myBooksTemplate(books, pages, page));
}