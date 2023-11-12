import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-modifier',
  templateUrl: './projectModifier.component.html',
  styleUrls: ['./projectModifier.component.scss']
})
export class ProjectModifierComponent {

  projectId: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

}
