import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Route } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SessionGuard } from 'src/app/guards/session.guard';
import { Relation, Task } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/api/project.service';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';
import { TaskService } from 'src/app/services/api/task.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { PdfService } from 'src/app/services/pdf/pdf.service';
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
  activityList: any[] = [];
  projectTitle: string = "Proyecto ejemplo";

  fullFilTaskList: Task[] = [];
  filteredTaskList: Task[] = [];

  searchTaskName: string = '';
  minDate: String = new String();
  maxDate: String = new String();

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
    private excelService: ExcelService,
    private pdfService: PdfService,
    private taskService: TaskService,
    private projectService: ProjectService) {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  /**
   * Se obtienen los datos de la BD.
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
          this.fullFilTaskList.push(tempTask);
          this.filteredTaskList = this.fullFilTaskList;
        })
      })
    });
  }

  /**
  * Se obtienen los datos del proyecto asociados al proyecto.
  */
  async getTaskFromProject(){
    this.relationsProjectsList.forEach((relationProject: Relation) =>{
      this.activityList.push(relationProject.taskId);

      // Convert the array to a Set to remove duplicates, and then convert it back to an array
      this.activityList = [...new Set(this.activityList)];
    });
  }

  /**
  * Filtra la lista de tareas por su nombre.
  */
  filterByTaskName() {
    this.filteredTaskList = this.fullFilTaskList.filter((task) =>
      task.name.includes(this.searchTaskName)
    );
  }

  /**
  * Filtra la lista de usuarios por su fecha de inicio y fin.
  */
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

  /**
  * Redirecciona a la pagina con los detalles de la tarea.
  */
  openTask(taskId: number) {
    this.router.navigate(['/admin-task-modifier', taskId]);
  }

  /**
  * Envía datos al servicio de excel para imprimir los datos de las tareass asociadas al proyecto.
  */
  generateExcel(): void {
    var data: any[] = [];
    this.fullFilTaskList.forEach( (element) => {
      data.push({ ID: element.taskId, Nombre: element.name, Descripcion: element.description, FechaDeEntrega: element.creationDate, Estado: element.status})
    });
    this.excelService.generateExcel(data, 'Sheet1', 'Tareas ' + this.projectTitle);
  }

  /**
  * Envía datos al servicio de PDF para imprimir los datos de las tareas asociadas al proyecto.
  */
  generatePdf(): void {
    var txt = 'Tareas en el proyecto: ' + this.projectTitle + '\n\n';
    this.fullFilTaskList.forEach( (element) => {
      txt = txt 
      + 'Tarea: ' + element.taskId + '-' + element.name + '\n'
      + 'Descripción: ' + element.description + '\n'
      + 'Fecha de creación: ' + element.creationDate + '\n'
      + 'Estatus: ' + element.status + '\n\n'
    });
    this.pdfService.generatePdf(txt, this.projectTitle);
  }
}
