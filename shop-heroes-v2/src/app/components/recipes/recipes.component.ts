import { Component, OnInit } from '@angular/core';

import { Player } from '../../objects/player';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../objects/category';
import { MaterialService } from '../../services/material.service';
import { Material } from '../../objects/material';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../objects/recipe';

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
  recipes: Recipe[];
  categoryForm: FormGroup;
  recipeForm: FormGroup;

  constructor(private categoryService: CategoryService,
    private materialService: MaterialService,
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private recipeService: RecipeService) { 
      this.categories = null;
      this.materials = null;
    }

  ngOnInit() {
    this.playerSubscription = this.playerService.playerSubject.subscribe(player => this.player = player);
    this.playerService.emitPlayerSubject();
    this.getCategories();
    this.getMaterials();
    this.getAllRecipes();
    this.initForm();
  }

  initForm() {
    this.initCategoryForm();
    this.initRecipeForm();
  }

  initCategoryForm() { this.categoryForm = this.formBuilder.group(new Category('')); }
  initRecipeForm() { 
    this.recipeForm = this.formBuilder.group({
      name: '',
      golds: 0,
      xp: 0,
      minLevel: 1,
      materials: this.formBuilder.array([]),
      category: ''
    });
    /*new Recipe('', 0, 0, 1, null, new Category(''))
    this.recipeForm.controls['materials'].setValue(this.formBuilder.array([]));
    this.recipeForm.patchValue({'materials': this.formBuilder.array([])})*/
  }

  addRecipeCategory() {
    this.categoryService.addCategory(this.categoryForm.value['name']).subscribe(_ => this.getCategories());
    this.initCategoryForm();
  }

  addRecipe() {
    this.recipeService.addRecipe(this.recipeForm.value).subscribe();
    this.initRecipeForm();
    this.recipeForm.controls['category'].setValue(this.categories[0], {onlySelf: true});
  }

  getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories,
      this.recipeForm.controls['category'].setValue(categories[0], {onlySelf: true})
    });
  }

  getMaterials(){
    this.materialService.getAll().subscribe(materials => this.materials = materials);
  }

  getAllRecipes(){
    this.recipeService.getAll().subscribe(recipes => this.recipes = recipes);
  }

  getRecipesByCategory(category: Category){
    this.recipeService.getRecipesByCategory(category).subscribe(recipes => this.recipes = recipes);
  }

  createRecipe(){
    
  }

  getMaterialsFromForm(): FormArray {
    return this.recipeForm.get('materials') as FormArray;
  }

  onAddMaterial() {
    var item = this.formBuilder.group(new Material(0, 'unknown', 0));
    this.getMaterialsFromForm().push(item);
  }

  onDeleteMaterial(index: number){
    this.getMaterialsFromForm().removeAt(index);
  }

}
