import { Component, OnInit } from '@angular/core';

import {DashboardComponent} from '../dashboard/dashboard.component';
import { Player } from '../../objects/player';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  player : Player;

  constructor(private dashboard: DashboardComponent) { }

  ngOnInit() {
    this.player = this.dashboard.player;
  }

  addRecipeCategory(form: NgForm) {
    
  }

}
