import { html } from '../lib.js';

export const bookPreview = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`

export const pageTemplate = (pages, page) => html`
<div>
${page > 1 ? html`<a class="button" href=${`?page=${page - 1}`}>&lt; Prev</a>` : null}
${page < pages ? html`<a class="button" href=${`?page=${page + 1}`}>Next &gt;</a>` : null}
</div>`;