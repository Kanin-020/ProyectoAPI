import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { SessionGuard } from 'src/app/guards/session.guard';
import { TaskService } from 'src/app/services/api/task.service';
import { ProjectService } from 'src/app/services/api/project.service';
import { Project, Relation, Task } from 'src/app/interfaces/interfaces';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-taskArchive',
  templateUrl: './taskArchive.component.html',
  styleUrls: ['./taskArchive.component.scss'],
  providers: [SessionGuard],
})
export class TaskArchiveComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId')!);

  taskList: Task[] = [];
  projectList: Project[] = [];
  relationsProjectsList: Relation[] = [];

  fullFilTaskList: Task[] = [];
  filteredTaskList: Task[] = [];

  searchProjectName: string = '';
  searchTaskName: string = '';
  minDate: String = new String();
  maxDate: String = new String();

  protected page: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0,
  };

  constructor(
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService,
    private relationsProjectsService: RelationsProjectsService
  ) {}

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
            this.fullFilTaskList.push(task);
            this.filteredTaskList = this.fullFilTaskList;
          }
        });
      });
    });
  }

  filterByProjectName() {
    this.filteredTaskList = this.fullFilTaskList.filter((task) =>
      (task.projectName ?? '').includes(this.searchProjectName)
    );
  }

  filterByTaskName() {
    this.filteredTaskList = this.fullFilTaskList.filter((task) =>
      task.name.includes(this.searchTaskName)
    );
  }

  filterByDate() {
    var minDateFix = new Date();
    var maxDateFix = new Date();
    if (typeof this.minDate === 'string') {
      const [year, month, day] = this.minDate.split('-');
      minDateFix = new Date(+year, +month - 1, +day);
    }

    if (typeof this.maxDate === 'string') {
      const [year, month, day] = this.maxDate.split('-');
      maxDateFix = new Date(+year, +month - 1, +day);
    }
    minDateFix.setHours(0, 0, 0, 0);
    maxDateFix.setHours(0, 0, 0, 0);

    if (this.minDate <= this.maxDate) {
      this.filteredTaskList = this.fullFilTaskList.filter((task) => {
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
        deadline.setHours(0, 0, 0, 0);

        return deadline >= minDateFix && deadline <= maxDateFix;
      });
    } else {
      console.error(
        'La fecha mínima debe ser menor o igual a la fecha máxima.'
      );
    }
  }

  openTask(taskId: number) {
    this.router.navigate(['/user-task-details', taskId]);
  }

  /**
   * Obtiene el dato con la fecha del día de hoy.
   * @returns today - La fecha del día de hoy en formato de texto.
   */
  getTodaysDate(): string {
    let today: string = new Date().toISOString().split('T')[0];
    console.log(today);
    return today;
  }
}
