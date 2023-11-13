import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Project, Relation, User } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/api/project.service';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-project-modifier',
  templateUrl: './projectModifier.component.html',
  styleUrls: ['./projectModifier.component.scss']
})
export class ProjectModifierComponent {

  projectId: number = 0;

  projectItem: Project = {
    projectId: 0,
    name: '',
    description: '',
    status: '',
    creationDate: '',
    deadline: ''
  }

  addedUserId: number = 0;

  usersList: User[] = [];

  filteredUsersList: User[] = [];

  relationProjectsList: Relation[] = [];

  formItem!: FormGroup;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private userService: UserService, private relationsProjectsService: RelationsProjectsService) {


    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];

    });

    forkJoin([
      this.projectService.getProjectById(this.projectId),
      this.userService.getUsersList(),
      this.relationsProjectsService.getProjectRelationByProjectId(this.projectId)
    ]).subscribe(async ([projectResponse, userResponse, relationProjectsResponse]) => {

      const projectItem: Project = await (projectResponse as any).project;
      const usersList: User[] = await (userResponse as any).users;
      const relationProjectsList: Relation[] = await (relationProjectsResponse as any).relations_projects;

      this.projectItem = projectItem;
      this.usersList = usersList;
      this.relationProjectsList = relationProjectsList;

      this.filterUsers();

    });

    this.formItem = new FormGroup({
      name: new FormControl(this.projectItem.name, Validators.required),
      description: new FormControl(this.projectItem.description),
      status: new FormControl(this.projectItem.status, Validators.required),
      creationDate: new FormControl(this.projectItem.creationDate),
      deadline: new FormControl(this.projectItem.deadline, Validators.required),
      userId: new FormControl(this.addedUserId),
    });

  }

  filterUsers() {

    const filteredUsersList: User[] = [];

    this.relationProjectsList.forEach(relation => {

      this.usersList.forEach(user => {

        if (relation.projectId == this.projectId && relation.userId == user.userId) {

          filteredUsersList.push(user);

        }

      });

    });

    this.filteredUsersList = this.deleteDuplicatedWorkers(filteredUsersList);

  }

  deleteDuplicatedWorkers(workers: User[]): User[] {

    const uniqueSet = new Set(workers);

    const uniqueArray = Array.from(uniqueSet);

    return uniqueArray;
  }

  addUsersToProject() {

    this.relationsProjectsService.addProjectRelation(this.projectId, this.addedUserId).subscribe(async (response: any) => {

      alert(response.response || response.error);

    });

  }

  quitUsersFromProject(userId: number) {

    this.relationProjectsList.forEach(relations => {

      if(relations.userId == userId && relations.relation_projectId){

        this.relationsProjectsService.deleteProjectRelation(relations.relation_projectId).subscribe(async (response: any) => {

          console.log(response);

        });

      }

    });

  }

  updateProjectData() {

    const { name, description, status, creationDate, deadline } = this.projectItem;

    this.projectService.editProject(this.projectId, name, description, status, creationDate, deadline).subscribe(async (response: any) => {

      alert(response.response || response.error);

    });

  }

}
