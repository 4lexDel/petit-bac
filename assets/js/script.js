var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const categories = [
    "Animaux",
    "Prénoms Garçons",
    "Prénoms Filles",
    "Couleurs",
    "Métiers",
    "Marques",
    "Sports",
    "Parties du corps",
    "Véhicules",
    "Vêtements",
    "Fruit",
    "Légumes",
    "Fleurs",
    "Arbres",
    "Boissons",
    "Pays",
    "Villes",
    "Mots anglais",
    "Films et séries",
    "Dessins animés et Animé",
    "Monstres",
    "Mythologie",
    "Jeux et Jeux vidéo",
    "Langues",
    "Population",
    "Pokémons",
    "Musique et Chanteur",
    "Choses disparues",
    "Monuments et paysages célèbres",
    "Qualités et Défauts",
    "Personne Célèbre",
    "Nourriture",
    "Parfum de Glace",
    "Objets",
    "Instrument de musique",
    "Application",
    "Minerai et Pierre précieuse",
    "Matière Scolaire",
    "Choses Hiver",
    "Choses Eté"
];

const selectedCategories = new Set();


var selectedOptionsList = document.getElementById("selectedCategories");

const categorySwitchContainer = document.getElementById("categorySwitchContainer");
const selectAllCategoriesButton = document.getElementById("selectAllCategories");
const removeAllCategoriesButton = document.getElementById("removeAllCategories");


categories.forEach(category => {
    const switchButton = document.createElement("div");
    switchButton.classList.add("switch");
    switchButton.textContent = category;
    switchButton.addEventListener("click", () => {
        switchButton.classList.toggle("active");
        if (switchButton.classList.contains("active")) {
            selectedCategories.add(category);
        } else {
            selectedCategories.delete(category);
            if (rangeInput.value > selectedCategories.size) {
                rangeInput.value = selectedCategories.size;
            }
        }

        rangeInput.max = Math.max(selectedCategories.size, 1);
        refreshNbCategoryOutput();
    });
    categorySwitchContainer.appendChild(switchButton);
});

selectAllCategoriesButton.addEventListener("click", () => {
    categories.forEach(category => {
        selectedCategories.add(category);
        const switchButton = Array.from(categorySwitchContainer.getElementsByClassName("switch")).find(button => button.textContent === category);
        switchButton.classList.add("active");
    });

    rangeInput.max = Math.max(selectedCategories.size, 1);
    refreshNbCategoryOutput();
});

removeAllCategoriesButton.addEventListener("click", () => {
    categories.forEach(category => {
        selectedCategories.delete(category);
        const switchButton = Array.from(categorySwitchContainer.getElementsByClassName("switch")).find(button => button.textContent === category);
        switchButton.classList.remove("active");
    });

    rangeInput.max = 1;
    refreshNbCategoryOutput();
});

function onGenerateLetter() {
    getLetter();
}

function onGenerateCategory() {
    getCategories();
}

function getLetter() {
    let choice = alphabet[getRandomNumber(0, alphabet.length - 1)];

    alphabet = alphabet.filter(letter => letter != choice);

    if (alphabet.length > 0) letterOutput.textContent = "Lettre => " + choice.toUpperCase();
    else letterOutput.textContent = "Plus de lettres disponibles";
}

function getCategories() {
    if (selectedCategories.size >= 1) {
        selectedOptionsList.innerHTML = ""; // Réinitialise la liste avant d'ajouter les nouvelles options

        getRandomDistinctElements(selectedCategories, rangeInput.value).forEach(function(value) {
            var listItem = document.createElement("li");
            listItem.textContent = value;
            selectedOptionsList.appendChild(listItem);
        });

        return true;
    }
    selectedOptionsList.innerHTML = "Sélectionnées au minimum 1 catégorie";
    return false;
}