import { Component, inject, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Member } from '../../../types/member';
import { filter } from 'rxjs';
import { AgePipe } from '../../../core/pipes/age-pipe';

  // Signals are synchronous wrappers around values that automatically notify
  // consumers when their value changes. They're fine-grained and perfect for
  // local component state that updates immediately (like the title signal in your
  //  code). You read them with title() and update with .set().

  // Observables represent streams of values over time (like HTTP responses or
  // route params). They're asynchronous and require subscription to get values
  // (as you see with member$ using AsyncPipe). They excel at handling events that
  //  happen over time, like API calls or user actions.
@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit {
  private route = inject(ActivatedRoute);
  // we created a observable because we want get http response quickly
  // so by using observable without freezing the UI and waiting
  protected member = signal<Member | null>(null);
  private router = inject(Router);
  protected title = signal<string | undefined>('Profile');

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member.set(data['member'])
    })
    //component first loads, we set the title to the first child route's title (which is 'Profile' by default)
    this.title.set(this.route.firstChild?.snapshot?.title);
    // then we subscribe to router events, and whenever a navigation ends, we update the title to the current child route's title
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot?.title);
      },
    });
  }
}
