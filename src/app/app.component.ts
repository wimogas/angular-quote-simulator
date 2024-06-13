import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./auth/services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Quote Simulator';
  isAuth = false;
  private userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.checkAuth()
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.isAuth = !!user;
        console.log(this.isAuth)
      }
    )
  }

  login() {
    this.router.navigate(['/auth']);
  }

  logout() {
    this.isAuth = false;
    this.authService.logout()
  }

  ngOnDestroy() {
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
