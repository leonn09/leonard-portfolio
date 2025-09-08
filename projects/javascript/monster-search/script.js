const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const skillName = document.getElementById("skill");
const skillDesc = document.getElementById("skill-desc");
const types = document.getElementById("types");
const monsterStats = document.getElementById("monster-stats");
const hp = document.getElementById("hp");
const atk = document.getElementById("attack");
const def = document.getElementById("defense");
const spAtk = document.getElementById("special-attack");
const spDef = document.getElementById("special-defense");
const spd = document.getElementById("speed");

async function fetchCreatures() {

    const creature = searchInput.value;
    types.innerHTML = "";

    try {
        const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${creature}`);
        const data = await response.json();

        creatureName.textContent = data.name.toUpperCase();
        creatureId.textContent = ` #${data.id}`;
        creatureWeight.textContent = `Weight: ${data.weight}`;
        creatureHeight.textContent = ` Height: ${data.height}`;

        for (let i = 0; i < data.types.length; i++) {
            types.innerHTML += `<span class="type-container ${data.types[i].name}">${data.types[i].name.toUpperCase()}</span>`;
        }

        skillName.textContent = `${data.special.name}`;
        skillDesc.textContent = `${data.special.description}`;

        monsterStats.style.display = "grid";
        hp.textContent = data.stats[0].base_stat;
        atk.textContent = data.stats[1].base_stat;
        def.textContent = data.stats[2].base_stat;
        spAtk.textContent = data.stats[3].base_stat;
        spDef.textContent = data.stats[4].base_stat;
        spd.textContent = data.stats[5].base_stat;


    } catch (error) {
        creatureName.textContent = "";
        creatureId.textContent = "";
        creatureWeight.textContent = "";
        creatureHeight.textContent = "";
        skillName.textContent = "";
        skillDesc.textContent = "";
        types.innerHTML = "";
        monsterStats.style.display = "none";
        hp.textContent = "";
        atk.textContent = "";
        def.textContent = "";
        spAtk.textContent = "";
        spDef.textContent = "";
        spd.textContent = "";
        alert("Creature Not Found");
    }
}

searchButton.addEventListener("click", fetchCreatures);
