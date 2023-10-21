import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';
import * as projectListJSON from 'src/assets/json/projectSample.json';

@Component({
  selector: 'app-landpage',
  templateUrl: './adminLandpage.component.html',
  styleUrls: ['./adminLandpage.component.scss'],
  providers: [SessionGuard]
})
export class AdminLandpageComponent implements OnInit {

  protected projectList: any[] = [];

  constructor() { }

  ngOnInit() {
    this.projectList = (projectListJSON as any).default;
  }

}
