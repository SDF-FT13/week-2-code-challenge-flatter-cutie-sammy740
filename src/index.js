document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");

    let currentCharacter = null;

    // Fetch characters and display them in the character bar
    fetch("http://localhost:3000/characters")
        .then(res => res.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span);
            });
        });

    // Display character details
    function displayCharacter(character) {
        currentCharacter = character;
        nameElement.textContent = character.name;
        imageElement.src = character.image;
        imageElement.alt = character.name;
        voteCount.textContent = character.votes;
    }

    // Handle votes form submission
    votesForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!currentCharacter) return;
        const newVotes = parseInt(votesInput.value) || 0;
        currentCharacter.votes += newVotes;
        voteCount.textContent = currentCharacter.votes;
        votesInput.value = "";
    });

    // Reset votes
    resetButton.addEventListener("click", () => {
        if (!currentCharacter) return;
        currentCharacter.votes = 0;
        voteCount.textContent = "0";
    });
});c// Your code here
