// Je récupère mon module express
const express = require('express');

// recuperer le fichier games.json
const games = require('./games.json')

// Je crée une application express
const app = express();

app.use(express.static('public'));

// faire une variable avec tous nos jeux

app.locals.games = games;

// Je vais préciser à express le moteur de rendu que je vais utiliser
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:gameName', (req, res) => {
    const gameName = req.params.gameName;
    console.log(gameName);
    const gameFound = games.find((game) => {
        return game.name === gameName;

    });

    // Gérer le cas où aucun jeu correspondant n'est trouvé
    if (!gameFound) {

        res.status(404).send('Jeu non trouvé');
    } else {
        res.render(gameName, { game: gameFound });
    }

})


// Je lance mon serveur
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

