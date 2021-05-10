# Server Base - Proyecto ONG

## Envinroment setup

1. Create database
2. Copy .env.example to .env and fill with database credentials.

To install dependencies run

```bash
npm install
```

3. Migrations:

```bash
npx sequelize-cli db:migrate
```

4. Seeders:

```bash
npx sequelize-cli db:seed:all
```

## Start local server

```bash
npm start
```

## Seeder info for testing - Admin Users

email: manuel@test.com
password: manuel

email: santiago@test.com
password: santiago

email: gonzalof@test.com
password: gonzalof

email: gonzalor@test.com
password: gonzalor

email: yuliya@test.com
password: yuliya

email: joaquin@test.com
password: joaquin

email: walter@test.com
password: walter

email: tomasob@test.com
password: tomasob

email: sergio@test.com
password: sergio

email: maurop@test.com
password: maurop

## Seeder info for testing - Regular Users

email: francisco@test.com
password: francisco

email: daniel@test.com
password: daniel

email: flores@test.com
password: flores

email: alejandro@test.com
password: alejandro

email: vanessa@test.com
password: vanessa

email: victorio@test.com
password: victorio

email: ayleen@test.com
password: ayleen

email: josefina@test.com
password: josefina

email: gabriela@test.com
password: gabriela

email: dumistasio@test.com
password: dumistasio
