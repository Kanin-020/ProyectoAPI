import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SessionGuard } from 'src/app/guards/session.guard';
import * as activityListJSON from "src/assets/json/activitySample.json";

@Component({
  selector: 'app-activityManager',
  templateUrl: './activityManager.component.html',
  styleUrls: ['./activityManager.component.scss'],
  providers: [SessionGuard]
})
export class ActivityManagerComponent implements OnInit {

  protected activityList: any[] = [];

  protected page: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0
  };

  constructor() { }

  /**
   * Se obtienen los datos de un archivo JSON.
   */
  ngOnInit() {

    this.activityList = (activityListJSON as any).default;
    this.page.length = this.activityList.length;
    console.log(this.activityList);

  }

}
