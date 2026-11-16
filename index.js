import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States changed to let
let maxPage = 1;
let page = 1;
let searchQuery = "";

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

    cardContainer.innerHTML = "";

    result.results.forEach((character) => {
      const card = createCharacterCard(character);
      cardContainer.append(card);
    });

    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
fetchCharacters();
