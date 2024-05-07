import { HttpInterceptorFn } from "@angular/common/http";
import { SESSION } from "../../../share/constants/session.constant";
import { Session } from "../interfaces/user.interface";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localstorage = localStorage.getItem(SESSION.localStorage)
    let token = ''
    if(localstorage){
        const session: Session = JSON.parse(localStorage.getItem(SESSION.localStorage) || '') 
        token = session.token
        }
        const autReq = req.clone({
            setHeaders: {
            Authorization: `Bearer ${token}`
            }
    });

    return next(autReq);
}