// Initialization
//  - find relevant section
//  - detach section from DOM

import { showView } from './dom.js';

const section = document.getElementById('edit-movie');
section.remove();

// display logic
export function showEdit() {
    showView(section);
}