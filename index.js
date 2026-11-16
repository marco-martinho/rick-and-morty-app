import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { createSearchButton } from "./components/SearchBar/SearchBar.js";

const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const cardcontainer = document.querySelector('[data-js="card-container"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);

async function fetchCharacters() {
  const url = "https://rickandmortyapi.com/api/character";

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`,
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Data:", result);

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
