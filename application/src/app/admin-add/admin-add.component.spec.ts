import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAddComponent } from './admin-add.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
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
      component.submitItem();
      expect(component.itemSubmitted).toBeTruthy();
    });

    it('Form invalid when empty', () => {
      expect(component.itemForm.valid).toBeFalsy();
    });

    it('Item name field validity', () => {
      let itemname = component.itemForm.controls['itemname'];
      expect(itemname.valid).toBeFalsy();

      itemname.setValue("");
      expect(itemname.hasError('required')).toBeTruthy();

      itemname.setValue("M");
      expect(itemname.hasError('minlength')).toBeTruthy();

      itemname.setValue("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
      expect(itemname.hasError('maxlength')).toBeTruthy();

      itemname.setValue("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      expect(itemname.hasError('pattern')).toBeTruthy();
    });

    it('Item description field validity', () => {
      let itemdescription = component.itemForm.controls['itemdescription'];
      expect(itemdescription.valid).toBeFalsy();

      itemdescription.setValue("");
      expect(itemdescription.hasError('required')).toBeTruthy();

      itemdescription.setValue("M");
      expect(itemdescription.hasError('minlength')).toBeTruthy();

      itemdescription.setValue("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
      expect(itemdescription.hasError('maxlength')).toBeTruthy();

      itemdescription.setValue("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      expect(itemdescription.hasError('pattern')).toBeTruthy();
    });
  });

  //Describe is the function name being tested
  describe('submitSpell', () => {
    it('Add Spell Button Works', async () => {
      component.submitSpell();
      expect(component.spellSubmitted).toBeTruthy();
    });

    it('Form invalid when empty', () => {
      expect(component.spellForm.valid).toBeFalsy();
    });

    it('Spell name field validity', () => {
      let spellname = component.spellForm.controls['spellname'];
      expect(spellname.valid).toBeFalsy();

      spellname.setValue("");
      expect(spellname.hasError('required')).toBeTruthy();

      spellname.setValue("M");
      expect(spellname.hasError('minlength')).toBeTruthy();

      spellname.setValue("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
      expect(spellname.hasError('maxlength')).toBeTruthy();

      spellname.setValue("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      expect(spellname.hasError('pattern')).toBeTruthy();
    });

    it('Spell description field validity', () => {
      let spelldescription = component.spellForm.controls['spelldescription'];
      expect(spelldescription.valid).toBeFalsy();

      spelldescription.setValue("");
      expect(spelldescription.hasError('required')).toBeTruthy();

      spelldescription.setValue("M");
      expect(spelldescription.hasError('minlength')).toBeTruthy();

      spelldescription.setValue("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
      expect(spelldescription.hasError('maxlength')).toBeTruthy();

      spelldescription.setValue("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      expect(spelldescription.hasError('pattern')).toBeTruthy();
    });
  });
});
