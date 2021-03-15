VUTTR - backend

This is the codebase for the REST API of VUTTR (Very Useful Tools to Remember), a coding challenge provided by Bossabox.
Tools used

    NodeJS
    npm
    yarn
    AdonisJS v5
    Docker

Usage

    Install dependencies:

yarn

    Install adonis:

npm i -g @adonisjs/cli

    Run migrations:

node ace migration:run

    Generate APP_KEY:

node ace key:generate

    Start local dev server:

node ace serve --watch

Extra steps

    Create your own ".env" file based on ".env.example"
    Visit the swagger documentation on http://localhost:3000/docs or https://very-useful-tools-to-remember.herokuapp.com/docs
    Get the "swagger.json" file on http://localhost:3000/swagger.json or https://very-useful-tools-to-remember.herokuapp.com/swagger.json

Live version

    The live version of the VUTTR website is hosted on https://vuttr-frontend.netlify.app
