import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
        ],
      declarations: [ ItemsComponent ],
      providers: []
      })
      .compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('The /items page renders', () => {
    expect(component).toBeTruthy();
  });

  describe('add', () => { 
    it('ADD button works', () => {
      component.add(17);
      expect(component.addSubmitted).toBeTruthy();
    });
  });

  describe('remove', () => {
    it('REMOVE button works', () => {
      component.remove(17);
      expect(component.removeSubmitted).toBeTruthy();
    });
  });

  // Test showItems performs properly
  describe('show', () => {
    it('Items Successfully Shown', () => {

      component.showItems();
      expect(component.viewSubmitted).toBeTruthy();
    })
  })
});
