# NGI Calculator 


## Configuration du serveur RabbitMQ

- Activer l'accusé de reception (noAck : false)

- Desactiver la persistance (durable : false )

- Attribuer aux queues un prefetch de 1 calcul pour éviter la surcharge

- Pour la première étape, crée un exchange direct avec le type d'opération comme clé

- Ajouter un TTL aux messages (pas de TTL pour les queues )

- Creér un retour RPC pour afficher la liste des opérations

## Lancer le projet 

Dans le dossier rabbitmq, lancer :
### `npm install`
### `npm run start`


Dans le dossier client, lancer :
### `npm install`
### `npm start`

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir la page dans votre navigateur.

## Lancer le projet avec Docker 

A la racine du projet executer cette commande pour lancer le serveur RabbiMQ et observer depuis le terminal des opérations de calculs aléatoires

### `docker-compose up --build`

## Organisation du projet

### Le front

Le front permet de choisir le calcul envoyé à l'aide la calculatrice.

### Le back

On produit des calculs aléatoires, 4 opérations sont possibles, puis on les publie sur le serveur rabbitMQ.

Ces opérations sont mises dans des queues en fonction de la binding key qui leur est associée, cette clé change en fonction de l'opération.

Les messages dans les queues contenants les opérations sont consommés par le consomer associé à chaque opération. Une réponse contenant le résultat est renvoyé.

### Websocket

LE websocket permet au front et au back de communiquer continuellement afin de recevoir les opérations et de renvoyer le résultat.