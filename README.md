# React + TypeScript + NodeJS + Express + SQL

Employees management system.
This project is not focused on design, responsive is not implemented !

Presentation video : [Cliquez ici](https://youtu.be/IOp-V1XN25k)

## Authentication

- JWT Token for authentication with cookies
- Protected routes

## Database

- SQL Database (SQL Queries : SELECT, PUT, DELETE, POST)
- Relations and Constraints

## Front end

- Typescript
- React Router DOM with Outlet and Nested routes
- Custom Hook
- Reusable components (Button, Input, SearchBar,..etc)
- React Context API
- Axios
- useCallback

## Back end

- NodeJs Express Back end
- Connect to SQL DB
- Create a connexion Pool
- Create API Routes
- SQL Statements
- CORS usage to connect back and front
- Mécanismes d'authentification et d'autorisation pour l'accès aux données : Middleware, JWT

## Testing

- Unit tests with Vitest
- React Testing Library and JSDOM
- Testing Components

## TODO

### IN PROGRESS

- Ajout d'une section commentaires dans la gestion des équipements
- Système de ticket : delete + update tickets from employees + all admin ticket system

### TODOS

- Afficher le nb de jours de congés n-1 et n restants + alert quand demande > dispo
- Trier les congés par date
- Scale : SSR with express & ReactDOMServer
- Ajouter la gestion des téléphones mobiles
- Gérer la date d'entrée des employés pour ajuster le calcul des congés
- Affiner le calcul des congés au réel
- Improve JWT with Short lived access token & Refresh Token
- Mocking APIs
- Testing Forms
- Testing State Management
- Testing Authentication
- Testing Routing

### DONE

- Créer les vues des employés
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
