# Installation Guide
Clone the repository
```
git clone git@github.com:Marto113/Internship.git
```

Run the client
```
cd ./Internship/client
npm i
npm run start
```
Run the server
```
cd ./Internship/service
npm i
npm run dev
```

Create an .env file and add the variables in this format:
```
PORT={YOUR_PORT}

DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/mydb?schema=public"
```