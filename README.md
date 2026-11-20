
# 🎬 LABTV — Full Stack Movie Platform

**LABTV** è un'applicazione web Full Stack dedicata alla scoperta, consultazione e gestione di un catalogo cinematografico.

Il progetto è stato sviluppato come portfolio personale per dimostrare competenze pratiche in **Angular, TypeScript, Java, Spring Boot, API REST, autenticazione JWT e database relazionali**.

## 🌐 Live Demo

**Frontend:** https://labtv-omega.vercel.app/

**Backend:** https://labtv-backend.onrender.com

### Account dimostrativo

- Email: `demo@labtv.example`
- Password: `LabTV-Demo-2026!`

La registrazione pubblica è disabilitata nella demo.

> Il backend utilizza Render Free e può sospendersi dopo un periodo di inattività. Il primo accesso potrebbe richiedere un minuto o più.

## ✨ Funzionalità

- Catalogo cinematografico integrato con TMDB API
- Ricerca dei film per titolo
- Schede film con dettagli e contenuti multimediali
- Login con autenticazione JWT
- Protezione delle rotte Angular tramite Auth Guard
- Acquisto simulato di film, senza pagamenti reali
- Archivio dei film acquistati
- Restituzione dei film
- Sincronizzazione delle operazioni con il backend
- Notifiche toast per operazioni ed errori
- Interfaccia responsive
- Pagina Project dedicata alla presentazione tecnica

L'account demo utilizza dati condivisi tra i visitatori.

## 🛠️ Tech Stack

### Frontend
- Angular 21
- TypeScript
- HTML5 e CSS3
- Angular Router
- Angular HttpClient
- RxJS
- Componenti standalone

### Backend
- Java 21
- Spring Boot 4.1.1
- Spring Security
- Spring Data JPA
- Hibernate
- REST API
- JWT Authentication
- BCrypt Password Hashing

### Database
- PostgreSQL
- Neon (cloud database)

### Deployment
- Vercel — Frontend
- Render — Backend
- Docker — Containerizzazione backend
- Git e GitHub — Versionamento

## 🏗️ Architettura

```text
                  USER
                    |
                    v
             Angular 21
              TypeScript
               (Vercel)
                    |
             HTTP / REST API
             JWT Bearer Token
                    |
                    v
             Spring Boot
               Java 21
               (Render)
                    |
          Controller / Service
               Repository
                    |
              JPA / Hibernate
                    |
                    v
            PostgreSQL
                (Neon)

TMDB API ---> Catalogo cinematografico
```

Il frontend gestisce l'interfaccia utente e l'interazione con il catalogo.

Il backend gestisce autenticazione e operazioni applicative attraverso API REST.

PostgreSQL conserva i dati persistenti gestiti dal backend.

La piattaforma TMDB fornisce le informazioni cinematografiche.

## 🔐 Sicurezza

L'autenticazione è basata su Spring Security e JWT.

Il progetto comprende:

- Verifica delle credenziali sul backend
- Password protette con BCrypt
- Generazione di token JWT
- Invio del token nelle richieste autenticate
- Protezione delle rotte tramite Angular Auth Guard
- Controllo delle autorizzazioni lato server
- Registrazione pubblica disabilitata nella demo

Le credenziali del database e le chiavi JWT non devono essere pubblicate nel repository.

## 💻 Esecuzione in locale

### Requisiti

- Node.js compatibile con Angular 21
- npm
- Configurazione delle API necessarie

### Installazione

```bash
git clone https://github.com/fucilidanilo-rgb/labtv.git
cd labtv
npm install
```

### Avvio

```bash
npm start
```

Aprire:

http://localhost:4200

Per il corretto funzionamento delle funzionalità collegate al backend è necessario configurare l'indirizzo delle API.

Backend online:

https://labtv-backend.onrender.com/api

È inoltre necessaria una configurazione TMDB valida per recuperare i dati cinematografici.

## 🔄 Evoluzione del progetto

LABTV è nato come progetto Angular per la consultazione di film tramite TMDB.

Successivamente sono state aggiunte:

1. Autenticazione e gestione utenti
2. Backend Java con Spring Boot
3. Sicurezza JWT e BCrypt
4. Operazioni di acquisto e restituzione simulate
5. Persistenza dei dati tramite JPA
6. Deploy Full Stack su Vercel e Render
7. Migrazione del database cloud da Aiven MySQL a Neon PostgreSQL

JSON Server e MySQL/Aiven appartengono alle precedenti fasi di sviluppo e non rappresentano l'infrastruttura cloud attuale.

## 📂 Repository collegati

**Frontend Angular:**
https://github.com/fucilidanilo-rgb/labtv

**Backend Spring Boot:**
https://github.com/fucilidanilo-rgb/labtv-backend

## 🎯 Competenze applicate

- Sviluppo frontend con Angular e TypeScript
- Componenti e servizi Angular
- Integrazione di API REST
- Programmazione Java e Spring Boot
- Architettura Controller / Service / Repository
- Autenticazione JWT e Spring Security
- Persistenza relazionale con PostgreSQL
- Gestione e debugging delle chiamate HTTP
- Git e GitHub
- Deployment Full Stack

## 👨‍💻 Autore

**Danilo Fucili**

Junior Full Stack Developer

GitHub: https://github.com/fucilidanilo-rgb
