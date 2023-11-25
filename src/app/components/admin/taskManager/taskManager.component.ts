import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Route } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SessionGuard } from 'src/app/guards/session.guard';
import { Relation, Task } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/api/project.service';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';
import { TaskService } from 'src/app/services/api/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskManager',
  templateUrl: './taskManager.component.html',
  styleUrls: ['./taskManager.component.scss'],
  providers: [SessionGuard]
})
export class TaskManagerComponent implements OnInit {

  projectId: number = 0;
  relationsProjectsList: Relation[] = [];
  taskList: Task[] = [];
  activityList: any[] = [];
  projectTitle: string = "Proyecto ejemplo";

  page: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private relationsProjectsService: RelationsProjectsService,
    private taskService: TaskService,
    private projectService: ProjectService) {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  /**
   * Se obtienen los datos de un archivo JSON.
   */
  ngOnInit() {

    forkJoin([
      this.relationsProjectsService.getProjectRelationByProjectId(this.projectId),
      this.projectService.getProjectById(this.projectId)

    ]).subscribe(async([relationResponse, projectResponse]) =>{
      this.projectTitle = await(projectResponse as any).project.name;
      const relationsProjectsList: Relation[] = await (relationResponse as any).relations_projects;

      this.relationsProjectsList = relationsProjectsList;
      this.getTaskFromProject();

      this.activityList.forEach((taskId: number) =>{
        this.taskService.getTaskById(taskId).subscribe(async(taskResponse) =>{
          var tempTask: Task = await(taskResponse as any).task;
          this.taskList.push(tempTask);
        })
      })
    });
  }


  async getTaskFromProject(){
    this.relationsProjectsList.forEach((relationProject: Relation) =>{
      this.activityList.push(relationProject.taskId);
    });
  }

  openTask(taskId: number) {
    this.router.navigate(['/admin-task-modifier', taskId]);
  }

}
