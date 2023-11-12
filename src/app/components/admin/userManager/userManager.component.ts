import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';
import * as userListJSON from "src/assets/json/userSample.json";

@Component({
  selector: 'app-userManager',
  templateUrl: './userManager.component.html',
  styleUrls: ['./userManager.component.scss'],
  providers: [SessionGuard]
})
export class UserManagerComponent implements OnInit {

  userList: any[] = [];

  projectId: number = 0;

  /**
   * Controlador del paginador de la tabla.
   */
  page: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0
  };

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  /**
  * Se obtienen los datos de un archivo JSON.
  */
  ngOnInit() {

    this.userList = (userListJSON as any).default;
    this.page.length = this.userList.length;
    console.log(this.userList);

  }

}
