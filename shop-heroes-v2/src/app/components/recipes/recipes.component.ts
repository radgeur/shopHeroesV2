import { Component, OnInit } from '@angular/core';

import {DashboardComponent} from '../dashboard/dashboard.component';
import { Player } from '../../objects/player';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../objects/category';
import { MaterialService } from '../../services/material.service';
import { Material } from '../../objects/material';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  player : Player;
  categories: Category[];
  materials:Material[];

  constructor(private dashboard: DashboardComponent,
    private categoryService: CategoryService,
    private materialService: MaterialService) { 
      this.categories = [];
      this.materials = [];
    }

  ngOnInit() {
    this.player = this.dashboard.player;
    this.getCategories();
    this.getMaterials();
  }

  addRecipeCategory(form: NgForm) {
    this.categoryService.addCategory(form.value['name']).subscribe();
    form.reset();
  }

  addRecipe(form: NgForm) {
    console.log(form.value);
    form.reset();
  }

  getCategories() {
    this.categoryService.selectAll().subscribe(categories => this.categories = categories);
  }

  getMaterials(){
    this.materialService.selectAll().subscribe(materials => this.materials = materials);
  }

}
