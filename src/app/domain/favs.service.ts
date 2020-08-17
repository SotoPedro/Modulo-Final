import { Injectable } from '@angular/core';
const sqlite = require("nativescript-sqlite");

@Injectable()
export class FavoritosService {
    
    consulta: Array<string> = [];

    constructor() {
        this.getDb((db) => {
            console.dir(db);
            db.each("select texto from favs",
            (err, fila) => console.log("Fila: " + fila),
            (err, totales) => console.log("Filas totales: " + totales));
        }, () => console.log("Error on get DB"));        
     }

     getDb(fnOk, fnError) {
        return new sqlite("mi_db_favs", (err, db) => {
            if(err) {
                console.error("Error al abrir la DB", err);
            } else {
                console.log("Esta abierta la db: ", db.isOpen() ? "si" : "No");
                db.exeSQL("CREATE TABLE IF NOT EXIST favs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)")
                .then((id) => {
                    console.log("CREATE TABLE OK");
                    fnOk(db);
                }, error => {
                    console.log("CREATE TABLE ERROR",error);
                    fnError(error);
                });
            }
        });
    }

    buscar(s: string) {
        this.getDb((db) => {
            db.execSQL("insert into logs (texto) values (?)", [s],
            (err,id) => console.log("Nuevo id: ", id));
        }, () => console.log("error on getDB"));     
    }

    sendDB() {
        this.getDb((db) => {
            db.each("select text from favs", 
            (err,total) => {this.consulta.push(total)});
        }, () => console.log("Error"));
        return this.consulta;
    }
    
    
}