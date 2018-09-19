import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../../services/player.service';
import {Player} from '../../objects/player';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  player: Player;
  playerSubscription: Subscription;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerSubscription = this.playerService.playerSubject.subscribe(player => this.player = player);
    this.playerService.emitPlayerSubject();
  }

  updateStoneQuantity(quantity: number){
    this.playerService.updateStoneQuantity(this.player, quantity)
      .subscribe(player => {
        sessionStorage.setItem("player", JSON.stringify(player));
        this.playerService.emitPlayerSubject();
      });
  }

  updateWoodQuantity(quantity: number){
    this.playerService.updateWoodQuantity(this.player, quantity)
      .subscribe(player => {
        sessionStorage.setItem("player", JSON.stringify(player));
        this.playerService.emitPlayerSubject();
      });
  }

  updateLeatherQuantity(quantity: number){
    this.playerService.updateLeatherQuantity(this.player, quantity)
      .subscribe(player => {
        sessionStorage.setItem("player", JSON.stringify(player));
        this.playerService.emitPlayerSubject();
      });
  }

  updateHerbQuantity(quantity: number){
    this.playerService.updateHerbQuantity(this.player, quantity)
      .subscribe(player => {
        sessionStorage.setItem("player", JSON.stringify(player));
        this.playerService.emitPlayerSubject();
      });
  }

  updateQuantities(stone: number, wood: number, leather: number, herb: number) {
    this.playerService.updateQuantities(this.player, stone*1, wood*1, leather*1, herb*1)
      .subscribe(player => {
        sessionStorage.setItem("player", JSON.stringify(player));
        this.playerService.emitPlayerSubject();
    });
  }

}
