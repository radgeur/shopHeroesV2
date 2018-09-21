import {Worker} from './worker';
import {Job} from './job';
import { Material } from './material';

export class Player{

    constructor(name: string, password: string){
        this.name = name;
        this.password = password;
    }

    id: number;
    name:string;
    password:string;
    level:number;
    admin:boolean;
    golds:number;
    xp:number;
    materials:Material[];
    workers:Worker[];
    jobs:Job[];
}