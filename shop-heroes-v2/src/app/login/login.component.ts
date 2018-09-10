import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

import { PlayerService } from '../player.service';
import { Player } from '../player'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signUp(form: NgForm){
    this.playerService.getPlayer(form.value['name'], form.value['password'])
      .subscribe(player => {
        if(player !== null){
          sessionStorage.setItem("player", JSON.stringify(player));
          this.router.navigate(['/dashboard']);
        }
      });
  }

}
