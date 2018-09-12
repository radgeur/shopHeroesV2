import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {Player} from '../../objects/player';
import {JobService} from '../../services/job.service';
import {WorkerService} from '../../services/worker.service';
import {Job} from '../../objects/job';
import {Worker} from '../../objects/worker';

@Component({
  selector: 'app-artisants',
  templateUrl: './artisants.component.html',
  styleUrls: ['./artisants.component.css']
})
export class ArtisantsComponent implements OnInit{

  constructor(private dashboard: DashboardComponent,
    private jobService: JobService,
    private workerService: WorkerService
  ) { }

  player: Player;
  jobs: Job[];
  workers: Worker[];

  ngOnInit(){
    this.player = this.dashboard.player;
    this.getAllJob();
    this.getAllWorker();
  }

  addJob(form: NgForm) {
    this.jobService.addJob(form.value['name'])
      .subscribe();
    form.reset();
    this.getAllJob();
  }

  getAllJob() {
    this.jobService.selectAll().subscribe(jobs => this.jobs = jobs);
  }

  addWorker(form: NgForm) {
    var worker = new Worker(form.value["name"], form.value["golds"], form.value["job"]);
    this.workerService.add(worker).subscribe();
    form.reset();
  }

  getAllWorker() {
    this.workerService.getAll().subscribe(workers => this.workers = workers);
  }

}
