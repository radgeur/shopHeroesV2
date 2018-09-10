import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from './player.service';

@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private playerService: PlayerService,
    private router: Router
  ) {}

  canActivate() {
    var isLoggedIn = this.playerService.isLoggedIn();
    if(!isLoggedIn)
      this.router.navigate(['/login']);
    
    return isLoggedIn;
  }
}