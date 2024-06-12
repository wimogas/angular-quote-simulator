import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {AuthService} from "./auth/services/auth.service";
import {AuthMockService} from "../mocks/auth-mock.service";

fdescribe('AppComponent', () => {
  let fixture;
  let app: AppComponent;
  let authService: AuthService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        RouterOutlet,
        AppRoutingModule,
        SharedModule
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthMockService
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have a title', () => {
    expect(app.title).toBe("Quote Simulator");
  });

  it('should initialize user as null', () => {
    authService.user.subscribe(user =>{
      expect(user).toBeNull();
    })
  });

  it('should get user after OnInit', () => {
    app.ngOnInit()
    authService.user.subscribe(user => {
      expect(user?.email).toBe("email@email.com")
    })
  });
});
