import { Component, DebugElement } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SessionGuard } from 'src/app/guards/session.guard';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/api/task.service';
import { ProjectService } from 'src/app/services/api/project.service';
import { CommentService } from 'src/app/services/api/comment.service';
import { Project, Task, Comment, User, Relation } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/api/user.service';
import { forkJoin } from 'rxjs';
import { RelationsCommentsService } from 'src/app/services/api/relationsComments.service';
import { RelationsProjectsService } from 'src/app/services/api/relationsProjects.service';


@Component({
  selector: 'app-taskDetails',
  templateUrl: './taskDetails.component.html',
  styleUrls: ['./taskDetails.component.scss'],
  providers: [SessionGuard]
})
export class TaskDetailsComponent {

  page: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0
  };

  workersList: User[] = [];
  workerNameList: string[] = [];
  commentOwnList: Comment[] = [];
  commentOtherList: Comment[] = [];

  relationsCommentsList: Relation[] = [];
  relationsProjectsList: Relation[] = [];

  taskId: number = 0;
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

  commentItem: Comment = {
    commentId: 0,
    taskId: 0,
    userId: 0,
    status: '',
    content: '',
    date: '',
  };

  constructor(private route: ActivatedRoute, private taskService: TaskService, private projectService: ProjectService, private commentService: CommentService, private userService: UserService, private relationsCommentsService: RelationsCommentsService, private relationsProjectsService: RelationsProjectsService) {
    this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
    });
  }

  async ngOnInit() {


    forkJoin([
      this.taskService.getTaskById(this.taskId),
      this.userService.getWorkersList(),
      this.relationsCommentsService.getCommentRelationByUserId(this.userId),
      this.relationsProjectsService.getProjectRelationByTaskId(this.taskId),
    ]).subscribe(async ([taskResponse, workerResponse, relationCommentsResponse, relationProjectsResponse]) => {

      const taskItem: Task = await (taskResponse as any).task;
      const workersList: User[] = await (workerResponse as any).workers;
      const relationCommentsList: Relation[] = await (relationCommentsResponse as any).relations_comments;
      const relationProjectsList: Relation[] = await (relationProjectsResponse as any).relations_projects;

      this.taskItem = taskItem;
      this.workersList = workersList;
      this.relationsCommentsList = relationCommentsList;
      this.relationsProjectsList = relationProjectsList;

      this.getProjectData();
      this.getCommentsData();

    });



  }


  getProjectData() {

    this.relationsProjectsList.forEach(projectRelation => {
      if (projectRelation.taskId == this.taskId) {
        const projectId = projectRelation.projectId;

        this.projectService.getProjectById(projectId!).subscribe(async (response: any) => {
          const projectData = response.project;
          this.projectItem = projectData;
        });
      }
    });

  }


  getCommentsData() {

    this.relationsCommentsList.forEach(commentRelation => {

      if (commentRelation.taskId == this.taskId) {

        const commentId = commentRelation.commentId;

        const userId = commentRelation.userId;

        this.commentService.getCommentById(commentId!).subscribe(async (response: any) => {

          let commentData = response.comment;

          commentData.userId = userId;

          if(userId == this.userId){
            this.commentOwnList.push(commentData);
          }else{
            this.commentOtherList.push(commentData);
          }

        });

      }

      this.workersList.forEach(worker => {
        if (commentRelation.userId = worker.userId) {
          this.workerNameList.push(worker.name);
        }
      });

      this.workerNameList = this.deleteDuplicatedWorkers(this.workerNameList);

    });

  }

  deleteDuplicatedWorkers(workers: string[]): string[] {

    const uniqueSet = new Set(workers);

    const uniqueArray = Array.from(uniqueSet);

    return uniqueArray;
  }

  markAsDone() {

    const { name, description, creationDate, deadline } = this.taskItem;

    this.taskService.editTask(this.taskId, name, description, 'Pendiente', creationDate, deadline).subscribe((response: any) => {
      alert(response.response || response.error);
    });

  }

  markAsNotDone() {

    const { name, description, creationDate, deadline } = this.taskItem;

    this.taskService.editTask(this.taskId, name, description, 'Activo', creationDate, deadline).subscribe((response: any) => {
      alert(response.response || response.error);
    });

  }

  updateComment(){

  }

  deleteComment(){

  }


}
