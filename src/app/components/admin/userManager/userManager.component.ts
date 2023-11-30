import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SessionGuard } from 'src/app/guards/session.guard';
import { Project, Relation, User } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/api/project.service';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';
import { UserService } from 'src/app/services/api/user.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import * as userListJSON from "src/assets/json/userSample.json";

@Component({
  selector: 'app-userManager',
  templateUrl: './userManager.component.html',
  styleUrls: ['./userManager.component.scss'],
  providers: [SessionGuard]
})
export class UserManagerComponent implements OnInit {

  userList: any[] = [];

  projectId: number = 0;
  projectName: string = "Proyecto de ejemplo";
  relationProject: Relation[] = [];
  usersIds: number[] = [];

  fullFilUserList: User[] = [];
  filteredUserList: User[] = [];

  searchUserName: string = '';

  /**
   * Controlador del paginador de la tabla.
   */
  page: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0
  };

  constructor(
    private route: ActivatedRoute,
    private excelService: ExcelService,
    private pdfService: PdfService,
    private userService: UserService,
    private relationProjectService: RelationsProjectsService,
    private projectService: ProjectService
    ) {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  /**
  * Se obtienen los datos la BD.
  */
  ngOnInit() {

    forkJoin([
      this.relationProjectService.getProjectRelationByProjectId(this.projectId),
      this.projectService.getProjectById(this.projectId)
      
    ]).subscribe(async([relationProjectResponse, projectResponse]) =>{
      const relationProject: Relation[] = await(relationProjectResponse as any).relations_projects;
      const project: Project = await(projectResponse as any).project;

      this.projectName = project.name;
      this.relationProject = relationProject;
      this.getUsersIdFromProject();
      this.getUserInTheProject();

      this.page.length = this.usersIds.length;
      console.log(this.page.length);
    });
  }

  /**
  * Obtener todas las id de usuario asociadas al proyecto.
  */
  getUsersIdFromProject() {
    this.relationProject.forEach((project: Relation) => {
        this.usersIds.push(project.userId);
    });

    // Convert the array to a Set to remove duplicates, and then convert it back to an array
    this.usersIds = [...new Set(this.usersIds)];
  }
  
  /**
  * Se obtienen los datos del usuario asociados al proyecto.
  */
  async getUserInTheProject(){
    this.usersIds.forEach((userId) =>{
      this.userService.getUserById(userId).subscribe(async(userResponse)=>{
        this.fullFilUserList.push(await(userResponse as any).user);
        this.filteredUserList = this.fullFilUserList;
      });
    });
  } 
  
  /**
  * Filtra la lista de usuarios por su nombre.
  */
  filterByUserName() {
    this.filteredUserList = this.fullFilUserList.filter((user) =>
      user.name.includes(this.searchUserName)
    );
  }

  /**
  * Envía datos al servicio de excel para imprimir los datos de los usuarios asociados al proyecto.
  */
  generateExcel(): void {
    var data: any[] = [];
    this.fullFilUserList.forEach( (element) => {
      data.push({ ID: element.userId, Nombre: element.name, Email: element.email, Rol: element.role, FechaDeCreacion: element.creationDate, UltimoLogin: element.lastLoginDate})
    });
    this.excelService.generateExcel(data, this.projectName, 'Directorio '+ this.projectName);
  }

  /**
  * Envía datos al servicio de PDF para imprimir los datos de los usuarios asociados al proyecto.
  */
  generatePdf(): void {
    var txt = 'Usuarios en el proyecto:' + this.projectName + '\n\n';
    this.fullFilUserList.forEach( (element) => {
      txt = txt 
      + 'Usuario: ' + element.userId + '-' + element.name + '\n'
      + 'Email: ' + element.email + '\n'
      + 'Rol: ' + element.role + '\n'
      + 'Fecha de creación: ' + element.creationDate + '\n'
      + 'Ultimo login: ' + element.lastLoginDate + '\n\n'
    });
    this.pdfService.generatePdf(txt, this.projectName);
  }
}
