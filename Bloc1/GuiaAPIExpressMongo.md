# Bloc 1 – Backend amb Express + MongoDB

## 🎯 Objectiu del bloc

En aquest bloc aprendràs a:

* Entendre què és una API REST
* Connectar Express amb MongoDB mitjançant Mongoose
* Crear un CRUD complet sobre un recurs (`Note`)
* Gestionar errors bàsics en el backend

Treballarem sobre un projecte base que ja està inicialitzat. El teu objectiu serà completar-lo pas a pas.

---
# 🧩 Sessió 1 – Posada en marxa i CRUD bàsic
## 🐳 Infraestructura – MongoDB amb Docker
Per simplificar l'ús de mongo
En aquest bloc utilitzarem **MongoDB dins d’un contenidor Docker**.

Ja heu treballat Docker en altres mòduls, així que només reforçarem el concepte.

### 1️⃣ Fitxer docker-compose.yml

Utilitzarem una variable per al port del host, per si algú el té ocupat.

```yaml
services:
  mongo:
    image: mongo:8.0
    container_name: notes-mongo
    ports:
      - "${MONGO_PORT:-27017}:27017"
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

volumes:
  mongo-data:
```

👉 `${MONGO_PORT:-27017}` significa:

* Si existeix la variable `MONGO_PORT`, s'utilitza
* Si no, per defecte serà 27017

---

### 2️⃣ Configurar el port (opcional)

Al fitxer `.env` del projecte Docker (no el de Node):

```
MONGO_PORT=27018
```

Si no poses res, funcionarà igual amb 27017.

---

````

## 2️⃣ Posar en marxa MongoDB

```bash
docker compose up -d
````

Comprova que està funcionant:

```bash
docker ps
```

### 3️⃣ Connexió des del backend

Utilitzarem també una variable per al port al backend.

Al fitxer `.env` del projecte Node:

```
MONGO_PORT=27017
MONGO_URI=mongodb://localhost:${MONGO_PORT}/notesapp
```

Si algú utilitza un altre port (per exemple 27018), només haurà de canviar:

```
MONGO_PORT=27018
```
Al repositori teniu la carpeta [mongoDocker](./mongoDocker/) amb els fitxers necessaris.   
I a [`mongo.js`](./notes-api/mongo.js):

```js
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
```

 Així mantenim coherència entre Docker i el backend.  
 La base de dades continua sent un servei extern al teu servidor Express.

---

## CRUD Bàsic
A través dels commits pots anar veient l'evolució del projecte.
## 0️⃣ Dependències i extensions
### NPM 
Per iniciar el projecte hem fet:
```
npm init -y
```
Les dependències bàsiques en aquest punt són `express`,  `mongoose`, `dotenv` i `cors` 
```
npm install express mongoose dotenv cors
```
### VS Code Extensions
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [MongoDB for VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)
- Altres: [Recomanacions JSON](./notes-api/.vscode/extensions.json)
  
## 1️⃣ Entendre l’estructura del projecte

Revisa aquests fitxers:

* `index.js` → servidor principal
* `mongo.js` → connexió a la base de dades
* `models/Note.js` → model Mongoose

Model que utilitzarem:

```js
{
    content:
    {
        type: String,
        required: true
    },
    date: Date,
    important: {
        type: Boolean,
        default: false
    }
}
```

Pregunta clau:
👉 Per què el backend ha de validar `content` encara que el frontend també ho faci?

---

## 2️⃣ Implementar GET `/api/notes`

Objectiu:
Retornar totes les notes en format JSON.

Passos:

* Importar el model `Note`
* Crear ruta GET
* Utilitzar Promeses (`.then()` i `.catch()`)
* Retornar array de notes

Comprova amb REST Client o Postman.

---



## 3️⃣ Implementar POST /api/notes

Objectiu:
Crear una nova nota.

Passos:

* Llegir dades de `req.body`
* Crear nova instància de `Note`
* Guardar-la a la base de dades (retorna una Promise)
* Retornar codi 201

Prova:

* Crear una nota amb `content`
* Intentar crear una nota sense `content`

Pregunta:
👉 Quin error obtens? És correcte?

---
✍️ Exercici: Busca com implementar l'endpoint GET `/api/notes/:id` per poder buscar una nota per id.
>Pistes: Busca documentació a:
> - Express sobre `request.params`  
> - Mongoose mètodes `findBy...`
> 

---




# 🧩 Sessió 2– CRUD avançat i millora de qualitat del backend

## 4️⃣ Implementar PUT /api/notes/:id

Objectiu:
Actualitzar una nota existent.

Passos:

* Obtenir `id` dels paràmetres `request.params`
* Actualitzar amb Mongoose `Note.findByIdAndUpdate`
  [Model.findByIdAndUpdate](https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate())
* Gestionar cas "no existeix"

Prova amb ID incorrecte.

---

## 5️⃣ Implementar DELETE /api/notes/:id

Objectiu:
Eliminar una nota.

Passos:

* Buscar per id
* Eliminar
* Retornar codi 204 o missatge coherent

---

## 6️⃣ Middleware notFound

Objectiu:
Gestionar rutes inexistents.

Què ha de fer?

* Retornar 404 en format JSON

---

## 7️⃣ Middleware handleErrors

Objectiu:
Evitar que el servidor es trenqui.

Què ha de fer?

* Capturar errors
* Retornar resposta coherent:

```json
{
  "ok": false,
  "error": "Missatge descriptiu"
}
```

Prova:

* Força errors de validació
* Força ID mal format

---

# ✅ Checklist final

* [ ] El servidor arrenca correctament
* [ ] MongoDB connecta
* [ ] CRUD complet funcional
* [ ] Errors gestionats correctament
* [ ] Respostes sempre en JSON

---

---

# 🔄 Refactorització futura

En aquest bloc treballarem amb **Promeses utilitzant `.then()` i `.catch()`**, perquè és coherent amb el que ja heu treballat al Tema 3.

Més endavant refactoritzarem el codi a **`async/await`**, que és sucre sintàctic sobre Promeses.

Objectiu del refactor:

* Millorar la llegibilitat
* Entendre que `async/await` no és un mecanisme nou
* Veure l’evolució d’un projecte real

---

# 🧠 Reflexió final

Respon aquestes preguntes:

1. Què diferencia un backend "funcional" d’un backend "ben estructurat"?
2. Per què és important gestionar errors explícitament?
3. Què passaria si el frontend enviés dades incorrectes i el backend no validés?

Aquest backend serà la base per els següents blocs, on afegirem WebSockets i el connectarem amb React + TypeScript.
