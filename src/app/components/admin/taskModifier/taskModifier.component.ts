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
  selector: 'app-taskModifier',
  templateUrl: './taskModifier.component.html',
  styleUrls: ['./taskModifier.component.scss'],
  providers: [SessionGuard]
})

export class TaskModifierComponent implements OnInit {
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

  taskId: number = 0;
  userId: number = parseInt(localStorage.getItem('userId')!);

  newCommentContent: string = '';

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

  commentItem: Comment = {
    commentId: 0,
    taskId: 0,
    userId: 0,
    status: '',
    content: '',
    date: '',
  };

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService,
    private commentService: CommentService,
    private userService: UserService,
    private relationsCommentsService: RelationsCommentsService,
    private relationsProjectsService: RelationsProjectsService,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.taskId = params['taskId'];
    });
  }

  async ngOnInit() {
    forkJoin([
      this.taskService.getTaskById(this.taskId),
      this.userService.getWorkersList(),
      this.relationsCommentsService.getCommentRelationByTaskId(this.taskId),
      this.relationsProjectsService.getProjectRelationByTaskId(this.taskId),
    ]).subscribe(
      async ([
        taskResponse,
        workerResponse,
        relationCommentsResponse,
        relationProjectsResponse,
      ]) => {
        const taskItem: Task = await (taskResponse as any).task;
        const workersList: User[] = await (workerResponse as any).workers;
        const relationCommentsList: Relation[] = await (
          relationCommentsResponse as any
        ).relations_comments;
        const relationProjectsList: Relation[] = await (
          relationProjectsResponse as any
        ).relations_projects;

        this.taskItem = taskItem;
        this.workersList = workersList;
        this.relationsCommentsList = relationCommentsList;
        this.relationsProjectsList = relationProjectsList;

        this.getProjectData();
        this.getCommentsData();
      }
    );

    this.form = this.fb.group({
      taskId: [{ value: this.taskItem.taskId, disabled: true },Validators.required,],
      name: [{ value: this.taskItem.name },[Validators.required, Validators.minLength(2)],],
      description: [{ value: this.taskItem.description }, [Validators.required, Validators.minLength(2)]],
      status: [{ value: this.taskItem.status }],
      deadline: [{ value: this.taskItem.deadline }],
    });
  }

  getProjectData() {
    this.relationsProjectsList.forEach((projectRelation) => {
      if (projectRelation.taskId == this.taskId) {
        this.projectId = projectRelation.projectId;

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
      }
    });
  }

  getCommentsData() {
    this.relationsCommentsList.forEach((commentRelation) => {
      if (commentRelation.taskId == this.taskId) {
        const commentId = commentRelation.commentId;
        const userId = commentRelation.userId;

        this.commentService
          .getCommentById(commentId!)
          .subscribe(async (response: any) => {
            let commentData = response.comment;
            commentData.userId = userId;
            this.commentList.push(commentData);
          });
      }
    });
  }

  getUserName(searchUserId: number): string {
    var name = '';
    this.workersList.forEach((worker) => {
      if (worker.userId == searchUserId) {
        name = worker.name;
      }
    });
    return name;
  }

  deleteComment(comment: Comment) {
    const { commentId } = comment;

    this.commentService
      .deleteComment(commentId)
      .subscribe(async (response: any) => {
        alert(response.response || response.error);
      });

  }

  saveChanges() {
    const taskId: number = this.taskId;
    const { name, description, status, creationDate, deadline } = this.taskItem;

    this.taskService.editTask(taskId, name, description, status, creationDate, deadline).subscribe(async (response: any) => {
      alert(response.response || response.error);
    });

    this.router.navigate(['/admin-task-manager/', this.projectId]);
  }

  navigateToTaskManager() {
    this.router.navigate(['/admin-task-manager/', this.projectId]);
  }

  deleteActivity() {
    const taskId: number = this.taskId;
    this.taskService.deleteTask(taskId).subscribe(async (response: any) => {
      alert(response.response || response.error);
    });
    this.router.navigate(['/admin-task-manager/', this.projectId]);
  }

}
