// ---- App variables -----
const invaderElement = document.querySelector('#invader');
const configurationPanel = document.querySelector('#configuration');
const colorPickerPanel = document.querySelector('#color-picker'); 
let colors = ['black', 'gray', 'orange', 'green', 'blue'];
let colorPicked = colors[0];
let gridSize = 8;
let pixelSize = 30;

// ---- App Helpers -----


// ---- App Functions -----
function createGrid() {
    for (let row = 1; row <= gridSize; row++) {
        // Je créé ma ligne
        const newRow = document.createElement('div');
        newRow.classList.add('row');

        for (let cell = 1; cell <= gridSize; cell++) {
            // Je créé une celulle
            const newCell = document.createElement('div');
            newCell.classList.add('cell');

            // On défini la taille de notre pixel
            newCell.style.height = `${pixelSize}px`;
            newCell.style.width = `${pixelSize}px`;

            // On ajoute un écouteur d'évènement sur ma celulle
            newCell.addEventListener('click', function (eventInfos) {
                const cell = eventInfos.target;

                for(color of colors) {
                    cell.classList.remove(`cell--${color}`);
                }

                cell.classList.add(`cell--${colorPicked}`);
            });

            // Je l'ajoute à ma ligne
            newRow.append(newCell);
        }

        // J'ajoute ma ligne dans #invader
        invaderElement.append(newRow);
    }
}

// fonction qui est appelée par l'event "input" sur notre ... input de taille de grille
function handleGridSizeInput(eventInfos) {
    gridSize = eventInfos.target.value;
}

// fonction qui est appelée par l'event "input" sur notre ... input de taille de pixel
function handlePixelSizeInput(eventInfos) {
    pixelSize = eventInfos.target.value;
}

function handleConfigurationSubmit(eventInfos) {
    eventInfos.preventDefault();

    invaderElement.innerHTML = '';
    // relancer la grille
    createGrid();
}

function createConfigurationPanel() {
    // créer un input pour la taille de la grille
    const gridSizeInput = document.createElement('input');
    gridSizeInput.placeholder = 'Taille de la grille';
    gridSizeInput.value = gridSize;

    gridSizeInput.addEventListener('input', handleGridSizeInput);
    
    // créer un input pour la taille des pixels
    const pixelSizeInput = document.createElement('input');
    pixelSizeInput.placeholder = "Taille d'un pixel";    
    pixelSizeInput.value = pixelSize;

    pixelSizeInput.addEventListener('input', handlePixelSizeInput)
    
    // créer un bouton eSSDSDsd
    const configurationSubmitButton = document.createElement('button');
    configurationSubmitButton.textContent = "Valider";

    // ajouter tout ça au panneau de configuration
    configurationPanel.append(gridSizeInput);
    configurationPanel.append(pixelSizeInput);
    configurationPanel.append(configurationSubmitButton);

    configurationPanel.addEventListener('submit', handleConfigurationSubmit);
}

function handleClickOnColorButton(event) {
    colorPicked = event.target.dataset.color;
}

function createColorsPicker() {
    // on génère les boutons pour la sélection de la couleur
    // on doit avoir ce genre de résultats
    // <button class="color color--black"></button>
    for(let color of colors) {
       const colorButton = document.createElement('button');
       colorButton.classList.add('color');
       colorButton.classList.add(`color--${color}`);
       colorButton.dataset.color = color;

       colorButton.addEventListener('click', handleClickOnColorButton)

       colorPickerPanel.append(colorButton);
    }
}

// ---- App Launch -----
createConfigurationPanel();
createColorsPicker();
createGrid();
