import * as taskList from "src/assets/json/taskSample.json";
import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-user-landpage',
  templateUrl: './userLandpage.component.html',
  styleUrls: ['./userLandpage.component.scss'],

  providers: [SessionGuard]

})
export class UserLandpageComponent implements OnInit {

  itemList = [];

  constructor() { }

  ngOnInit() {
    this.itemList = (taskList as any).default;
  }

}
