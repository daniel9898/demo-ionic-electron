import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite'; // AGREGAR ESTO SIEMPRE 

@Injectable()
export class DataBaseTestProvider {
 
 private db : SQLiteObject;
 private isOpen : boolean;

  constructor(public http: Http , public storage: SQLite) {

    if(!this.isOpen){
        this.storage = new SQLite();
        this.storage.create({ name : "dbTest", location : "default"}).then((db : SQLiteObject) =>{
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXIST Users (id INTEGER PRIMARY KEY AUTOINCREMENT, legajo INTEGER, name TEXT )",[]);
        this.isOpen = true;
        }).catch((error)=>{
          console.log("ERROR : ",error);
        })
    }
  }

  createUser(legajo:Number , name:String){

    return new Promise((resolve , reject) =>{
      let query = "INSERT INTO Users (legajo, name) VALUES (?,?)";
      this.db.executeSql(query, [legajo,name]).then((data)=>{
        resolve(data);
      }).catch((error)=>{
        reject(error);
      })
    }) 

  }

  getAllUser(){

    return new Promise((resolve , reject) =>{
      let query = "SELECT * FROM Users";
      this.db.executeSql(query, []).then((data)=>{
        let arrayUsers = [];
        
        if(data.rows.length > 0){
           for(let index = 0; index < data.rows.length; index++) {
            arrayUsers.push({
              id : data.rows.item(index).id,
              legajo : data.rows.item(index).legajo,
              name : data.rows.item(index).name
            })
             
           }
        }

        resolve(arrayUsers);
      }).catch((error)=>{
        reject(error);
      })
    })

  }




}
