import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: "NewsForm",
  template: `
  <TextField [(ngModel)]="textFieldValue" hint="Enter text..."></TextField>
  <Button text="Button" (tap)="onButtonTap()"></Button>
  `
})
export class NewsFormComponent implements OnInit{
  textFieldValue: string = "";

  @Output() search: EventEmitter<string> = new EventEmitter(); 
  @Input() inicial: string;

  ngOnInit(): void{
      this.textFieldValue = this.inicial;
  }
  constructor() {
  }

  onButtonTap(): void {
    console.log(this.textFieldValue);
    if(this.textFieldValue.length > 2) {
        this.search.emit(this.textFieldValue);
    }
  }
}