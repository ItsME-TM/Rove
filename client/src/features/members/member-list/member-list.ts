import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { Member } from '../../../types/member';
import { MemberCard } from "../../members/member-card/member-card";
import { PaginationResult } from '../../../types/pagination';
import { Paginator } from '../../../shared/paginator/paginator';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard, Paginator],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit{
  private memberService = inject(MemberService);
  protected paginatedMembers = signal<PaginationResult<Member> | null>(null);
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: result => {
        this.paginatedMembers.set(result);
      }
    })
  }

  onPageChange(event: { pageNumber: number; pageSize: number }) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageNumber;
    this.loadMembers();
  }
}
