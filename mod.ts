import { MongoClient } from "npm:mongodb@6.4.0";
import mysql from 'npm:mysql2@3.9.2'
import { TakoKV } from "@takoserver/takokv";
let client;
let dbKind: undefined | string;
// deno-lint-ignore no-explicit-any
export async function connect(databaseKind:  "mysql" | "mongoDB" | "denokv",username: string,password: string,addres: string,port: number,db: string): Promise<any> {
  if(dbKind == undefined) {
    dbKind = databaseKind
  } else {
    console.log("conected")
    return
  }
  switch (databaseKind) {
    case "mysql":
      client = await mysqlCnecting(username,password,addres,port,db)
      return "A"
    case "mongoDB":
      connectMongoDB().catch(console.error)
      return "a"
    case "denokv":
      //
      break
    default:
      console.log("databaseKind is not arrowed")
      return {status: "unfaild"}
      //break;
  }
}
export function insert() {
}
async function mysqlCnecting(username:string, passwor: string,addres: string,port: number,db: string) {
  /*
  const client = await new Client().connect({
    hostname: addres,
    username,
    db,
    poolSize: 3, // connection limit
    password: passwor,
  });*/
  client = await mysql.createConnection({
    host: addres,
    port: port,
    user: username,
    password: passwor,
    database: db
  })
  return client
}
async function connectMongoDB(){
  const uri = "mongodb+srv://<username>:<password>@<cluster-address>/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to the database!");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}