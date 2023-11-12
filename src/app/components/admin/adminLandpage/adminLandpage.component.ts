import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';
import { Project } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/api/project.service';
import * as projectListJSON from 'src/assets/json/projectSample.json';

@Component({
  selector: 'app-landpage',
  templateUrl: './adminLandpage.component.html',
  styleUrls: ['./adminLandpage.component.scss'],
  providers: [SessionGuard]
})
export class AdminLandpageComponent implements OnInit {

  projectList: Project[] = [];

  constructor(private projectService: ProjectService) { }

  /**
  * Se obtienen los datos de un archivo JSON.
  */
  ngOnInit() {

    this.projectService.getProjectList().subscribe(async response => {

      const projectList: Project[] = await (response as any).projects;

      this.projectList = projectList;

    });

  }

}
