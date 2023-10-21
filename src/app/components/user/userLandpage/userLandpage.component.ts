import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import * as taskList from "src/assets/json/taskSample.json";
import { Component, OnInit } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-user-landpage',
  templateUrl: './userLandpage.component.html',
  styleUrls: ['./userLandpage.component.scss'],

  providers: [SessionGuard]

})
export class UserLandpageComponent implements OnInit {

  itemList = [];

  constructor() { }

  ngOnInit() {
     this.itemList = (taskList as any).default;
  }

//   @ViewChild("viewContainerRef", { read: TaskItemComponent }) vcr!: TaskItemComponent;
// ref!: ComponentRef<TaskItemComponent>

// addChild() {
//   this.ref = this.vcr.createComponent(TaskItemComponent)
// }

// removeChild() {
//   const index = this.vcr.indexOf(this.ref.hostView)
//   if (index != -1) this.vcr.remove(index)
// }

// addComponent(componentClass: Type<any>) {
//   // Create component dynamically inside the ng-template
//   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
//   const component = this.container.createComponent(componentFactory);

//   // Push the component so that we can keep track of which components are created
//   this.components.push(component);
// }
}
