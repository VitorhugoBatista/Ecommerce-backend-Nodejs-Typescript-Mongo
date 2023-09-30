import { App } from './app';
import mongoose from 'mongoose';



const port = 3000;

async function mongodbconnection(){
  await mongoose.connect('mongodb://127.0.0.1:27017',)
  console.log("conectado ao banco de dados")
  const app = new App(port);
  app.listen();
}
mongodbconnection()