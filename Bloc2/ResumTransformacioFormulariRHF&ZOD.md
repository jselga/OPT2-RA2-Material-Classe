# Transformació d’un formulari controlat a React Hook Form + Zod

## 1. Punt de partida: Formulari controlat

En un formulari controlat tradicional amb React:

- `useState` controla cada camp
- Els `onChange` actualitzen l’estat
- El `onSubmit` rep l’event
- La validació és manual

### Estructura típica

- Estat:
  - `newContent`
- Listeners:
  - `onContentChange`
  - `onImportantChange`
- Submit:
  - `(e: React.FormEvent<HTMLFormElement>)`
  - `e.preventDefault()`
  - Construcció manual de l’objecte

### Flux mental

Submit → Event → preventDefault → llegir estat → validar → enviar

---

## 2. Problemes del model controlat

- Molt codi repetitiu
- Validació dispersa
- Més probabilitat d’errors
- Lògica de formulari barrejada amb lògica de negoci
- Escalabilitat limitada en formularis grans

---

# 3. Nou model: React Hook Form (RHF)

Amb RHF:

- La llibreria gestiona l’estat intern del formulari
- `register()` substitueix els listeners manuals
- `handleSubmit()` gestiona el preventDefault
- El component pare només rep dades netes

### Nou flux mental

Submit → RHF → Validació → dades validades → funció onSubmit

Ja no treballem amb l’event, treballem amb dades.

---

# 4. Afegint Zod

Zod aporta:

- Validació declarativa
- Tipus inferits automàticament
- Errors coherents i centralitzats

### Avantatge clau

El tipus del formulari es genera a partir del schema:

- Una sola font de veritat
- Sense duplicació de tipus
- Sense inconsistències

Arquitectura resultant:

Schema (Zod) → Tipus → RHF → Component pare

---

# 5. Canvi en les props del component

## Abans

- newContent
- editingNote
- onContentChange
- onImportantChange
- onSubmit(event)

## Després

- editingNote (opcional)
- onSubmit(data validat)

RHF elimina:

- Estat manual
- Listeners manuals
- Gestió d’event

---

# 6. Gestió del mode edició

Amb formulari controlat:

- setNewContent(editingNote)

Amb RHF:

- `reset()` per sincronitzar dades externes

Important:

- `defaultValues` només s’aplica al primer render
- Per canvis dinàmics cal usar `reset()`

---

# 7. Responsabilitats després de la transformació

## RHF

- Estat del formulari
- Registre d’inputs
- Integració amb validació

## Zod

- Regles de validació
- Missatges d’error
- Tipatge fort

## Component pare

- Decidir si és CREATE o UPDATE
- Cridar API
- Gestionar estat global

---

# 8. Guany arquitectònic

Abans:

Component controla tot

Després:

Delegació professional de responsabilitats

Resultat:

- Menys codi
- Més robust
- Més escalable
- Més alineat amb entorns professionals

---

# 9. Canvi conceptual clau

Formulari controlat → controlo events

RHF + Zod → controlo dades validades

Aquest és el salt real de maduresa en React.

# 10. Dependències del useEffect amb RHF

En el formulari controlat tradicional, sovint trobàvem:

- `useEffect(() => { ... }, [])`

És a dir, un efecte que només s’executava al muntatge.

Amb React Hook Form, quan gestionem el mode edició amb `reset()`, el patró correcte és:

- `useEffect(() => { ... }, [editingNote, reset])`

Per què?

- `editingNote` pot canviar (editar → crear → editar una altra nota)
- `reset` és una funció proporcionada per RHF i forma part del contracte del hook

Això implica:

- L’efecte ja no és "només al muntatge"
- És un efecte de sincronització entre props externes i estat intern de RHF

Canvi conceptual important:

Abans:

`useEffect` per inicialitzar

Ara:

`useEffect` per sincronitzar dades externes amb una llibreria que gestiona estat intern

Això reflecteix un nivell més avançat de comprensió del cicle de vida i de la gestió d’estat en React.
