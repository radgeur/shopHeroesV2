import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourcesComponent} from './components/resources/resources.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginRouteGuard } from './login-route-guard';
import { ArtisantsComponent } from './components/artisants/artisants.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginRouteGuard] ,
    children: [
      { path: 'resources', component: ResourcesComponent},
      {path: 'artisants', component: ArtisantsComponent},
      {path: 'recipes', component: RecipesComponent}
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
