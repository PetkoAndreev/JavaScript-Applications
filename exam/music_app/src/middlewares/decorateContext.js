import { logout } from '../api/api.js';
import { page, render } from '../lib.js';
import { getUserData } from '../util.js';

const root = document.getElementById('main-content');
document.getElementById('user-logoutBtn').addEventListener('click', onLogout);

export default function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

export function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('user-create').style.display = 'inline-block';
        document.getElementById('user-logoutBtn').style.display = 'inline-block';
        document.getElementById('guest-login').style.display = 'none';
        document.getElementById('guest-register').style.display = 'none';
    }
    else {
        document.getElementById('user-create').style.display = 'none';
        document.getElementById('user-logoutBtn').style.display = 'none';
        document.getElementById('guest-login').style.display = 'inline-block';
        document.getElementById('guest-register').style.display = 'inline-block';
    }
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}