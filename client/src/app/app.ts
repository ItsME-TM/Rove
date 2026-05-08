import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],  // Import child components to make them available in this component
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected title = 'Rove';
  protected members = signal<User[]>([]);  // Signal to hold list of members from API

  async ngOnInit(){
    this.members.set(await this.getMembers());  // Fetch members from API and store in signal
    this.setCurrentUser();  // Load current user from localStorage
  }
  
  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
  async getMembers() {
    try{
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    }catch(error){
      console.log(error);
      throw error;    
    }
  }

}
