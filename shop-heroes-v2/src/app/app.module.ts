import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ResourcesComponent } from './components/resources/resources.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArtisantsComponent } from './components/artisants/artisants.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { LoginRouteGuard } from './login-route-guard';

@NgModule({
  declarations: [
    AppComponent,
    ResourcesComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ArtisantsComponent,
    RecipesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
