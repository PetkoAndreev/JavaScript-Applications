import { page } from './lib.js';
import decorateContext, { updateUserNav } from './middlewares/decorateContext.js';
import { carsPage } from './views/all_cars.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/my_cars.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';

page(decorateContext);
page('/', homePage);
page('/cars', carsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-cars', profilePage);
page('/search', searchPage);

updateUserNav();
page.start();