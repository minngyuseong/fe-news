// src/components/Header.js
export default class Header {
  constructor() {
    this.shortFormatter = new Intl.DateTimeFormat("ko-KR", { weekday: "long" });
  }

  render() {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const weekday = this.shortFormatter.format(currentDate);

    return `
      <header>
        <span class="display-bold24 title"><i class="icon-news"></i> 뉴스스탠드</span>
        <span class="display-medium16">${dateString} ${weekday}</span>
      </header>
    `;
  }
}
