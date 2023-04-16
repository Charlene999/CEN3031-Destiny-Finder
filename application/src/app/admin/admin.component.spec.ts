import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
        ],
      declarations: [ AdminComponent ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The /admin page renders', () => {
    expect(component).toBeTruthy();
  });

  //Describe is the function name being tested
  describe('viewUsers', () => {
    it('View Existing Users Button Works', async () => {
      component.viewUsers();
      expect(component.viewUsersSubmitted).toBeTruthy();
    });
  });

  //Describe is the function name being tested
  describe('addItemsAndSpells', () => {
    it('Create Spells or Items Button Works', async () => {
      component.addItemsAndSpells();
      expect(component.addItemsAndSpellsSubmitted).toBeTruthy();
    });
  });

  //Describe is the function name being tested
  describe('removeItemsAndSpells', () => {
    it('Remove Spells or Items Button Works', async () => {
      component.removeItemsAndSpells();
      expect(component.removeItemsAndSpellsSubmitted).toBeTruthy();
    });
  });
});
