import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharactersComponent } from './create-characters.component';

describe('CreateCharactersComponent', () => {
  let component: CreateCharactersComponent;
  let fixture: ComponentFixture<CreateCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCharactersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
