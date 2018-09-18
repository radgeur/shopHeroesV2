import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {Player} from '../../objects/player';
import {JobService} from '../../services/job.service';
import {WorkerService} from '../../services/worker.service';
import {PlayerService} from '../../services/player.service';
import {SharedService} from '../../services/shared.service';
import {Job} from '../../objects/job';
import {Worker} from '../../objects/worker';

@Component({
  selector: 'app-artisants',
  templateUrl: './artisants.component.html',
  styleUrls: ['./artisants.component.css']
})
export class ArtisantsComponent implements OnInit{

  player: Player;
  jobs: Job[];
  workers: Worker[];
  ownedWorkers:Worker[];
  notOwnedWorkers: Worker[];
  jobForm: FormGroup;
  workerForm: FormGroup;

  constructor(private dashboard: DashboardComponent,
    private jobService: JobService,
    private workerService: WorkerService,
    private playerService: PlayerService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {
    this.ownedWorkers = null;
    this.notOwnedWorkers = null;
    this.workers = null;
    this.jobs = null;
   }

  ngOnInit(){
    this.player = this.dashboard.player;
    this.getAllJob();
    this.getAllWorker();
    this.initForm();
  }

  initForm() {
    this.jobForm = this.formBuilder.group({
      name: ''
    });
    this.workerForm = this.formBuilder.group({
      name: '',
      golds: 0,
      job: ''
    });
  }

  addJob() {
    this.jobService.addJob(this.jobForm.value['name']).subscribe(_ => this.getAllJob());
    this.jobForm.reset();
  }

  getAllJob() {
    this.jobService.selectAll().subscribe(jobs => {
      this.jobs = jobs;
      this.workerForm.controls['job'].setValue(jobs[0], {onlySelf: true})
    });
  }

  addWorker() {
    var worker = new Worker(this.workerForm.value["name"], this.workerForm.value["golds"], this.workerForm.value["job"]);
    this.workerService.add(worker).subscribe(_ => this.getAllWorker());
    this.workerForm.reset();
  }

  getAllWorker() {
    this.workerService.getAll().subscribe(workers => this.sortWorkers(workers));
  }

  buyWorker(worker: Worker) {
    this.playerService.addWorkerToCurrentPlayer(this.player.id, worker).subscribe(
      _ => {
        this.playerService.getPlayerById(this.player.id).subscribe(player => {
          this.player = player;
          sessionStorage.setItem("player", JSON.stringify(player));
          this.sortWorkers(this.workers);
          this.sharedService.updatePlayerData()
        });
      }
    );
  }

  enoughGold(worker: Worker): boolean {
    return this.player.golds >= worker.golds;
  }

  //sort owned and unOwned workers
  sortWorkers(workers: Worker[]) {
    this.ownedWorkers = [];
    this.notOwnedWorkers = [];
    this.workers = [];
    var self = this;
    workers.forEach(worker => {
      var bought = false;
      self.player.workers.forEach(playerWorker => {
        if(worker.id === playerWorker.id) {
          bought = true;
          self.ownedWorkers.push(worker);
        }
      });
      if(!bought)
        self.notOwnedWorkers.push(worker);
      self.workers.push(worker);
    })
  }

}
