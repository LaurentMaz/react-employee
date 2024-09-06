# React + TypeScript + NodeJS + Express + SQL

Front End for Employees management system.
! This project is not focused on design, responsive is not implemented !

## Authentication

- JWT Token for authentication with cookies
- Protected routes

## Database

- SQL Database (SQL Queries : SELECT, PUT, DELETE, POST)
- Relations and Constraints

## Front end

- Typescript
- React Router DOM
- Custom Hook
- Reusable components
- React Context
- Axios

## Back end

- NodeJs Express Back end
- Connect to SQL DB
- Create API Routes
- SQL Statements
- CORS usage to connect back and front
- Mécanismes d'authentification et d'autorisation pour l'accès aux données : Middleware, JWT

## TODO

### IN PROGRESS

- Update les composants utilisant la SearchBar pour filtrer les données au lieu de API CALLS
- Système de ticket ?

### TODOS

- Afficher le nb de jours de congés n-1 et n restants + alert quand demande > dispo
- Trier les confés par date
- Scale : SSR with express & ReactDOMServer
- Créer un context pour la partie admin (? voir l'utilité)
- Créer les vues des employés
- Ajouter la gestion des téléphones mobiles
- Gérer la date d'entrée des employés pour ajuster le calcul des congés
- Affiner le calcul des congés au réel

### DONE

- Ajouter un filtre sur les colonnes des congés
- Possibilité de modifier le mot de passe d'un employé
- Possibilité de modifier le mot de passe d'un admin
- Possibilité d'ajouter des admins directement depuis l'app via les employés
- Possibilité de modifier l'image d'un employé
- Barre de recherche parmis les employés
- Gérer les pc des employés
- Vérification de sécurité et de BDD (ne pas ajouter plusieurs fois le même user par ex)
- Gérer les congés des employés
- Gérer les congés des employés côté admin
