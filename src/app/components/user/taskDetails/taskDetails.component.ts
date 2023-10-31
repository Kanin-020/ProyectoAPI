import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SessionGuard } from 'src/app/guards/session.guard';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/api/task.service';
import { ProjectService } from 'src/app/services/api/project.service';
import { CommentService } from 'src/app/services/api/comment.service';
import { Project, Task, Comment, User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-taskDetails',
  templateUrl: './taskDetails.component.html',
  styleUrls: ['./taskDetails.component.scss'],
  providers: [SessionGuard]
})
export class TaskDetailsComponent {

  protected page: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0
  };

  protected workersList: string[] = [];

  protected commentList: Comment[] = [];

  protected taskId: number = 0;

  protected taskItem: Task = {
    taskId: 0,
    projectId: 0,
    name: '',
    description: '',
    state: '',
    creationDate: '',
    deadline: '',
  };

  protected projectItem: Project = {
    projectId: 0,
    name: '',
    description: '',
    state: '',
    creationDate: '',
    deadline: '',
  };

  protected commentItem: Comment = {
    commentId: 0,
    taskId: 0,
    userId: 0,
    state: '',
    content: '',
    date: '',
  };

  constructor(private route: ActivatedRoute, private taskService: TaskService, private projectService: ProjectService, private commentService: CommentService, private userService: UserService) {
    this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
    });
  }

  async ngOnInit() {

    this.taskService.getTaskById(this.taskId).subscribe(async (response: any) => {

      const taskData = await response.task;

      this.taskItem = taskData;

      const projectId = this.taskItem.projectId;

      this.projectService.getProjectById(projectId).subscribe(async (response: any) => {

        const projectData = await response.project;

        this.projectItem = projectData;

      });

    });

    this.commentService.getCommentsByTaskId(this.taskId).subscribe(async (response: any) => {

      const commentData = await response.comments;

      this.commentList = commentData;

      this.userService.getWorkersList().subscribe(async (response: any) => {

        const workersList = await response.workers;

        this.commentList.forEach((comment: Comment) => {

          workersList.forEach((user: User) => {

            if (comment.userId == user.userId) {
              this.workersList.push(user.name);
            }

          });
        });

        this.workersList = this.deleteDuplicatedElements(this.workersList);

      });

    });

  }

  deleteDuplicatedElements(list: string[]) {
    return list.filter((value: any, index: any, self: any) => {
      return self.indexOf(value) === index;
    });
  }


}
