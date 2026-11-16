export function createCharacterCard(character) {
  // const characterCard = document.querySelector('[data-js="card-container"]');
  const characterCard = document.createElement("li");
  characterCard.classList.add("character-card");

  characterCard.innerHTML = `
        <div class="character-card">
            <img src="${character.image}" alt="${character.name}" />
            <h3>${character.name}</h3>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Occurrences: ${character.occurences}</p>
        </div> `;
  return characterCard;
}
