import { Component, inject, input, OnInit, output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit{
  // Modern input function (Angular 17+) to receive data from parent component (Home)
  // .required() means this input must be provided by the parent
  // This does the same thing as @Input() decorator but in a more concise way
  //membersFromHome = input.required<User[]>();
  private accountService = inject(AccountService);
  // Output event emitter to send data to parent component
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  protected registerForm: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      displayName: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    })
  }
  register(){
    console.log(this.registerForm.value);
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
