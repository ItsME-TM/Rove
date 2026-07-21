import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';
import { TextInput } from '../../../shared/text-input/text-input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register{
  // Modern input function (Angular 17+) to receive data from parent component (Home)
  // .required() means this input must be provided by the parent
  // This does the same thing as @Input() decorator but in a more concise way
  //membersFromHome = input.required<User[]>();
  private accountService = inject(AccountService);
  // Output event emitter to send data to parent component
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  protected credentialsForm: FormGroup;
  private fb = inject(FormBuilder);
  protected profileForm: FormGroup;
  protected currentStep = signal(1);

  constructor() {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]],
      confirmPassword: ['', [Validators.required, this.matchvalues('password')]],
    });

    this.profileForm = this.fb.group({
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    })
    this.credentialsForm.controls['password'].valueChanges.subscribe(() => {
      this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  matchvalues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMismatch: true };
    };
  }

  nextStep(){
    if(this.credentialsForm.valid){
      this.currentStep.update(prevStep => prevStep + 1);
    }
  }

  prevStep(){
    this.currentStep.update(prevStep => prevStep - 1);
  }
  register() {
    if(this.profileForm.valid && this.credentialsForm.valid){
      const formData = {...this.credentialsForm.value, ...this.profileForm.value};
      console.log('Form Data:', formData);
    }
    
    // this.accountService.register(this.creds).subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error: error => console.log(error)
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
