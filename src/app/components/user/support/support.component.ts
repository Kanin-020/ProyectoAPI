import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  providers: [SessionGuard]
})
export class SupportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
