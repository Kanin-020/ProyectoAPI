import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskItem',
  templateUrl: './taskItem.component.html',
  styleUrls: ['./taskItem.component.scss']
})
export class TaskItemComponent {

  @Input() taskItem: any;

  constructor(private router: Router) { }

  openTask() {
    const taskId = this.taskItem.taskId;
    this.router.navigate(['/user-task-details', taskId]);
  }

}
