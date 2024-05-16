// Je récupère mon module express
const express = require('express');

// recuperer le fichier games.json
const games = require('./games.json')

// Je crée une application express
const app = express();

// Avant tous les autres middlewares, je vais rajouter celui qui va me permettre de logger les informations
app.use((req, res, next) => {
    const now = new Date();
  
  // Quand tu auras finis de faire ta requête, fait le console.log
  // Ça permet de connaitre le code de statut HTTP de la réponse
  req.on('end', () => {
    console.log(`[${now.toISOString()} ${req.ip}] ${res.statusCode} ${req.path}`)
  })

  next()
})

app.use(express.static('public'));



// faire une variable avec tous nos jeux

app.locals.games = games;

// Je vais préciser à express le moteur de rendu que je vais utiliser
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

// ON récupère le paramètre de notre URL
app.get('/:gameName', (req, res, next) => {
    const gameName = req.params.gameName;
    const gameFound = games.find((game) => game.name === gameName);
    if (!gameFound) {
        next(); // Passer à la gestion des erreurs 404
    } else {
        res.render(gameName, { game: gameFound });
    }
});
// Middleware pour error 404

app.use((req, res, next) => {
    res.status(404).send('Oups, page non trouvée');
});

// Je lance mon serveur
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

