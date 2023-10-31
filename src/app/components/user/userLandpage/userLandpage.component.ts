import * as taskList from "src/assets/json/taskSample.json";
import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';
import { TaskService } from "src/app/services/api/task.service";
import { ProjectService } from "src/app/services/api/project.service";

@Component({
  selector: 'app-user-landpage',
  templateUrl: './userLandpage.component.html',
  styleUrls: ['./userLandpage.component.scss'],

  providers: [SessionGuard]

})
export class UserLandpageComponent implements OnInit {

  taskList: any = [];
  projectList: any = [];

  constructor(private taskService: TaskService, private projectService: ProjectService) { }

  /**
   * Se obtienen los datos de un archivo JSON.
   */
  async ngOnInit() {

    this.taskService.getTaskList().subscribe(async (response: any) => {

      this.taskList = await response.tasks;

      this.projectService.getProjectList().subscribe(async (response: any) => {

        this.projectList = await response.projects;

        this.setProjectToTask();

      });
    });


  }

  setProjectToTask() {

    this.taskList.forEach((task: any) => {
      this.projectList.forEach((project: any) => {
        if (task.projectId == project.projectId) {
          task.projectName = project.name;
        }
      });
    });
  }
}

