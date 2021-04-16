# dnd-party-search-api

## Running the Project

First time you clone this repo you'll need to run:

```bash
npm install
```

After which the server should run with the start script:

```bash
npm run dev
```

## File Purposes
-   `.gitignore`, ignoring the normal stuff
-   `nodemon.json`, rather than passing a bunch of flags to the script we set up a config file for nodemon to do its tricks
-   `Procfile`, will probably deploy to Heroku since I pay for an account there while we test development ideas
-   `schema.sql`, trying to keep some level of "documentation" as we iterate this schema
-   `tsconfig.json`, fairly lenient rules for TypeScript, mainly using it as an intellisense booster rather than hardcore type checking

## Authentication

Any protected API Endpoint will require the presence of a valid JSON Web Token in the request headers as a Bearer Token:

```js
headers: {
    'Authorization': `Bearer ${YOUR_TOKEN}`
}
```

## Validation

Using `celebrate` to validate at the very least the `req.body` since there ain't no way the documentation will stay up-to-date for each route. So for example if the `/api/auth/register` route requires an `email` and `password` request body, and we typo or miss `email` here's an example error response:

```json
{
	"statusCode": 400,
	"error": "Bad Request",
	"message": "celebrate request validation failed",
	"validation": {
		"body": {
			"source": "body",
			"keys": ["email"],
			"message": "\"email\" is required"
		}
	}
}
```
