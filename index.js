import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { createSearchButton } from "./components/SearchBar/SearchBar.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { NavPagination } from "./components/NavPagination/NavPagination.js";

const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const cardContainer = document.querySelector('[data-js="card-container"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

const prevButton = NavButton("previous", "button button--prev", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

const pagination = NavPagination(
  `${page} / ${maxPage}`,
  "navigation__pagination",
);

const nextButton = NavButton("next", "button button--next", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

navigation.append(prevButton, pagination, nextButton);

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`,
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Data:", result);

    maxPage = result.info.pages;
    pagination.textContent = `${page} / ${maxPage}`;

    cardContainer.innerHTML = "";

    result.results.forEach((character) => {
      const characterCard = createCharacterCard(character);
      cardContainer.append(characterCard);
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    cardContainer.innerHTML =
      "<p>Failed to load characters. Please try again later.</p>";
  }
}

createSearchButton(searchBar, (query) => {
  searchQuery = query;
  page = 1;
  fetchCharacters();
});

fetchCharacters();
