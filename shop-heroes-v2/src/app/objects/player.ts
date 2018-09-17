import {Worker} from './worker';
import {Job} from './job';

export class Player{

    constructor(name: string, password: string){
        this.name = name;
        this.password = password;
    }

    id: number;
    name:string;
    password:string;
    level:number;
    stonquantity:number;
    leatherquantity:number;
    woodquantity:number;
    herbquantity:number;
    admin:boolean;
    golds:number;
    xp:number;
    workers:Worker[];
    jobs:Job[];
}