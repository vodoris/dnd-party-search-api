# dnd-party-search-api

## Running the Project

First time you clone this repo you'll need to run:

```bash
npm install
```

After which the server should run with the start script:

```bash
npm run start
```

## File Purposes

-   `.eslintignore`, making sure the ES Lint checks ignore the compiled code
-   `.eslintrc.js`, rules for ES Lint to check, this is new for me so playing around with it
-   `.gitignore`, ignoring the normal stuff
-   `jest.config.js`, preparing for eventual testing
-   `nodemon.json`, rather than passing a bunch of flags to the script we set up a config file for nodemon to do its tricks
-   `Procfile`, will probably deploy to Heroku since I pay for an account there while we test development ideas
-   `schema.sql`, trying to keep some level of "documentation" as we iterate this schema
-   `tsconfig.json`, fairly lenient rules for TypeScript, mainly using it as an intellisense booster rather than hardcore type checking
