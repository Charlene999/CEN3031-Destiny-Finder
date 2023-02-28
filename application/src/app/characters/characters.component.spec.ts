import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharactersComponent } from './characters.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
        ],
      declarations: [ CharactersComponent ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The /users/characters page renders', () => {
    expect(component).toBeTruthy();
  });

});
