# Introduction
Open-source cross plarform application built with [electron](https://www.electronjs.org/). This is a simple app that will help you maintain your small business. It is completely offline, so you do not have to worry about paying any kind of server fee.

We are using Sqlite3 database, with sync folder to Dropbox/Google Drive (the choice is yours).

## Setup
We are using electron with React UI. You will have to install two application using npm. First install electron app with
```shell
npm install
```

For installing the React UI, run these commands
```shell
cd core-ui
npm install
```

## Run
When in development mode, you have to run two servers, start the electron server with,
```
npm start
```
if you face any electron build issue, try to run these commands to fix the issues,
```shell
npx rebuild
# or
/node_modules/.bin/electron-rebuild
```

Start the react UI by going inside the folder from terminal,
```shell
cd core-ui
npm run dev
```