Lancement front:

`cd frontend && npm start`

Lancement back:

`cd api && rails server -p 3501`

Choix réalisés:
- Stockage des indicateurs en JSON pour pouvoir en avoir des differents pour chaque collecte et les afficher sans problemes.
- PostgreSQL en database pour pouvoir y stocker des tableaux.

Voies d'amélioration:
- Stocker les differents indicateurs dans la db et les lier aux collections, pour pouvoir afficher des informations spécifiques a chaque indicateur.
- Proposer un choix du type (string, number, date, ...) pour chaque indicateur.
- Pouvoir réorganiser les indicateurs, les renommer, les modifer.
- Ajouter une vérification backend pour les données recues et mieux faire remonter les erreurs.
