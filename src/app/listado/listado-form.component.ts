import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: "ListadoForm",
  template: `
  <FlexboxLayout flexDirection="row">
    <TextField #texto="ngModel" [(ngModel)]="textFieldValue" hint="Enter text..." required minlen="4"></TextField>
    <Label *ngIf="texto.hasError('required')" text="*"></Label>
    <Label *ngIf="texto.hasError('required') && texto.hasError('minlen')" text="4+"></Label>
  </FlexboxLayout>
  <Button text="Button" (tap)="onButtonTap()" *ngIf="texto.valid"></Button>
  `
})
export class ListadoFormComponent implements OnInit {
    textFieldValue: string;

    @Input() search: EventEmitter<string> = new EventEmitter();
    @Output() inicial: string;
    
    constructor() {

    }

    ngOnInit(): void {
        this.textFieldValue = this.inicial;
    }
    onButtonTap(): void {
        console.log(this.textFieldValue);
      if(this.textFieldValue.length > 2) {
          this.search.emit(this.textFieldValue);
      }
    }
}