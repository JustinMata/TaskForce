import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  title = '';
 
  task = {
    "completed": false,
    "createdOn": "",
    "id": 0,
    "title": this.title,
  }

  constructor(private taskService: TaskService) { 
  }

  ngOnInit(): void {
    
  }

  updateTitle() {
    this.task.title = this.title;
    // console.log(this.task);
    // console.log(this.title);
    this.taskService.addTask(this.task).subscribe((response) => {
      console.log(`Adding ${this.task.title}`);
    },
    err => {
      console.log(err);
    },
    () => alert ('Task has been added!'));
    this.title = ''
  }

}
