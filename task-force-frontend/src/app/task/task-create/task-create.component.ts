import { Component, OnInit, ElementRef } from '@angular/core';
import { Task } from '../../task';
import { TaskService } from '../../task.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  title: string = '';
  task: Task = {
    "completed": false,
    "createdOn": '',
    "id": 0,
    "title": this.title,
  };

  constructor(private taskService: TaskService, private notificationsService: NotificationsService, private el: ElementRef) { 
  }

  ngOnInit(): void {
    this.el.nativeElement.querySelector('#searchQuery').focus();
  }

  updateTitle() {
    this.task.title = this.title;
    this.taskService.addTask(this.task).subscribe((response) => {
    },
    err => {
      this.notificationsService.showWarning(`There was an error adding Task: <b>"${this.task.title}"</b>`, 'Failure');
    },
    () => this.notificationsService.showSuccess(`The Task: "<b>${this.task.title}"</b> has been added`, 'Success'));
    this.title = '';
  }

}
