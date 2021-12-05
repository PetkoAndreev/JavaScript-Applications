import { deleteBookById, getBookById, getLikesByBookId, getMyLikeByBookId, likeBook } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, onDelete, likes, showLikeBtn, onLike) => html`
<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <div class="actions">
        ${booksControlTemplate(book, isOwner, onDelete)}
        ${likeControlsTemplate(showLikeBtn, onLike)}
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${likes}</span>
        </div>
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`;

const booksControlTemplate = (book, isOwner, onDelete) => {
    if (isOwner) {
        return html`
        <a class="button" href="edit/${book._id}">Edit</a>
        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`;
    }
    else {
        return null;
    }
};

const likeControlsTemplate = (showLikeBtn, onLike) => {
    if (showLikeBtn) {
        return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`;
    }
    else {
        return null;
    }
};

export async function detailsPage(ctx) {
    const userData = getUserData();
    const [book, likes, hasLike] = await Promise.all([
        getBookById(ctx.params.id),
        getLikesByBookId(ctx.params.id),
        userData ? getMyLikeByBookId(ctx.params.id, userData.id) : 0
    ]);

    const isOwner = userData && book._ownerId == userData.id;
    const showLikeBtn = userData != null && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeBtn, onLike));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${book.title}?`);

        if (choice) {
            await deleteBookById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await likeBook(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}