import { Injectable } from '@angular/core';
import { getJSON, request } from "tns-core-modules/http";
const sqlite = require("nativescript-sqlite");

@Injectable()
export class NovedadesService  {

    api: string = "https://4bb66eb865ff.ngrok.io";
   constructor() {
      this.getDb((db) => {
            console.dir(db);
            db.each("select * from logs",
            (err, fila) => console.log("Fila:" + fila),
            (err, totales) => console.log("Filas totales: " + totales));
        }, () => console.log("Error on get DB"));        
    }

    getDb(fnOk, fnError) {
        return new sqlite("mi_db_logs", (err, db) => {
            if(err) {
                console.error("Error al abrir la DB", err);
            } else {
                console.log("Esta abierta la db: ", db.isOpen() ? "si" : "No");
                db.exeSQL("CREATE TABLE IF NOT EXIST logs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)")
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

    agregar(s: string) {
        return request({
            url: this.api + "/Favs",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                nuevo: s
            })
        });
    }
    favs() {
        return getJSON(this.api + "/Favs");
    }    
    buscar(s: string) {
        this.getDb((db) => {
            db.execSQL("insert into logs (texto) values (?)", [s],
            (err,id) => console.log("Nuevo id: ", id));
        }, () => console.log("error on getDB"));

        return getJSON(this.api + "/get?q=" + s);
    }
}