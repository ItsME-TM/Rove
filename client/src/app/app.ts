import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from '../layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet], // Import child components to make them available in this component
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // private accountService = inject(AccountService);
  // private http = inject(HttpClient);
  protected router = inject(Router);
  // protected title = 'Rove';
  // protected members = signal<User[]>([]); // Signal to hold list of members from API

  // async ngOnInit() {
  //   this.members.set(await this.getMembers()); // Fetch members from API and store in signal
  //   //this.setCurrentUser();  // Load current user from localStorage
  // }

  // setCurrentUser(){
  //   const userString = localStorage.getItem('user');
  //   if(!userString) return;
  //   const user = JSON.parse(userString);
  //   this.accountService.currentUser.set(user);
  // }
  // async getMembers() {
  //   try {
  //     return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
}
