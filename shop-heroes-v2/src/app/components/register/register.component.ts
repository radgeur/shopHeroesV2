import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { PlayerService } from '../../services/player.service';
import { Player } from '../../objects/player'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(form: NgForm){
    var name = form.value['name'].trim();
    var password = form.value['password'];
    name && password && this.playerService.signUpPlayer(new Player(name, password))
    .subscribe(player => {
      if(player !== null){
        sessionStorage.setItem("player", JSON.stringify(player));
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
