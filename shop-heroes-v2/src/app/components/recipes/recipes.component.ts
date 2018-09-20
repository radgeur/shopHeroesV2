import { Component, OnInit } from '@angular/core';

import { Player } from '../../objects/player';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../objects/category';
import { MaterialService } from '../../services/material.service';
import { Material } from '../../objects/material';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  player : Player;
  playerSubscription: Subscription;
  categories: Category[];
  materials:Material[];
  categoryForm: FormGroup;
  recipeForm: FormGroup;

  constructor(private categoryService: CategoryService,
    private materialService: MaterialService,
    private formBuilder: FormBuilder,
    private playerService: PlayerService) { 
      this.categories = null;
      this.materials = null;
    }

  ngOnInit() {
    this.initForm();
    this.playerSubscription = this.playerService.playerSubject.subscribe(player => this.player = player);
    this.playerService.emitPlayerSubject();
    this.getCategories();
    this.getMaterials();
  }

  initForm() {
    this.categoryForm = this.formBuilder.group({
      name: ''
    });
    this.recipeForm = this.formBuilder.group({
      name: '',
      golds: 0,
      xp: 0,
      minLevel: 1,
      materials: this.formBuilder.array([]),
      category: ''
    });
  }

  addRecipeCategory() {
    this.categoryService.addCategory(this.categoryForm.value['name']).subscribe(_ => this.getCategories());
    this.categoryForm.reset();
  }

  addRecipe() {
    console.log(this.recipeForm.value);
    this.categoryForm.reset();
  }

  getCategories() {
    this.categoryService.selectAll().subscribe(categories => {
      this.categories = categories,
      this.recipeForm.controls['category'].setValue(categories[0], {onlySelf: true})
    });
  }

  getMaterials(){
    this.materialService.selectAll().subscribe(materials => this.materials = materials);
  }

  getMaterialsFromForm(): FormArray {
    return this.recipeForm.get('materials') as FormArray;
  }

  onAddMaterial() {
    var item = this.formBuilder.group(new Material(0, 'unknown', 0));
    this.getMaterialsFromForm().push(item);
  }

}
