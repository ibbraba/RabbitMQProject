# NGI Calculator 


## Configuration du serveur RabbitMQ

- Activer l'accusé de reception (noAck : false)

- Desactiver la persistance (durable : false )

- Attribuer aux queues un prefetch de 2 calculs pour éviter la surcharge

- Pour la première étape, crée un exchange direct avec le type d'opération comme clé

- Ajouter un TTL aux messages (pas de TTL pour les queues )

- Creér un retour RPC pour afficher la liste des opérations