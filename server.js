const mongoose = require('mongoose'); //To allow our Node code to access and interact with the a mongoDB database
const app = require('./app'); //this command will show all environmenlet variables in the cnso.
//to creat the schema
const dotenv = require('dotenv'); //we need this to connect our node app to the configue file


dotenv.config({ path: './config.env' });
//this command will read the config variable and seave them into node js environment variables

//Start the server************************************

//console.log(app.get('env'));//this variable set by express
//console.log(process.env); //this variables set by node

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
//console.log(DB);

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

// const testTour = new Tour({
//   name: 'The Park Camper',

//   price: 997
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error: ', err);
//   }); //to save it to tour collection

// console.log(testTour);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
