import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
        ],
      declarations: [ LoginComponent ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The /users/login page renders', () => {
    expect(component).toBeTruthy();
  });

  //Describe is the function name being tested
  describe('onSubmit', () => {
    it('Submit Button Works', async () => {
      const testForm = <NgForm>{
        value: {
          username: "d2",
          password: "d2"
        }
      };
      component.onSubmit(testForm);
      expect(component.loginSubmitted).toBeTruthy();
    });
    it('User Input is Received', async () => {
      const testForm = <NgForm>{
        value: {
          username: "d2",
          password: "d2"
        }
      };
      component.onSubmit(testForm);
      expect(testForm.value.username).toMatch('d2');
      expect(testForm.value.password).toMatch('d2');
    });
  });
  
  //Test what happens when a user successfully logs in
  //Test what happens when a user does not successfully log in
  //Test that user is redirected to /users/get
  //Test that admin is redirected to /
});
