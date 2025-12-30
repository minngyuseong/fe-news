// src/components/NewsGrid.js
export default class NewsGrid {
  constructor(newsItems) {
    this.newsItems = newsItems || [];
  }

  render() {
    const gridCells = this.newsItems
      .map(
        (item) => `
      <div class="grid-cell border-default">
        <img src="${item.logo}" alt="${item.name}">
      </div>
    `
      )
      .join("");

    return `
      <div class="grid-content">
        ${gridCells}
      </div>
    `;
  }

  updateNews(newsItems) {
    this.newsItems = newsItems;
  }
}
