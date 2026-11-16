export function createSearchButton(searchBarElement, onSearch) {
  searchBarElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = event.target.elements.query.value;

    onSearch(query);
  });
}
