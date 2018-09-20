import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import {Player} from '../../objects/player';
import {JobService} from '../../services/job.service';
import {WorkerService} from '../../services/worker.service';
import {PlayerService} from '../../services/player.service';
import {Job} from '../../objects/job';
import {Worker} from '../../objects/worker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artisants',
  templateUrl: './artisants.component.html',
  styleUrls: ['./artisants.component.css']
})
export class ArtisantsComponent implements OnInit{

  player: Player;
  playerSubscription: Subscription;
  jobs: Job[];
  workers: Worker[];
  ownedWorkers:Worker[];
  notOwnedWorkers: Worker[];
  jobForm: FormGroup;
  workerForm: FormGroup;

  constructor(private jobService: JobService,
    private workerService: WorkerService,
    private playerService: PlayerService,
    private formBuilder: FormBuilder
  ) {
    this.ownedWorkers = null;
    this.notOwnedWorkers = null;
    this.workers = null;
    this.jobs = null;
   }

  ngOnInit(){
    this.playerSubscription = this.playerService.playerSubject.subscribe(player => this.player = player);
    this.playerService.emitPlayerSubject();
    this.getAllJob();
    this.getAllWorker();
    this.initForm();
  }

  initForm() {
    this.initJobForm();
    this.initWorkerForm();
  }

  initJobForm() { this.jobForm = this.formBuilder.group(new Job('')); }
  initWorkerForm() { this.workerForm = this.formBuilder.group(new Worker('', 0, new Job(''))); }

  addJob() {
    this.jobService.addJob(this.jobForm.value).subscribe(_ => this.getAllJob());
    this.initJobForm();
  }

  getAllJob() {
    this.jobService.selectAll().subscribe(jobs => {
      this.jobs = jobs;
      this.workerForm.controls['job'].setValue(jobs[0], {onlySelf: true})
    });
  }

  addWorker() {
    this.workerService.add(this.workerForm.value).subscribe(_ => this.getAllWorker());
    this.initWorkerForm();
    this.workerForm.controls['job'].setValue(this.jobs[0], {onlySelf: true})
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
          this.playerService.emitPlayerSubject();
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
