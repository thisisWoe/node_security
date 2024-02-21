# Security & Auth - Node, Express

Un sistema di sicurezza completo per applicazioni web, che implementa autenticazione, gestione dei ruoli, e varie misure di sicurezza per proteggere le tue applicazioni Node.js. Utilizzando Express.js come framework di base, questo progetto incorpora funzionalità avanzate come hashing delle password, limitazione delle richieste, sicurezza degli headers HTTP e gestione dei token JWT.

## Caratteristiche

- **Autenticazione degli utenti** con hash delle password.
- **Gestione dei ruoli utente** per il controllo degli accessi.
- **Protezione da attacchi di forza bruta** con limitazione delle richieste.
- **Sicurezza migliorata degli headers HTTP** con Helmet.
- **Generazione e verifica di token JWT** per sessioni sicure.
- **Log delle attività** tramite Winston per un facile debugging e monitoraggio.

## Tecnologie Utilizzate

- **Node.js**
- **Express.js**
- **PostgreSQL** con Sequelize per la gestione del database.
- **bcrypt** per l'hashing delle password.
- **dotenv** per la gestione delle variabili d'ambiente.
- **express-rate-limit** per limitare le richieste ripetute.
- **Helmet** per migliorare la sicurezza degli headers HTTP.
- **Joi** per la validazione dell'input.
- **JSON Web Token (JWT)** per la gestione delle sessioni.
- **Winston** per il logging delle attività.

## Prerequisiti

Prima di installare il progetto, assicurati di avere **Node.js** e **PostgreSQL** installati sul tuo sistema.

## Installazione

### Clona il Repository

### Installazione delle dipendenze
```bash
npm install
```


### Configurazione del file .env
Crea un file .env nella radice del progetto seguendo le indicazioni fornite in .env.example, inserendo i tuoi dati di configurazione per il database e le chiavi segrete:
##### Esempio di contenuto per .env
```bash
# Chiave segreta per la firma dei token JWT
JWT_SECRET=YOUR_JWT_SECRET
# Stringa di connessione al database PostgreSQL
DATABASE_URL=postgresql://DB_HOST:DB_PORT/DB_NAME
# La porta su cui il server Node.js sarà in ascolto
PORT=YOUR_PORT
# Nome dell'utente per la connessione al database PostgreSQL
DB_USER=YOUR_DB_USER
# Password per la connessione al database PostgreSQL
DB_PASSWORD=YOUR_DB_PASSWORD
# Nome del database a cui l'applicazione si connetterà
DB_NAME=YOUR_DB_NAME
# Host dove è in esecuzione il database
DB_HOST=YOUR_DB_HOST
# Il dialetto del database utilizzato dall'ORM (in questo caso Sequelize)
DB_DIALECT=postgres
# La porta su cui è in ascolto il servizio database PostgreSQL
DB_PORT=YOUR_DB_PORT
# Impostazioni di SendinBlue
SENDIN_BLUE_KEY=YOUR_SENDIN_BLUE_KEY
SENDIN_BLUE_EMAIL=YOUR_SENDIN_BLUE_EMAIL
SENDIN_BLUE_PORT=587
SENDIN_BLUE_HOST=smtp-relay.sendinblue.com
TITLE_MAIL="Your Mail Title"
SUBJECT_MAIL="Your Default Email Subject"
# Durata della validità del token temporaneo, come quello usato per il reset della password o la conferma dell'account
TEMPORARY_TOKEN=YOUR_TEMPORARY_TOKEN_DURATION
# URL di base usato per costruire il link di reset della password inviato agli utenti via email
RESET_PASSWORD_URL=YOUR_RESET_PASSWORD_BASE_URL
# URL di base usato per costruire il link di conferma registrazione inviato agli utenti nuovi via email
CONFIRM_REGISTRATION_URL=YOUR_CONFIRM_REGISTRATION_BASE_URL
```

### Esecuzione
Per avviare l'applicazione, esegui:
```bash
cd src
node index.js
```

### Contatti
Per qualsiasi domanda o suggerimento, sentiti libero di contattarmi all'indirizzo a.rondolini.dev@gmail.com.
Tieni a mente che è il mio primo progetto node e qualsiasi consiglio è ben accetto!






















