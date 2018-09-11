import {Job} from '../objects/job'

export class Worker {

    constructor(name: string, golds: number, job: Job){
        this.name = name;
        this.golds = golds;
        this.job = job;
    }

    id: number;
    name: String;
    golds: number;
    job: Job;

}