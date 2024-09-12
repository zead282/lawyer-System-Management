import { connect } from "mongoose";


 const dbconnect = async () => {
    await connect(process.env.URL_CONNECTION)
  .then(() => {
    console.log('Successfully connected to the MongoDB database');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
}


export default dbconnect;