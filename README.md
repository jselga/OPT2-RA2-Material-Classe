# Frameworks i Serveis Web
## RA2: Desenvolupa aplicacions web completes emprant frameworks JavaScript, integrant les funcionalitats de client i servidor, i aplicant bones pràctiques de modularització i gestió de dades.

En aquesta part treballarem amb el stack MERN (Mongo Express, React i Node)

### Continguts:

- Express i Node: API bàsica
- MongoDB: Base de dades NoSQL
- Mongoose: ORM/ODM JS per connectar Node amb MongoDB
- API amb DB: Connectarem l'API a la DB
- React TS: Ampliarem el React que ja coneixem fent ús de TypeScript

### Temari:

- Bloc 1: Backend base: MongoDB + Express
- Bloc 2: React + TypeScript

>Objectiu: Tenir els coneixements bàsics per poder desenvolupar una web app fullstack amb tecnologies basades en JS
### Estructura del repositori simplificada:
```
.
├── Bloc1
│   ├── mongoDocker // Servei mongo amb Docker
│   │   └── docker-compose.yml
│   ├── notes-api // Api amb Express
│   │   ├── middlewares
│   │   │   ├── handleErrors.js
│   │   │   └── notFound.js
│   │   ├── models
│   │   │   └── Note.js
│   │   ├── mongodbPlaygrounds
│   │   │   └── createManyNotes.mongodb.js
│   │   ├── request
│   │   │   ├── delete_note.rest
│   │   │   ├── get_all_notes.rest
│   │   │   ├── post_note.rest
│   │   │   └── put_note.rest
│   │   ├── index.js
│   │   └── mongo.js
│   └── GuiaAPIExpressMongo.md
├── Bloc2
│   ├── react-notes-app // FrontEnd amb ReactTS
│   │   ├── src
│   │   │   ├── services
│   │   │   │   └── notes.ts
│   │   │   ├── types
│   │   │   │   └── Note.ts
│   │   │   ├── App.tsx
│   │   │   ├── index.css
│   │   │   ├── main.tsx
│   │   │   └── NoteForm.tsx
│   │   └── index.html
│   └── GuiaReactTs.md
├── FasesProjecte.md // Enunciat del Projecte final
└── README.md
```

### Avaluació:
Projecte Web App amb stack MERN 
### Exemple Projecte MERN desenvolupat pel professorat:
- Frontend amb React TS:
  - [Frontend Demo](https://github.com/jselga/zelda-react-app-demo)
  - [Frontend Code](https://github.com/jselga/zelda-react-app)
- Backend amb Node, Express i Mongo:
  - [Backend Code](https://github.com/jselga/APIRestFullZelda)
>⚠️ Important: Per fer servir el Frontend amb tota la seva funcionalitat cal activar el backend seguint les instruccions.

 