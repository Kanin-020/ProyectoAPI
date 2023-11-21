import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SessionGuard } from 'src/app/guards/session.guard';
import { Project, Relation, User } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/api/project.service';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';
import { UserService } from 'src/app/services/api/user.service';
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
  users: User[] = [];

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
    private userService: UserService,
    private relationProjectService: RelationsProjectsService,
    private projectService: ProjectService
    ) {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }

  /**
  * Se obtienen los datos de un archivo JSON.
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

  getUsersIdFromProject(){
    this.relationProject.forEach((project : Relation) =>{
      this.usersIds.push(project.userId);
    })
  }

  async getUserInTheProject(){
    this.usersIds.forEach((userId) =>{
      this.userService.getUserById(userId).subscribe(async(userResponse)=>{
        this.users.push(await(userResponse as any).user);
      });
    });
  } 

}
