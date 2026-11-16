import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { NavPagination } from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
//const searchBarContainer = document.querySelector(
//  '[data-js="search-bar-container"]',
//);
//const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
//const prevButton = document.querySelector('[data-js="button-prev"]');
//const nextButton = document.querySelector('[data-js="button-next"]');
//const pagination = document.querySelector('[data-js="pagination"]');

// States changed to let
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
  //const url = "https://rickandmortyapi.com/api/character";
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`,
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    maxPage = result.info.pages;
    pagination.textContent = `${page} / ${maxPage}`;

    cardContainer.innerHTML = "";

    result.results.forEach((character) => {
      const card = createCharacterCard(character);
      cardContainer.append(card);
    });
  } catch (error) {
    console.error(error.message);
  }
}

fetchCharacters();
