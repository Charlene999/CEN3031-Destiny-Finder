import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharactersSpellsComponent } from './characters-spells.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

describe('CharactersSpellsComponent', () => {
  let component: CharactersSpellsComponent;
  let fixture: ComponentFixture<CharactersSpellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        Ng2SearchPipeModule
      ],
      declarations: [ CharactersSpellsComponent ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersSpellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The /profile/spells page renders', () => {
    expect(component).toBeTruthy();
  });

  describe('add', () => { 
    it('ADD button works', () => {
      component.add(12);
      expect(component.addSubmitted).toBeTruthy();
    });
  });

  describe('remove', () => {
    it('REMOVE button works', () => {
      component.remove(12);
      expect(component.removeSubmitted).toBeTruthy();
    });
  });
});
