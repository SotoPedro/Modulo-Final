import { Injectable } from '@angular/core';

@Injectable()
export class NovedadesService  {

    listNews: string []= ['Consultas de la salud','Lluvias intensas','fuertes tormentas','Lluvia a torrentes'];
   

    getNovedades(){
        return this.listNews;
    }
}