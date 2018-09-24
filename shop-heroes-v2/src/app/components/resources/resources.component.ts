import { Component, OnInit } from '@angular/core';

import { PlayerService } from '../../services/player.service';
import {Player} from '../../objects/player';
import { Subscription } from 'rxjs';
import { Material } from '../../objects/material';

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

  updateMaterialQuantity(material: Material, quantity: number){
    this.player.materials.map(function(m){
      if(m.id === material.id)
        m.quantity += quantity*1;
      return m;
    })
    this.playerService.updateMaterialsQuantity(this.player).subscribe(player => {
      sessionStorage.setItem("player", JSON.stringify(player));
      this.playerService.emitPlayerSubject();
    })
  }

}
