import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
        ],
      declarations: [ UsersComponent ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The /users/get page renders', () => {
    expect(component).toBeTruthy();
  });

  //Describe is the function name being tested
  describe('createCharacter', () => {
    it('Create A New Character Button Works', async () => {
    component.createCharacter();
    expect(component.newCharactersSubmitted).toBeTruthy();
    });
  });

  //Describe is the function name being tested
  describe('getCharacters', () => {
    it('View All Characters Button Works', async () => {
    component.getCharacters();
    expect(component.viewCharactersSubmitted).toBeTruthy();
    });
  });

  //Add test to verify when Create A New Character button is clicked, user is redirected to /users/create-character page
  //Add test to verify when View All Characters button is clicked, user is redirected to /users/characters
});
