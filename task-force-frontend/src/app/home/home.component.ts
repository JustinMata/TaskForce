import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  addNew = false;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {

  }

  toggleCreate() {
    return this.addNew = !this.addNew;
  }

  deleteTasks() {
    if (confirm("Do you Really want to DELETE ALL tasks!")) {
      this.taskService.deleteAllTasks().subscribe(response => {
        console.log(`Response = ${response}`);
        alert(`All tasks have been deleted!`)
      },
        err => {
          console.log(err);
        });
    }
  }
}
