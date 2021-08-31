const mongoose = require('mongoose'); //To allow our Node code to access and interact with the a mongoDB database
const app = require('./app'); //this command will show all environmenlet variables in the cnso.
//to creat the schema
const dotenv = require('dotenv'); //we need this to connect our node app to the configue file

dotenv.config({ path: './config.env' });
//this command will read the config variable and seave them into node js environment variables

//Start the server************************************

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  //.connect(process.env.DATABASE_LOCAL, {to connect to the local server
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false, //these three lignes it just about dealing with some deprecation warnings, yu can always use them
  })
  .then(() => {
    console.log('DB connection successful');
  }); //this connect will return a promese

const port = process.env.PORT || 3000;
const server =  app.listen(port, () => {//w'll use the server in order to close the server nicely when there are a promes rejection
  console.log(`App running on port ${port}...`);
});

//Globaly for all unhondled (promess) rejection error like when we couldnt connect to the DB. We called our safty net.
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1); //To exit the app and the message will be: [nodemon] app crashed - waiting for file changes before starting...
  });//
  process.exit(1); //To exit the app and the message will be: [nodemon] app crashed - waiting for file changes before starting...
}); //in order to listen to the event unhandeledjejection
