# acdportal

## Install nodejs, npm
Run `npm install` to install all dependences   
Run `npm run build` to build assest files   
Run `npm start` to run web project   
Run `npm run watch-debug` to develop

## Migrate data

Install `migrate-mongo` to use

```
npm install -g migrate-mongo
```

Update `config.js` with `url` and `databaseName`

Run migrate

```
migrate-mongo up
```

Rollback

```
migrate-mongo down
```

Check status migration

```
migrate-mongo status
```

Create migration
```
migrate-mongo create <file_name>
```