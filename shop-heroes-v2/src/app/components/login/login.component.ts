import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm, FormBuilder, FormGroup} from '@angular/forms';

import { PlayerService } from '../../services/player.service';
import { Player } from '../../objects/player';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  playerForm: FormGroup;
  player: Player;

  constructor(private playerService: PlayerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.playerForm = this.formBuilder.group(new Player('', ''));
  }

  signUp(){
    this.playerService.getPlayer(this.playerForm.value)
      .subscribe(player => {
        if(player !== null){
          sessionStorage.setItem("player", JSON.stringify(player));
          this.playerService.emitPlayerSubject();
          this.router.navigate(['/dashboard']);
        }
      });
  }

}
