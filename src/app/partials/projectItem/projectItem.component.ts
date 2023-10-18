import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-projectItem',
  templateUrl: './projectItem.component.html',
  styleUrls: ['./projectItem.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() projectItem: any;

  constructor() { }



  ngOnInit() {
  }

}
