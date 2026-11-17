import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { createSearchButton } from "./components/SearchBar/SearchBar.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { NavPagination } from "./components/NavPagination/NavPagination.js";

// ==========================================
// DOM ELEMENTS
// ==========================================

// Select the HTML elements used by the application.

const searchBar = document.querySelector('[data-js="search-bar"]');
const navigationTop = document.querySelector('[data-js="navigation-top"]');
const navigationBottom = document.querySelector(
  '[data-js="navigation-bottom"]',
);
const cardContainer = document.querySelector('[data-js="card-container"]');

// ==========================================
// STATES
// ==========================================

// Store the current page, total pages and search query.

let maxPage = 1;
let page = 1;
let searchQuery = "";

// ==========================================
// CONTROL BORDER COLOUR
// ==========================================

// Generate a random colour for the search bar and pagination borders.

const paginationElements = [];
const controlColor = `hsl(${Math.floor(Math.random() * 360)} 80% 55%)`;

document.documentElement.style.setProperty("--control-color", controlColor);

// ==========================================
// CREATE PAGINATION
// ==========================================

// Create the pagination controls for the top and bottom of the page.

[navigationTop, navigationBottom].forEach((navigation) => {
  // Create the previous button.

  const prevButton = NavButton("previous", "button button--prev", () => {
    if (page > 1) {
      page--;
      fetchCharacters();
    }
  });

  // Create the page counter.

  const pagination = NavPagination(
    `${page} / ${maxPage}`,
    "navigation__pagination",
  );

  // Create the next button.

  const nextButton = NavButton("next", "button button--next", () => {
    if (page < maxPage) {
      page++;
      fetchCharacters();
    }
  });

  // Store the page counter so it can be updated after each API request.

  paginationElements.push(pagination);

  // Add the buttons and page counter to the navigation.

  navigation.append(prevButton, pagination, nextButton);
});

// ==========================================
// FETCH CHARACTERS
// ==========================================

// Fetch characters from the API using the current page and search query.

async function fetchCharacters() {
  try {
    // Send the request to the Rick and Morty API.

    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`,
    );

    // Check if the API request was successful.

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    // Convert the API response into JavaScript data.

    const result = await response.json();
    console.log("API Data:", result);

    // Update the total number of pages.

    maxPage = result.info.pages;

    // Update both pagination counters.

    paginationElements.forEach((pagination) => {
      pagination.textContent = `${page} / ${maxPage}`;
    });

    // Clear the existing character cards.

    cardContainer.innerHTML = "";

    // Create and display a card for each character.

    result.results.forEach((character) => {
      const characterCard = createCharacterCard(character);
      cardContainer.append(characterCard);
    });
  } catch (error) {
    // Log the error and display a message if the request fails.

    console.error("Error fetching characters:", error);
    cardContainer.innerHTML =
      "<p>Failed to load characters. Please try again later.</p>";
  }
}

// ==========================================
// SEARCH
// ==========================================

// Update the search query and return to the first page when a search is submitted.

createSearchButton(searchBar, (query) => {
  searchQuery = query;
  page = 1;
  fetchCharacters();
});

// ==========================================
// INITIAL LOAD
// ==========================================

// Load the first page of characters when the application starts.

fetchCharacters();
