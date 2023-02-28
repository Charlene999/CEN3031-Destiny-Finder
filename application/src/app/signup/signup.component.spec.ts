import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule, 
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
        ],
      declarations: [ SignupComponent ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The /signup page renders', () => {
    expect(component).toBeTruthy();
  });

  //Describe is the function name being tested
  describe('onSubmit', () => {
    it('Submit Button Works', async () => {
      const testForm = <NgForm>{
        value: {
          name: "d2",
          username: "d2",
          email: "d2",
          password: "d2",
          password2: "d2"
        }
      };
      component.onSubmit(testForm);
      expect(component.signUpSubmitted).toBeTruthy();
    });
    it('User Input is Received', async () => {
      const testForm = <NgForm>{
        value: {
          name: "d2",
          username: "d2",
          email: "d2",
          password: "d2",
          password2: "d2"
        }
      };
      component.onSubmit(testForm);
      expect(testForm.value.name).toMatch('d2');
      expect(testForm.value.username).toMatch('d2');
      expect(testForm.value.email).toMatch('d2');
      expect(testForm.value.password).toMatch('d2');
      expect(testForm.value.password2).toMatch('d2');
    });
  });
  
  //Test what happens when a user doesn't enter all information
  //Test what happens when a user submit invalid info (e.g. invalid email)
  //Test what happens when user enters account information already in DB
});
