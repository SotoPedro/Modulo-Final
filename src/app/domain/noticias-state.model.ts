import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType }  from "@ngrx/effects";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable()

 //ESTADO
export class Noticia {  //clase noticia
    constructor(public titulo: string) {

    }
}
//tslint: disable-next-line: interface-name
export interface NoticiasState { //Objeto de Estado con
    //tslint: diable-next-line: array-type
    items: Noticia[]; // un array de items de tipo noticia
    sugerida: Noticia; // un array de sugeridas de tipo noticia
}

export function initializeNoticiaState() { //Le damos el estado inicial en la función
    return { //inicializamos los atributos
        items: [],
        sugerida: null
    }
}
//ACCIONES
export enum NoticiasActionTypes { //Buena paractica para Redux en el que enlistas los estados
    INIT_MY_DATA = "[Noticias] Init My Data",
    NUEVA_NOTICIA = "[Noticias] Nueva",
    SUGERIDA_NOTICIA = "[Noticias] sugerir" //El modulo que estamos trabajando y una pequela descripción
}

//tslint:disable-next-line: max-classes-per-file
export class InitMyDataAction implements Action { //Se implementan los estados u objetos, siedno estos la estrcutura
    type = NoticiasActionTypes.INIT_MY_DATA; //EL tipo de noticia
    constructor(public titulares: Array<string>) { //después lo convierte en un tipo de array

    }
}

export class NuevaNoticiaAction implements Action {
    type = NoticiasActionTypes.NUEVA_NOTICIA;
    constructor(public noticia: Noticia) {

    }
}

export class SugerirAction implements Action {
    type = NoticiasActionTypes.SUGERIDA_NOTICIA;
    constructor(public noticia: Noticia) {}
}

export type NoticiasViajesActions = NuevaNoticiaAction | InitMyDataAction; //estamos haciendo la unión de un tipo o más de datos, es un conjunto de tipos

//REDUCERS
export function reducersNoticias(
    state: NoticiasState, //se toma el estado inicial
    action: NoticiasViajesActions //dependiendo de la acciónq ue reciba
): NoticiasState { //devuelve un nuevo estado
    switch(action.type) { //por cada estado o tipo hay un case
        case NoticiasActionTypes.INIT_MY_DATA: {
            const titulares: Array<string> = (action as InitMyDataAction).titulares; //casting de datos

            return { //sintaxis de tranformación de javascript. Retornamos una nueva instancia que es 
                ...state, //la clonación del objeto state
                items: titulares.map((t) => new Noticia(t)) //y vamos a agregar el valor de la propiedad itemns
            };
        }
        case NoticiasActionTypes.NUEVA_NOTICIA: {
            return {
                ...state, //copiamos el estado
                items: [...state.items, (action as NuevaNoticiaAction).noticia] //sobrescribimos el estadoy además, añadimos otra noticia
            };
        }
        case NoticiasActionTypes.SUGERIDA_NOTICIA: {
            return {
                ...state, //dejamos el estate como estaba y solamente
                sugerida: (action as SugerirAction).noticia //sobreescribimos la variable sugerida
            };
        }
    }

    return state; //en caso de que el estado no cambie, se regresa el estado tal y como estaba
}

//EFFECTS
@Injectable()
export class NoticiasEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(NoticiasActionTypes.NUEVA_NOTICIA),
        map((action: NuevaNoticiaAction) => new SugerirAction(action.noticia))
    );

    constructor(private actions$: Actions) {}
}
