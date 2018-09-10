import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourcesComponent} from './resources/resources.component'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginRouteGuard } from './login-route-guard';
import { ArtisantsComponent } from './artisants/artisants.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginRouteGuard] ,
    children: [
      { path: 'resources', component: ResourcesComponent},
      {path: 'artisants', component: ArtisantsComponent}
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
