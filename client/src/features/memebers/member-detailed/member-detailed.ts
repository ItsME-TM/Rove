import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../types/member';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-detailed',
  imports: [AsyncPipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed  implements OnInit {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  // we created a observable because we want get http response quickly
  // so by using observable without freezing the UI and waiting
  protected member$?: Observable<Member>;

  ngOnInit(): void {
    this.member$ = this.loadMember();
  }

  loadMember() {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    return this.memberService.getMember(id);
  }
}
