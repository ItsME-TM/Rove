import { Component, inject, input, output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormsModule } from "@angular/forms";
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // Modern input function (Angular 17+) to receive data from parent component (Home)
  // .required() means this input must be provided by the parent
  // This does the same thing as @Input() decorator but in a more concise way
  //membersFromHome = input.required<User[]>();
  private accountService = inject(AccountService);
  // Output event emitter to send data to parent component
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;

  register(){
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
