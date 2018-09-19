import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Player} from '../../objects/player'
import { Subscription } from 'rxjs';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  player: Player;
  playerSubscription: Subscription;
  
  constructor(private playerService: PlayerService,
    private router: Router) { }

  ngOnInit() {
    this.playerSubscription = this.playerService.playerSubject.subscribe(player => this.player = player);
    this.playerService.emitPlayerSubject();
  }

  signOut(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
