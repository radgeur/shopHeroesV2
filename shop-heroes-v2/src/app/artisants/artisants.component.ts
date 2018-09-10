import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {Player} from '../player';
import {JobService} from '../job.service';
import {PlayerService} from '../player.service';

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

  ngOnInit(){
    this.player = this.dashboard.player;
  }

  addJob(form: NgForm) {
    this.jobService.addJob(form.value['name'])
      .subscribe();
  }
}
