# Test Tehnique Backend pour MPG

Cette repo contient le code requis pour le test technique backend de MPG.

## Prérequis

Avant de lancer le serveur Express, assurez-vous d'avoir une instance active de Couchbase Local Server sur votre machine. Le serveur Express se connecte à 'localhost' sur le port 3000 par défaut. Une fois votre instance de Couchbase active, vous pouvez également y ajouter des objets pour interagir avec l'API détaillée ci-dessous.

## Installation et exécution du serveur

Pour lancer le serveur Express, assurez-vous d'être dans le répertoire racine du projet. Suivez les étapes ci-dessous :

1. Exécutez la commande `npm install` pour installer les modules Node requis pour le projet.
2. Ensuite, exécutez la commande `npm start` pour créer le fichier `dist` qui sera utilisé par le serveur Express.
3. La commande `npm start` s'occupera également de lancer le serveur Express sur le port 3000.

Assurez-vous que toutes les dépendances nécessaires sont installées avec succès avant d'exécuter `npm start`.



## Documentation de l'API

### Récupérer les membres d'une ligue

- **Endpoint** : `GET /api/fetchLeagueMembers/:leagueId`
- **Description** : Récupère les noms des utilisateurs qui sont membres d'une ligue en fonction de l'ID de ligue .
- **Paramètre** :
  - `leagueId` (string) : L'ID de la ligue.
- **Réponse** :
  - **Code de statut** : 200 (OK)
  - **Corps de la réponse** :
    ```json
    {
      "users": [
        {
          "name": "Greg"
        },
        {
          "name": "Theo"
        }
      ]
    }
    ```
- **Exemple de requête** : `GET /api/fetchLeagueMembers/mpg_league_1`
- **Exemple de réponse** :
  ```json
  {
    "users": [
      {
        "name": "Greg"
      },
      {
        "name": "Theo"
      }
    ]
  }
  ```

### Créer une ligue

- **Endpoint** : `POST /api/createLeague`
- **Description** : Crée une nouvelle ligue MPG.
- **Paramètres** (dans le corps de la requête) :
  - `id` (string, requis) : ID de la ligue.
  - `name` (string, requis) : Le nom de la ligue.
  - `adminId` (string, requis) : ID de l'administrateur de la ligue.
  - `description` (string, requis) : La description de la ligue.
- **Réponse** :
  - **Code de statut** : 201 (Créé)
  - **Corps de la réponse** : Aucun
- **Exemple de requête** :
  ```json
  POST /api/createLeague
  {
    "id": "mpg_league_4",
    "name": "Ma Ligue",
    "description": "Ma nouvelle ligue super",
    "adminId": "user_1"
  }
  ```
- **Exemple de réponse** : Aucun contenu dans la réponse.

### Modifier le nom d'une équipe

- **Endpoint** : `PATCH /api/updateTeamName`
- **Description** : Modifie le nom d'une équipe.
- **Paramètres** (dans le corps de la requête) :
  - `teamId` (string, requis) : L'ID de l'équipe.
  - `newName` (string, requis) : Le nouveau nom de l'équipe.
- **Réponse** :
  - **Code de statut** : 200 (OK)
  - **Corps de la réponse** : Aucun
- **Exemple de requête** :
  ```json
  PATCH /api/updateTeamName
  {
    "teamId": "mpg_team_1_1",
    "newName": "La team d'Octave"
  }
  ```
- **Exemple de réponse** : Aucun contenu dans la réponse.

## Réponses d'erreur

En cas d'erreur, l'API répondra avec le code de statut approprié et un message d'erreur dans le corps de la réponse.

- **Code de statut** : 500 (Erreur interne du serveur)
- **Corps de la réponse** :
  ```json
  {
    "error": "Message d'erreur"
  }
  ```