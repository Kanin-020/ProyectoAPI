import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';
import { TaskService } from "src/app/services/api/task.service";
import { ProjectService } from "src/app/services/api/project.service";
import { Project, Task } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-landpage',
  templateUrl: './userLandpage.component.html',
  styleUrls: ['./userLandpage.component.scss'],

  providers: [SessionGuard]

})
export class UserLandpageComponent implements OnInit {

  taskList: Task[] = [];
  projectList: Project[] = [];

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
    this.taskList.forEach((task: Task) => {
      this.projectList.forEach((project: Project) => {
        if (task.projectId == project.projectId) {
          task.projectName = project.name;
        }
      });
    });
  }
}

