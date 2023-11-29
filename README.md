# IWA - Frontend

## Prérequis

- Node.js
- npm (Node Package Manager)
- Expo Go (pour tester sur un appareil mobile)

## Structure du projet

Le projet suit une structure de dossier standard pour un projet Expo utilisant le File System Router. Voici une vue d'ensemble des principaux répertoires et fichiers :
**/src** contient tout le code source de l’application
    **/app** contient le code de l’application lorsque aucun utilisateur n’est connecté
        **/api** : configurations pour les appels API et le cache
        **/(app)** contient le code de l’application lorsqu'un utilisateur est connecté
            **/offres** : gestion des offres d’emploi et tout ce qui en découle
            **/profile** : composants et logique du profil de l’utilisateur connecté
        **/ui** : composants réutilisés par l’interface utilisateur
        **/utils** : fonctions utilitaires

## Technologies utilisées

- React Native: Framework de développement d'applications mobiles.
- Expo: Plateforme pour le développement rapide d'applications mobiles.
- Tailwind CSS: Framework CSS pour une gestion facile des styles.
- Redux Toolkit (Et RTK Query): Librairie de State Management pour ReactJs.
- React Native Paper: Librairie de composants stylisés pour React Native.

## Scripts NPM

Les scripts contenus dans le package.json servent à démarrer l’application en mode développement, notamment 
```bash
npm start
```
et 
```bash
npm run tunnel
```
(utilisé en cas de problèmes de réseau)

## Installation

Pour installer le projet, clonez le dépôt git avec la commande suivante : 
```bash
git clone https://github.com/Project-IWA/IWA-Front.git
```
La dernière version du code se trouve sur la branche dev.

Il faut ensuite installer les dépendances avec la commande suivante : 
```bash
npm install
```

Enfin, vous êtes libre de lancer le projet avec un des scripts évoqués précédemment.

## Développeurs

- Jason MORET
- Marwane TOURY
- Karim AIDIBI

