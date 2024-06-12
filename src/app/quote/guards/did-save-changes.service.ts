import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";


export interface DidSaveChanges {
  canDeactivate: () => MaybeAsync<GuardResult>;
}
@Injectable({
  providedIn: 'root'
})
export class DidSaveChangesGuard implements CanDeactivate<DidSaveChanges>{

  constructor() { }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return component.canDeactivate();
  }
}
