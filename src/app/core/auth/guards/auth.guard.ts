import { CanActivateFn, Router } from '@angular/router';
import { SESSION } from '../../../share/constants/session.constant';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);

  const session = localStorage.getItem(SESSION.localStorage)
  if(session){
    console.log('hola')
    const token = JSON.parse(session).token
    if(token){
      return true
    }
    router.navigate(['/'])
    return true
  }
  return false;
};
