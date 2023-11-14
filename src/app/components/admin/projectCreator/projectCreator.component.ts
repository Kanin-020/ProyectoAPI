import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project, User } from 'src/app/interfaces/interfaces';
import { ProjectService } from 'src/app/services/api/project.service';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-projectCreator',
  templateUrl: './projectCreator.component.html',
  styleUrls: ['./projectCreator.component.scss']
})
export class ProjectCreatorComponent implements OnInit {

  projectItem: Project = {
    projectId: 0,
    name: '',
    description: '',
    status: '',
    creationDate: '',
    deadline: ''
  }

  usersList: User[] = [];
  assignedUsersList: User[] = [];

  relationsList: RelationsProjectsService[] = [];

  addedUserId: number = 0;

  formItem!: FormGroup;

  constructor(private router: Router, private projectService: ProjectService, private userService: UserService, private relationsProjectsService: RelationsProjectsService) { }

  ngOnInit() {

    this.userService.getUsersList().subscribe(async (response: any) => {

      const userList: User[] = await response.users;

      this.usersList = userList;

    });


    this.formItem = new FormGroup({
      name: new FormControl(this.projectItem.name, Validators.required),
      description: new FormControl(this.projectItem.description),
      deadline: new FormControl(this.projectItem.deadline, Validators.required),
      userId: new FormControl(this.addedUserId),
    });

  }

  addUsersToProject() {

    const userId = this.addedUserId;

    this.usersList.forEach(user => {
      if (userId == user.userId && !this.assignedUsersList.some(user => user.userId == userId) && userId != 0) {
        this.assignedUsersList.push(user);
      }
    });

  }

  deleteUsersFromProject(userId: number) {

    const indexToRemove = this.assignedUsersList.findIndex(user => user.userId === userId);

    if (indexToRemove !== -1) {
      this.assignedUsersList.splice(indexToRemove, 1);
    }

  }

  createProject() {

    const { name, description, deadline } = this.projectItem;

    let dateObject: Date = new Date;

    const creationDate = dateObject.toLocaleDateString();

    const status = "En proceso";

    this.projectService.addProject(name, description, status, creationDate, deadline).subscribe(async (response: any) => {

      alert(response.response || response.error);

      const projectId = response.projectId;

      this.assignedUsersList.forEach(user => {

        const userId = user.userId;

        this.relationsProjectsService.addProjectRelation(projectId, userId).subscribe(async (response: any) => {
          console.log(response);
        });

      });

    });



  }

  cancelProjectCreation() {
    this.router.navigate(['/admin-landpage']);
  }

}
