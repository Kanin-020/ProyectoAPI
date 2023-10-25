import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SessionGuard } from 'src/app/guards/session.guard';
import * as commentListJSON from "src/assets/json/commentSample.json";


@Component({
  selector: 'app-taskDetails',
  templateUrl: './taskDetails.component.html',
  styleUrls: ['./taskDetails.component.scss'],
  providers: [SessionGuard]
})
export class TaskDetailsComponent {
  protected commentList: any[] = [];

  protected page: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0
  };

  constructor() { }


  ngOnInit() {
    this.commentList = (commentListJSON as any).default;
    this.page.length = this.commentList.length;

    console.log(this.commentList.length);
  }
}
