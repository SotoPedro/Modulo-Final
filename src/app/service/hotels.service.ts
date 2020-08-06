import { Injectable } from '@angular/core';

@Injectable()
export class HotelesService {
    hotels: Array<string> =  ['Hotel Ryu Costa', 'Hotel Ryu centro', 'Black Arizona Hotel'];
    archivated: Array<string>;

    constructor() { }

    getHotel(index: number) {        
        return this.hotels[index];
    }

    getHotels(){
        return this.hotels;
    }

    archiveHotel(s: string) {
        this.archivated.push(s);
        this.hotels = this.hotels.filter((x) => {
            if(x == s){
                return false;
            } else {
                return true;
            }
        });
    }

    deleteHotel(s: string) {
        this.hotels = this.hotels.filter((x) => {
            if(x == s){
                return false;
            } else {
                return true;
            }
        });
    }
    
}