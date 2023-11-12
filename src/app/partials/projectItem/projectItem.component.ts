import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectItem',
  templateUrl: './projectItem.component.html',
  styleUrls: ['./projectItem.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() projectItem: any;

  constructor(private router: Router) { }



  ngOnInit() {
  }

  openProject() {
    const projectId = this.projectItem.projectId;

    this.router.navigate(['/admin-project-modifier', projectId]);
  }

}
