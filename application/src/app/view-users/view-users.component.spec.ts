import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUsersComponent } from './view-users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
        ],
      declarations: [ ViewUsersComponent ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The /admin/view-users page renders', () => {
    expect(component).toBeTruthy();
  });

  //Describe is the function name being tested
  describe('viewChars', () => {
    it('View Characters Button Works', async () => {
      component.viewChars();
      expect(component.viewCharsSubmitted).toBeTruthy();
    });
  });

  //Describe is the function name being tested
  describe('deleteUser', () => {
    it('Delete User Button Works', async () => {
      const id = 1;
      const username = 'd';
      component.deleteUser(id, username);
      expect(component.deleteUserSubmitted).toBeTruthy();
    });
  });
});
