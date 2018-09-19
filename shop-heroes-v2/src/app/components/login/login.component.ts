import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm, FormBuilder, FormGroup} from '@angular/forms';

import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  playerForm: FormGroup;

  constructor(private playerService: PlayerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.playerForm = this.formBuilder.group({
      name: '',
      password: ''
    });
  }

  signUp(){
    this.playerService.getPlayer(this.playerForm.value['name'], this.playerForm.value['password'])
      .subscribe(player => {
        if(player !== null){
          sessionStorage.setItem("player", JSON.stringify(player));
          this.playerService.emitPlayerSubject();
          this.router.navigate(['/dashboard']);
        }
      });
  }

}
