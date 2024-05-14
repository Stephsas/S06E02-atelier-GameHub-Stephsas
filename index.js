// Je récupère mon module express
const express = require('express');

const game = require('./my_modules/game');

// Je crée une application express
const app = express();

// Importing a JSON file:
//const game = require('./games.json');


app.use(express.static('public'));

// Je vais préciser à express le moteur de rendu que je vais utiliser
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    res.render('index', { game });
});

app.get('/:gameName', (req, res) => {
    const gameName = req.params.gameName;
console.log(gameName);
    const gameFound = game.find((game) => {
        return game.name === gameName;



    });

    if (!gameFound) {
        // Gérer le cas où aucun jeu correspondant n'est trouvé
        res.status(404).send('Jeu non trouvé');
    } else {
        res.render(gameName, { game: gameFound });
    }

})




// Je lance mon serveur
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

