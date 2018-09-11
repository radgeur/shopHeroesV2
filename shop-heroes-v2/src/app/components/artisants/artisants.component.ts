import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {Player} from '../../objects/player';
import {JobService} from '../../services/job.service';
import {PlayerService} from '../../services/player.service'
import {Job} from '../../objects/job';

@Component({
  selector: 'app-artisants',
  templateUrl: './artisants.component.html',
  styleUrls: ['./artisants.component.css']
})
export class ArtisantsComponent implements OnInit{

  constructor(private dashboard: DashboardComponent,
    private jobService: JobService,
    private playerService: PlayerService
  ) { }

  player: Player;
  jobs: Job[];

  ngOnInit(){
    this.player = this.dashboard.player;
    this.getAllJob();
  }

  addJob(form: NgForm) {
    this.jobService.addJob(form.value['name'])
      .subscribe();
  }

  getAllJob() {
    this.jobService.selectAll().subscribe(jobs => this.jobs = jobs);
  }

  addWorker(form: NgForm) {
  }

}
