import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Player} from '../player'
import {SharedService} from '../shared.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  player: Player;
  
  constructor(private sharedService: SharedService,
    private router: Router
  ) {
    sharedService.changeEmitted$.subscribe(
      _ => {this.player = JSON.parse(sessionStorage.getItem("player"));}
    );
  }

  ngOnInit() {
    this.player = JSON.parse(sessionStorage.getItem("player"));
  }

  signOut(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
