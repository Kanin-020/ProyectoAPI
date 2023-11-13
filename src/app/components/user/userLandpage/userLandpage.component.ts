import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';
import { TaskService } from 'src/app/services/api/task.service';
import { ProjectService } from 'src/app/services/api/project.service';
import { Project, Relation, Task } from 'src/app/interfaces/interfaces';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-landpage',
  templateUrl: './userLandpage.component.html',
  styleUrls: ['./userLandpage.component.scss'],

  providers: [SessionGuard],
})
export class UserLandpageComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId')!);

  taskList: Task[] = [];
  projectList: Project[] = [];
  relationsProjectsList: Relation[] = [];

  filteredTaskList: Task[] = [];

  activeTaskList: Task[] = [];
  pendingTaskList: Task[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private relationsProjectsService: RelationsProjectsService
  ) {}

  /**
   * Se obtienen los datos de un archivo JSON.
   */
  async ngOnInit() {
    forkJoin([
      this.taskService.getTaskList(),
      this.projectService.getProjectList(),
      this.relationsProjectsService.getProjectRelationByUserId(this.userId),
    ]).subscribe(async ([taskResponse, projectResponse, relationsResponse]) => {
      const taskList: Task[] = await (taskResponse as any).tasks;
      const projectList: Project[] = await (projectResponse as any).projects;
      const relationsProjectsList: Relation[] = await (relationsResponse as any)
        .relations_projects;

      this.taskList = taskList;
      this.projectList = projectList;
      this.relationsProjectsList = relationsProjectsList;

      this.setProjectToTask();
      this.filterTasksByStatus();
    });
  }

  /**
   * Se realiza la unión de datos para generar las tarjetas correspondientes al usuario.
   */
  setProjectToTask() {
    this.relationsProjectsList.forEach((relation: Relation) => {
      this.taskList.forEach((task: Task) => {
        this.projectList.forEach((project: Project) => {
          if (
            relation.projectId == project.projectId &&
            relation.taskId == task.taskId
          ) {
            task.projectName = project.name;
            this.filteredTaskList.push(task);
          }
        });
      });
    });
  }

  /**
   * Filtra las tareas dependiendo de su status.
   */
  filterTasksByStatus() {
    const now = new Date();
    this.filteredTaskList.forEach((task: Task) => {
      if (task.status == 'Activo') {
        const [fullDate, fullTime] = task.deadline.split(', ');
        const [day, month, year] = fullDate.split('/');
        const [hours, minutes, seconds] = fullTime.split(':');
        const deadline = new Date(
          +year,
          +month - 1,
          +day,
          +hours,
          +minutes,
          +seconds
        );
        if (deadline > now) {
          this.activeTaskList.push(task);
        } else {
          this.pendingTaskList.push(task);
        }
      }
    });
  }
}
