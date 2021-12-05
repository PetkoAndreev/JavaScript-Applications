// Initialization
//  - find relevant section
//  - detach section from DOM

import { showView } from './dom.js';

const section = document.getElementById('add-movie');
section.remove();

// display logic
export function showCreate() {
    showView(section);
}