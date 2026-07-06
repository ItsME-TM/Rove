import { Component, Input, signal } from '@angular/core';
import { Register } from "../account/register/register";
import { User } from '../../types/user';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Input decorator to receive data from parent component (App)
  // @Input() marks a property as available for property binding from parent
  // required: true means this input must be provided by the parent
  //@Input({required: true}) membersFromApp: User[] = [];
  protected registerMode = signal(true);

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
}
