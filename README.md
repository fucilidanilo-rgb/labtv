
# 🎬 LABTV — Piattaforma Cinema Full Stack

LABTV è un'applicazione web Full Stack dedicata alla scoperta e alla gestione di film, sviluppata come progetto portfolio per mettere in pratica competenze di sviluppo frontend, backend, autenticazione e gestione dei dati.

Il frontend è realizzato con Angular 21 e TypeScript, mentre il backend utilizza Java 21, Spring Boot, Spring Security e MySQL.

## 🌐 Demo online

**[Apri LABTV](https://labtv-omega.vercel.app/)**

### Credenziali dimostrative

- **Email:** `demo@labtv.example`
- **Password:** `LabTV-Demo-2026!`

La registrazione pubblica è disabilitata nella demo.

Gli acquisti sono simulati, non prevedono pagamenti reali e utilizzano dati condivisi tra i visitatori dell'account demo.

### ⏳ Attenzione: hosting gratuito

Il backend è ospitato su Render Free.

Dopo un periodo di inattività, il servizio può entrare in modalità standby. Di conseguenza, il primo login o la prima richiesta al backend possono richiedere un minuto o più.

**Se il primo accesso è lento, attendere che il server completi l'avvio.**

Le richieste successive sono generalmente più rapide.

Questo comportamento dipende dai limiti dell'hosting gratuito.

## ✨ Funzionalità principali

- Consultazione del catalogo cinematografico tramite TMDB API.
- Ricerca dei film per titolo.
- Visualizzazione dei dettagli dei film.
- Autenticazione tramite JWT.
- Gestione della sessione utente.
- Rotte protette tramite Angular Auth Guard.
- Acquisto simulato dei film.
- Visualizzazione della libreria dei film acquistati.
- Restituzione dei film.
- Sincronizzazione degli acquisti con il backend.
- Notifiche toast per conferme ed errori.
- Pagina dedicata alla presentazione del progetto.
- Interfaccia responsive con stile cinematografico.

## 🛠️ Tecnologie utilizzate

### Frontend

- Angular 21
- TypeScript
- HTML5
- CSS3
- Angular Router
- RxJS
- Angular HttpClient
- Angular Reactive UI e componenti standalone

### Backend

- Java 21
- Spring Boot 4.1.1
- Spring Security
- JWT
- BCrypt
- Spring Data JPA
- Hibernate
- REST API

### Database e infrastruttura

- MySQL — Aiven
- Docker
- Render Free — Backend
- Vercel Free — Frontend
- Git e GitHub

## 🏗️ Architettura del progetto

LABTV utilizza un'architettura a livelli che separa frontend, backend e persistenza dei dati.

```text
          UTENTE
             |
             v
     ANGULAR 21 + TYPESCRIPT
          (Vercel)
             |
             | HTTP / REST API
             | JWT Authentication
             v
      SPRING BOOT + JAVA
           (Render)
             |
             | JPA / Hibernate
             v
          MYSQL
          (Aiven)
```

Il frontend comunica con Spring Boot attraverso richieste HTTP.

Il backend gestisce autenticazione, acquisti e restituzioni, mentre MySQL conserva i dati degli utenti e degli acquisti.

Le informazioni cinematografiche vengono recuperate tramite TMDB API.

## 🔐 Sicurezza e autenticazione

LABTV implementa un sistema di autenticazione basato su Spring Security e JWT.

Le principali funzionalità di sicurezza includono:

- Verifica delle credenziali attraverso il backend.
- Password protette mediante hashing BCrypt.
- Generazione e utilizzo di token JWT.
- Invio del token nelle richieste HTTP autenticate.
- Protezione della sezione Acquisti tramite Auth Guard.

La registrazione degli utenti è implementata nel backend, ma non è abilitata nella demo pubblica.

## 📂 Struttura del frontend

La struttura principale dell'applicazione comprende:

```text
src/
  app/
    components/
      navbar/

    pages/
      home/
      login/
      register/
      movie-detail/
      purchases/
      contacts/
      project/

    services/
      auth.ts
      movies.ts

    guards/
      auth-guard.ts

    interceptors/
      auth.interceptor.ts

    models/
      movie.ts

    app.routes.ts
    app.config.ts
    app.ts

  environments/
```

I componenti Angular gestiscono l'interfaccia, i Service centralizzano la comunicazione con le API e l'Auth Guard protegge le rotte che richiedono autenticazione.

## 💻 Avvio del frontend in locale

### Requisiti

- Node.js compatibile con Angular 21
- npm
- Angular CLI

### 1. Clonare il repository

```bash
git clone https://github.com/fucilidanilo-rgb/labtv.git
```

### 2. Entrare nella cartella

```bash
cd labtv
```

### 3. Installare le dipendenze

```bash
npm install
```

### 4. Configurare l'ambiente

Verificare che il file di ambiente Angular contenga gli indirizzi corretti per TMDB e per il backend Spring Boot.

L'URL dell'API backend online è:

```text
https://labtv-backend.onrender.com/api
```

Per eseguire il frontend contro un backend locale, configurare invece l'indirizzo appropriato, ad esempio:

```text
http://localhost:8080/api
```

È necessaria una chiave API TMDB valida.

Non inserire credenziali del database, chiavi JWT o altri segreti backend nel frontend.

### 5. Avviare Angular

```bash
npx ng serve
```

Aprire nel browser:

```text
http://localhost:4200
```

Il backend deve essere raggiungibile affinché login, acquisti e restituzioni funzionino.

JSON Server è stato utilizzato durante le prime fasi dello sviluppo, ma le funzionalità principali sono ora collegate al backend Spring Boot.

## 🚀 Deployment

| Componente | Tecnologia | Hosting |
|------------|------------|---------|
| Frontend | Angular 21 | Vercel Free |
| Backend | Spring Boot | Render Free |
| Database | MySQL | Aiven Free |
| Catalogo film | TMDB API | Servizio esterno |

Il frontend viene pubblicato su Vercel tramite il repository GitHub.

Il backend viene distribuito separatamente tramite Render e Docker.

## 🔗 Repository

**Frontend Angular:**

https://github.com/fucilidanilo-rgb/labtv

**Backend Spring Boot:**

https://github.com/fucilidanilo-rgb/labtv-backend

**Demo:**

https://labtv-omega.vercel.app/

## 🎯 Obiettivo formativo

LABTV è stato sviluppato per consolidare competenze pratiche in:

- Sviluppo di componenti Angular.
- Programmazione TypeScript.
- Gestione di API REST.
- Comunicazione frontend/backend.
- Autenticazione e autorizzazione.
- Persistenza dei dati con MySQL.
- Organizzazione del codice in livelli.
- Debugging e gestione degli errori.
- Deployment di applicazioni Full Stack.

Il progetto rappresenta un'esperienza pratica di sviluppo, integrazione e pubblicazione di un'applicazione web completa.

## 👨‍💻 Autore

**Danilo Fucili**

Junior Full Stack Developer

[Profilo GitHub](https://github.com/fucilidanilo-rgb)
```
