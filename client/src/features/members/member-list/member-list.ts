import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { Member } from '../../../types/member';
import { MemberCard } from "../../members/member-card/member-card";
import { PaginationResult } from '../../../types/pagination';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  private memberService = inject(MemberService);
  protected paginatedMembers$: Observable<PaginationResult<Member>>;

  constructor() {
    this.paginatedMembers$ = this.memberService.getMembers();
  }
}
