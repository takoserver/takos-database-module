import { createRequire } from 'https://deno.land/std@0.177.0/node/module.ts';
const require = createRequire(import.meta.url);
const mongoose = require('mongoose');
import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";

export const connect = async (databaseKind:  "mysql" | "mongoDB" | "denokv",username: string,password: string,addres: string,port: string,db: string) => {
  switch (databaseKind) {
    case "mysql":
      return await mysqlCnecting(username,password,addres,port,db)
      //break;
    case "mongoDB":
      return await mongooseConecting(username,password,addres,port,db)
      //break
    case "denokv":
      //
      break
    default:
      console.log("databaseKind is not arrowed")
      return {status: "unfaild"}
      //break;
  }
}
async function mysqlCnecting(username:string, passwor: string,addres: string,port: string,db: string) {
  const client = await new Client().connect({
    hostname: addres,
    username,
    db,
    poolSize: 3, // connection limit
    password: passwor,
  });
  return client
}
async function mongooseConecting(username:string, passwor: string,addres: string,port: string,db: string) {
  await mongoose.connect(`mongodb://${username}:${passwor}@${addres}:${port}/${db}`)
  .then(() => console.log('Connected!'));
}