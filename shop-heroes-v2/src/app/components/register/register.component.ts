import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { PlayerService } from '../../services/player.service';
import { Player } from '../../objects/player'
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  playerForm: FormGroup;

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

  register(){
    var name = this.playerForm.value['name'].trim();
    var password = this.playerForm.value['password'];
    name && password && this.playerService.signUpPlayer(this.playerForm.value)
    .subscribe(player => {
      if(player !== null){
        sessionStorage.setItem("player", JSON.stringify(player));
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
