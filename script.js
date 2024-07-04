//Commentaires français/anglais pour me faciliter la lecture du code

let score = 0; // Score initial  // Initial score
let partie = 0; // Parties initiales  // Initial parts
let user = []; // choix du joueur // Player choices
let dechetAlt = null; // Variable de stockage du dechet aléatoire // Random waste storage variable

// DOM Elements
const number1 = document.getElementById('number1'); // Bouton pour poubelle jaune // yellow hair button
const number2 = document.getElementById('number2'); // Bouton pour poubelle verte // green hair button
const number3 = document.getElementById('number3'); // Bouton pour poubelle bleue // blue hair button
const number4 = document.getElementById('number4');  // Bouton pour poubelle marron // brown hair button
const resultat = document.getElementById('result'); // Résultat du joueur // Player result
const score1 = document.getElementById('score'); // Affiche le score // Player score
const screen1 = document.getElementById('first-screen'); // Écran du jeu // Screen game
const screen2 = document.getElementById('second-screen'); // Écran des résultats // Screen result
const resultFinal = document.getElementById('result-final'); // Résultats détaillés // Detailed result
const finalScore = document.getElementById('score-final'); // Affiche le score final // Final score

// Ajout d'écouteurs d'événements pour les boutons des poubelles
// Added event listeners for trash can buttons
number1.addEventListener('click', () => poubelleChoice('jaune'));
number2.addEventListener('click', () => poubelleChoice('verte'));
number3.addEventListener('click', () => poubelleChoice('bleue'));
number4.addEventListener('click', () => poubelleChoice('marron'));

// Liste des déchets // Dechet list
const dechets = [
    new Dechet('Bouteille en plastique', 'jaune'),
    new Dechet('Journal', 'bleue'),
    new Dechet('Bouteille en verre', 'verte'),
    new Dechet('Restes alimentaires', 'marron'),
    new Dechet('Boîte de conserve', 'jaune'),
    new Dechet('Papier', 'bleue'),
    new Dechet('Bocal en verre', 'verte'),
    new Dechet('Épluchures', 'marron'),
    new Dechet('Magazine', 'bleue'),
    new Dechet('Litière pour chat', 'marron'),
];

// Copie de la liste initiale des déchets // Copy of the initial waste list
let dechetsList = dechets.slice();

// Fonction constructeur d'un déchet (nom et catégorie)
// Constructor function of a waste (name and category)
function Dechet(nom, category) {
    this.nom = nom;
    this.category = category;
}

// Fonction pour afficher le prochain déchet
// Function to display the next waste
function newDechet() {
    if (partie >= 10) { // Si la partie atteint les 10 questions // If the game reaches 10 questions
        screenEnd(); // Affiche l'écran des résultats // Displays the results screen
        return; //Stoppe la fonction // Stop function
    }

    const index = Math.floor(Math.random() * dechetsList.length); // Sélectionne un déchet aléatoire // Select random dechet
    dechetAlt = dechetsList[index]; // Stockage de la liste dans dechetAlt // Select a random trash
    document.getElementById('dechets-name').innerHTML = dechetAlt.nom; // Affiche le déchet sélectionné // Displays the selected waste

    dechetsList.splice(index, 1); // Suppression du déchet joué de la liste // Remove played trash from list
    partie++; // Incrémente le score +1 point // Increment the score +1 point
}

// Fonction de gestion le clic sur une poubelle
// Management function when clicking on a trash can
function poubelleChoice(type) {
    const good = type === dechetAlt.category; // Vérification du choix/catégorie // Verification of choice/category

    user.push({
        dechet: dechetAlt.nom, // Nom du déchet // Dechet name
        selectedType: type, // Catégorie sélectionnée par le joueur // Category selected by player
        correctType: dechetAlt.category, // Catégorie correcte // Correct category
        correct: good // Valide la bonne réponse // Validate the correct answer
    });

    if (good) {
        resultat.innerHTML = 'Bravo ! Bonne réponse !'; // Affiche "Correct!" si bonne réponse // Displays "Correct!" such a good answer
        resultat.className = 'correct'; // Ajoute la classe "correct" pour le css // Add the "correct" class for the css
    } else {
        // Affiche "incorrect!" si mauvaise réponse // Displays "Correct!" such a good answer
        resultat.innerHTML = `Mauvaise réponse ! Le déchet "${dechetAlt.nom}" va dans la poubelle ${dechetAlt.category} !`; 
        resultat.className = 'incorrect'; // Ajoute la classe "incorrect" pour le css // Add the "incorrect" class for the css
    }

    score += good; // Incrémente le score si la réponse est correcte // Increment the score if the answer is correct
    score1.innerHTML = `Score: ${score}/${partie}`; // Met à jour l'affichage du score // Updates the score display

    newDechet(); // Affiche le prochain déchet // Display the next waste
}

// Fonction d'affichage des résultats // Results display function
function screenEnd() {
    screen1.style.display = 'none'; // Cache l'écran du jeu // Hide screen game
    screen2.style.display = 'block'; // Affiche l'écran des résultats // Show screen result
    resultFinal.innerHTML = ''; // Vide le conteneur des résultats // Empty screen result

    user.forEach(choice => {
        const resultItem = document.createElement('div'); // Crée une nouvelle div par résultat // Create a new div per result
        resultItem.className = 'result-detail'; // Ajoute une classe pour le style // Add a class for the style
        resultItem.innerHTML = `
            <p>${choice.dechet}</p>
            <p>Votre choix: ${choice.selectedType}</p>
            <p>Bonne réponse: ${choice.correctType}</p>
            <p class="${choice.correct ? 'correct' : 'incorrect'}">${choice.correct ? 'Correct' : 'Incorrect'}</p>
        `; // Remplit le div avec les détails du résultat // Fill the div with the result details
        resultFinal.appendChild(resultItem); // Ajoute le div au conteneur des résultats // Add the div to the results container
    });

    finalScore.innerHTML = `Votre score final est: ${score}/10`; // Affiche le score final // Show final score
}

// Bouton redémarrer
document.getElementById('restart-btn').addEventListener('click', () => {
    screen1.style.display = 'block'; // Affiche l'écran du jeu // Show screen game
    screen2.style.display = 'none'; // Cache l'écran des résultats // Hide screen result
    initGame(); // Réinitialise le jeu // Reset game
});

// Fonction pour initialiser le jeu // Reset game function
function initGame() {
    score = 0; // Réinitialise le score // Reset score
    partie = 0;  // Réinitialise le nombre de parties // Reset parts number
    user = []; // Vide les choix de l'utilisateur // Empty user choices
    resultat.innerHTML = ''; // Vide les textes de résultats // Clear the result text
    score1.innerHTML = ''; // Vide l'affichage du score // Clear the score display
    dechetsList = dechets.slice(); // Réinitialise la liste des déchets // Reset dechet list
    newDechet(); // Affiche le premier déchet ** Show first dechet
}

// Démarre le jeu // Start the game
initGame();
