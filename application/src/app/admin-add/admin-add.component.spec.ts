import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAddComponent } from './admin-add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AdminAddComponent', () => {
  let component: AdminAddComponent;
  let fixture: ComponentFixture<AdminAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
        ],
      declarations: [ AdminAddComponent ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The /admin/add-spells-and-items page renders', () => {
    expect(component).toBeTruthy();
  });

  //Describe is the function name being tested
  describe('submitItem', () => {
    it('Add Item Button Works', async () => {
      const testForm = <NgForm>{
        value: {
          AdminToken: "d2",
          Name: "d2",
          Description: "d2",
          LevelReq: 1,
          ClassReq: 1
        }
      };
      component.submitItem(testForm);
      expect(component.submitItemSubmitted).toBeTruthy();
    });
    it('User Input is Received', async () => {
      const testForm = <NgForm>{
        value: {
          AdminToken: "d2",
          Name: "d2",
          Description: "d2",
          LevelReq: 1,
          ClassReq: 1
        }
      };
      component.submitItem(testForm);
      expect(testForm.value.AdminToken).toMatch('d2');
      expect(testForm.value.Name).toMatch('d2');
      expect(testForm.value.Description).toMatch('d2');
      expect(testForm.value.LevelReq).toEqual(1);
      expect(testForm.value.ClassReq).toEqual(1);
    });
  });

  //Describe is the function name being tested
  describe('submitSpell', () => {
    it('Add Spell Button Works', async () => {
      const testForm = <NgForm>{
        value: {
          AdminToken: 'd2',
          Name: 'd2',
          Description: 'd2',
          LevelReq: 1,
          ClassReq: 1
        }
      };
      component.submitSpell(testForm);
      expect(component.submitSpellSubmitted).toBeTruthy();
    });
    it('User Input is Received', async () => {
      const testForm = <NgForm>{
        value: {
          AdminToken: 'd2',
          Name: 'd2',
          Description: 'd2',
          LevelReq: 1,
          ClassReq: 1
        }
      };
      component.submitItem(testForm);
      expect(testForm.value.AdminToken).toMatch('d2');
      expect(testForm.value.Name).toMatch('d2');
      expect(testForm.value.Description).toMatch('d2');
      expect(testForm.value.LevelReq).toEqual(1);
      expect(testForm.value.ClassReq).toEqual(1);
    });
  });
});
