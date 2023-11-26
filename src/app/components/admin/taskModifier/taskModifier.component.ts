import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SessionGuard } from 'src/app/guards/session.guard';
import { Relation, Task, User } from 'src/app/interfaces/interfaces';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';
import { TaskService } from 'src/app/services/api/task.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-taskModifier',
  templateUrl: './taskModifier.component.html',
  styleUrls: ['./taskModifier.component.scss'],
  providers: [SessionGuard]
})

export class TaskModifierComponent implements OnInit{

  taskId: number = 0;
  task!: Task;
  dateTask!: string;
  users: User[] = [];
  usersId: number[] = [];
  relationProjectTaskOnUsers!: Relation[];

  constructor
  (
    private route: ActivatedRoute,
    private taskService: TaskService,
    private relationProjectService: RelationsProjectsService,
    private userService: UserService
  )
  {
    this.route.params.subscribe(params =>{
      this.taskId = params["taskId"];
    });
  }

  ngOnInit() {
    forkJoin([
      this.taskService.getTaskById(this.taskId),
      this.relationProjectService.getProjectRelationByTaskId(this.taskId)
    ]).subscribe(async([taskResponse, relationProjectResponse]) =>{
      this.task = await(taskResponse as any).task;
      const relationProjectTaskOnUsers: Relation[] = await(relationProjectResponse as any).relations_projects;
      this.dateTask = this.task.deadline;
      this.relationProjectTaskOnUsers = relationProjectTaskOnUsers;

      this.getUsersIdsAssignedToATask();
      this.getUsersAssignedToATask(this.usersId);
    })
  }

  async getUsersIdsAssignedToATask(){
    this.relationProjectTaskOnUsers.forEach((relationTaskOnUser: Relation) => {
      this.usersId.push(relationTaskOnUser.userId);
    })
  }

  async getUsersAssignedToATask(usersId: number[]){
    usersId.forEach((userId) =>{
      this.userService.getUserById(userId).subscribe(async(userServiceResponse) =>{
        this.users.push(await(userServiceResponse as any).user);
      });
    })
  }
}

