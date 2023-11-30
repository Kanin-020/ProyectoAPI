import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SessionGuard } from 'src/app/guards/session.guard';
import { Project, Task, Comment, User, Relation, } from 'src/app/interfaces/interfaces';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';
import { TaskService } from 'src/app/services/api/task.service';
import { UserService } from 'src/app/services/api/user.service';
import { ProjectService } from 'src/app/services/api/project.service';
import { CommentService } from 'src/app/services/api/comment.service';
import { PageEvent } from '@angular/material/paginator';
import { RelationsCommentsService } from 'src/app/services/api/relationsComments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-taskCreator',
  templateUrl: './taskCreator.component.html',
  styleUrls: ['./taskCreator.component.scss']
})
export class TaskCreatorComponent implements OnInit {
  page: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0,
  };

  workersList: User[] = [];
  assignedWorkersList: string[] = [];
  commentList: Comment[] = [];

  relationsCommentsList: Relation[] = [];
  relationsProjectsList: Relation[] = [];

  projectId: any;

  userId: number = parseInt(localStorage.getItem('userId')!);

  taskItem: Task = {
    taskId: 0,
    projectId: 0,
    name: '',
    description: '',
    status: '',
    creationDate: '',
    deadline: '',
  };

  projectItem: Project = {
    projectId: 0,
    name: '',
    description: '',
    status: '',
    creationDate: '',
    deadline: '',
  };

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'];
    });
  }

  async ngOnInit() {
    forkJoin([
      this.userService.getWorkersList(),
    ]).subscribe(
      async ([
        workerResponse,
      ]) => {
        const workersList: User[] = await (workerResponse as any).workers;
        this.workersList = workersList;

        this.getProjectData();
      }
    );

    this.form = this.fb.group({
      taskId: [this.taskItem.taskId,Validators.required],
      name: [this.taskItem.name,[Validators.required, Validators.minLength(2)]],
      description: [this.taskItem.description, [Validators.required, Validators.minLength(2)]],
      status: [this.taskItem.status,Validators.required],
      deadline: [this.taskItem.deadline,Validators.required],
    });
  }

  getProjectData() {
    this.relationsProjectsList.forEach((projectRelation) => {
      this.projectService
        .getProjectById(this.projectId!)
        .subscribe(async (response: any) => {
          const projectData = response.project;
          this.projectItem = projectData;
        });
      this.workersList.forEach((worker) => {
        if (projectRelation.userId == worker.userId) {
          this.assignedWorkersList.push(worker.name);
        }
      });
    });
  }

  saveChanges() {
    const { name, description, status, creationDate, deadline } = this.taskItem;

    this.taskService.addTask(name, description, status, creationDate, deadline).subscribe(async (response: any) => {
      alert(response.response || response.error);
    });

    this.router.navigate(['/admin-task-manager/', this.projectId]);
  }

  discardCreation() {
    this.router.navigate(['/admin-task-manager/', this.projectId]);
  }

}
