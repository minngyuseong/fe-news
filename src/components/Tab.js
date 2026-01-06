export function Tab({ tabItems, groupName = "default" }) {
  const tabItemsHtml = tabItems
    .map(
      (tab) => `
      <button 
        class="flex gap-1 p-0 border-none cursor-pointer bg-transparent"
        data-group="${groupName}" 
        data-tab="${tab}"
      >
        ${tab}
      </button>
  `
    )
    .join("");

  return `<nav class="flex gap-6">${tabItemsHtml}</nav>`;
}
