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
import { Job } from '../../objects/job';
import { JobService } from '../../services/job.service';

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
  jobs:Job[];
  recipes: Recipe[];
  categoryForm: FormGroup;
  recipeForm: FormGroup;

  constructor(private categoryService: CategoryService,
    private materialService: MaterialService,
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private recipeService: RecipeService,
    private jobService: JobService) { 
      this.categories = null;
      this.materials = null;
    }

  ngOnInit() {
    this.playerSubscription = this.playerService.playerSubject.subscribe(player => this.player = player);
    this.playerService.emitPlayerSubject();
    this.initForm();
    this.getCategories();
    this.getMaterials();
    this.getAllRecipes();
    this.getJobs();
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
      category: '',
      job: ''
    });
  }

  addRecipeCategory() {
    this.categoryService.addCategory(this.categoryForm.value['name']).subscribe(_ => this.getCategories());
    this.initCategoryForm();
  }

  addRecipe() {
    this.recipeService.addRecipe(this.recipeForm.value).subscribe(_ => this.getAllRecipes());
    this.initRecipeForm();
    this.recipeForm.controls['category'].setValue(this.categories[0], {onlySelf: true});
    this.recipeForm.controls['job'].setValue(this.jobs[0], {onlySelf: true});
  }

  getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories,
      this.recipeForm.controls['category'].setValue(categories[0], {onlySelf: true});
    });
  }

  getMaterials() { 
      this.materialService.getAll().subscribe(materials => {
      this.materials = materials;
      materials.forEach(function(material) {
        this.recipeForm.get('materials').push(this.formBuilder.group(new Material(material.id, material.name, 0)));
      }, this);
    }); 
  }
  getAllRecipes(){ this.recipeService.getAll().subscribe(recipes => this.recipes = recipes); }
  getJobs(){ this.jobService.selectAll().subscribe(jobs => {
      this.jobs = jobs;
      this.recipeForm.controls['job'].setValue(jobs[0], {onlySelf: true});
    }
  );}

  getRecipesByCategory(category: Category){
    this.recipeService.getRecipesByCategory(category).subscribe(recipes => this.recipes = recipes);
  }

  createRecipe(recipe: Recipe){
    this.player.golds += recipe.golds;
    this.player.xp += recipe.xp;
    this.player.materials.forEach(function(material){
      recipe.materials.forEach(function(recipeMaterial){
        if(material.id === recipeMaterial.id) {
          material.quantity -= recipeMaterial.quantity;
        }
      })
    });
    this.playerService.updatePlayer(this.player).subscribe(player => {
      sessionStorage.setItem("player", JSON.stringify(player));
      this.playerService.emitPlayerSubject();
    })
  }

  canCreate(recipe: Recipe): boolean{
    //check if enough materials
    var enoughMaterials = true;
    this.player.materials.forEach(function(material){
      recipe.materials.forEach(function(recipeMaterial){
        if(material.id === recipeMaterial.id) {
          if (material.quantity < recipeMaterial.quantity){
            enoughMaterials = false;
          }
        }
      })
    });

    //check if own the right job
    var rightJob = false;
    this.player.jobs.forEach(function(job){
      if(recipe.job.id === job.id)
        rightJob = true;
    });
    return rightJob && enoughMaterials;
  }

  canSeeRecipe(recipe: Recipe) {
    if(this.player.admin)
      return true;
    return recipe.minLevel <= this.player.level;
  }

  deleteRecipe(recipe: Recipe){
    this.recipeService.deleteRecipe(recipe).subscribe( _ => this.getAllRecipes());
  }

  fillRecipeForm(recipe: Recipe) {
    this.recipeForm = this.formBuilder.group(recipe);
    var categoryIndex = this.categories.map(function(category) { return category.id }).indexOf(recipe.category.id);
    this.recipeForm.patchValue({category: this.categories[categoryIndex]});
    var jobIndex = this.jobs.map(function(job) { return job.id }).indexOf(recipe.job.id);
    this.recipeForm.patchValue({job: this.jobs[jobIndex]});
    this.fillMaterialsRecipeForm(recipe.materials);
  }

  fillMaterialsRecipeForm(materials: Material[]) {
    var materialsForm = this.materials.slice();
    this.materials.forEach(function(material){
      materials.forEach(function(materialRecipe){
        if(materialRecipe.id == material.id)
          material.quantity = materialRecipe.quantity;
      });
    });
    this.recipeForm.patchValue({materials: materialsForm});
    console.log(this.recipeForm.value);
  }

}
