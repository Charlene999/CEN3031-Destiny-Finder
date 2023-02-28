import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminDeleteComponent } from './admin-delete/admin-delete.component';
import { appRoutingModule, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { CreateCharactersComponent } from './characters/create-characters/create-characters.component';
import { ClassesComponent } from './classes/classes.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup';
import { SpellsComponent } from './spells/spells.component';
import { UsersComponent } from './users/users.component';
import { ViewUsersComponent } from './view-users/view-users.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        SpellsComponent,
        ItemsComponent,
        CharactersComponent,
        ClassesComponent,
        UsersComponent,
        CreateCharactersComponent,
        ViewUsersComponent,
        AdminAddComponent,
        AdminDeleteComponent,
      ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        appRoutingModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: []
    }).compileComponents();
  });

  it('The / page (home page) renders', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  /* 
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('frontend app is running!');
  });
  */
});
