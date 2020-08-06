import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { User } from "./User.model";

import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as Toast from "nativescript-toast";

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "detalle",
  templateUrl: "./detalle.component.html",  
})
export class DetalleComponent implements OnInit {
  item: any;
  
  opinions: Array<User> = [{
      op: "Excelente hotel",      
      name: "Javier Rodriguez",
      puntaje: 4
    },
    {
      op: "Buen servicio",
      name: "Miguel gonzales",
      puntaje: 5
    }
  ];

  fullname: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.fullname = params["name"];
  });
  }

  ngOnInit(): void {

  }
  onDrawerButtonTap(): void {
    const sidedrawer = <RadSideDrawer>app.getRootView();
    sidedrawer.showDrawer();
  }
  /*
  onPull(e): void {
    const pullRefresh = e.object;
    setTimeout(() => {
      this.opinions.push({
        op: "Aceptable",
        name: "Rodrigo",
        puntaje: 3
        });
      pullRefresh.refreshing = false;
    },2000);     
  }  */
  onItemTap(e): void {
    console.log(e.index)
    dialogs.action("Modificara la opinion","Cancelar",["Editar","No Editar"])
    .then(result => {
      if(result === "Editar") {
        this.opinions[e.index].puntaje = 6        
        let toast = Toast.makeText("Editado");
        toast.show();
      } else if(result === "No editar") {
        let toast = Toast.makeText("No editado");
        toast.show();
      }
    })     
  }
  onDelete(): void {
    dialogs.alert({
      title: "Aviso",
      message: "Se eliminará el elemento",
      okButtonText: "OK"
    }).then(() => {
      this.opinions.splice(0,1);
    })
  }
}