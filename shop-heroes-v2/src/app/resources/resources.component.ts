import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../player.service';
import { SharedService } from '../shared.service';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {Player} from '../player';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  constructor(private playerService: PlayerService,
    private sharedService: SharedService,
    private dashboard: DashboardComponent
  ) { }

  player: Player;

  ngOnInit() {
    this.player = this.dashboard.player;
  }

  updateStoneQuantity(quantity: number){
    this.playerService.updateStoneQuantity(JSON.parse(sessionStorage.getItem("player")), quantity)
      .subscribe(player => {
        sessionStorage.setItem("player", JSON.stringify(player));
        this.sharedService.changeQuantity();
      });
  }

  updateWoodQuantity(quantity: number){
    this.playerService.updateWoodQuantity(JSON.parse(sessionStorage.getItem("player")), quantity)
      .subscribe(player => {
        sessionStorage.setItem("player", JSON.stringify(player));
        this.sharedService.changeQuantity();
      });
  }

  updateLeatherQuantity(quantity: number){
    this.playerService.updateLeatherQuantity(JSON.parse(sessionStorage.getItem("player")), quantity)
      .subscribe(player => {
        sessionStorage.setItem("player", JSON.stringify(player));
        this.sharedService.changeQuantity();
      });
  }

  updateHerbQuantity(quantity: number){
    this.playerService.updateHerbQuantity(JSON.parse(sessionStorage.getItem("player")), quantity)
      .subscribe(player => {
        sessionStorage.setItem("player", JSON.stringify(player));
        this.sharedService.changeQuantity();
      });
  }

  updateQuantities(stone: number, wood: number, leather: number, herb: number) {
    this.playerService.updateQuantities(JSON.parse(sessionStorage.getItem("player")), stone*1, wood*1, leather*1, herb*1)
      .subscribe(player => {
        sessionStorage.setItem("player", JSON.stringify(player));
        this.sharedService.changeQuantity();
    });
  }

}
