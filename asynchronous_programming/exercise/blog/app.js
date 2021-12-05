function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
}

attachEvents();

async function displayPost() {
    // get selected value from list
    // load post
    // load coments for post
    // render data
    const titleEl = document.getElementById('post-title');
    const bodyEl = document.getElementById('post-body');
    const ulEl = document.getElementById('post-comments');

    const selectedId = document.getElementById('posts').value;

    titleEl.textContent = 'Loading...';
    bodyEl.textContent = '';
    ulEl.replaceChildren();

    const [post, comments] = await Promise.all([
        getPostById(selectedId),
        getCommentsByPostId(selectedId)
    ]);

    titleEl.textContent = post.title;
    bodyEl.textContent = post.body;

    comments.forEach(c => {
        const liEl = document.createElement('li');
        liEl.textContent = c.text;
        ulEl.appendChild(liEl);
    })
}

async function getAllPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    const res = await fetch(url);
    const data = await res.json();

    const selectElement = document.getElementById('posts');
    selectElement.replaceChildren();
    Object.values(data).forEach(p => {
        const optionEl = document.createElement('option');
        optionEl.textContent = p.title;
        optionEl.value = p.id;

        selectElement.appendChild(optionEl)
    })

    // parse data and populate list
}

async function getPostById(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    const res = await fetch(url);
    return await res.json();
}

async function getCommentsByPostId(postId) {
    url = 'http://localhost:3030/jsonstore/blog/comments';
    const res = await fetch(url);
    const data = await res.json();

    return Object.values(data).filter(c => c.postId == postId);
}