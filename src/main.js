import { greet } from './utils/greeting.js';

const app = document.getElementById('app');
app.innerHTML = `<h1>${greet()}</h1>`;
