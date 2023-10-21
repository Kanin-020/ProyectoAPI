import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-taskItem',
  templateUrl: './taskItem.component.html',
  styleUrls: ['./taskItem.component.scss']
})
export class TaskItemComponent {

  @Input() taskItem: any;

}
