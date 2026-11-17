import getRandomColor from "../../utils/randomColor.js";

// ==========================================
// CREATE CHARACTER CARD
// ==========================================

// Create and return a card containing the character's information.

export function createCharacterCard(character) {
  const card = document.createElement("li");
  card.classList.add("card");

  const randomColor = getRandomColor();
  card.style.setProperty("--card-color", randomColor);

  // Add the character's image and information to the card.

  card.innerHTML = `
    <div class="card__image-container">
      <img
        class="card__image"
        src="${character.image}"
        alt="${character.name}"
        loading="lazy"
        decoding="async"
      />
      <div class="card__image-gradient"></div>
    </div>
    <div class="card__content">
      <h2 class="card__title">${character.name}</h2>
      <dl class="card__info">
        <dt class="card__info-title">Status</dt>
        <dd class="card__info-description">${character.status}</dd>
        <dt class="card__info-title">Type</dt>
        <dd class="card__info-description">${character.type || "Odd"}</dd>
        <dt class="card__info-title">Occurrences</dt>
        <dd class="card__info-description">${character.episode.length}</dd>
      </dl>
    </div>
  `;

  // Return the completed character card.

  return card;
}
