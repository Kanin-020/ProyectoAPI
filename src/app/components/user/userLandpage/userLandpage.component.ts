import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-user-landpage',
  templateUrl: './userLandpage.component.html',
  styleUrls: ['./userLandpage.component.scss'],
  providers: [SessionGuard]
})
export class UserLandpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
