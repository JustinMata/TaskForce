import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Task } from '../../task';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {
  task: Task;
  tasks: Task[];
  searchVal = '';

  constructor(private taskService: TaskService, public router: Router) { }

  ngOnInit(): void {
    var input = document.getElementById("myInput");
    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
      }
    });
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.searchVal = '';
      }
    });
  }

  searchTask() {
    this.taskService.searchTask(this.searchVal).subscribe((tasks) => {
      this.tasks = tasks;
      console.log(tasks);


      if (tasks === undefined || tasks?.length === 0) {
        alert(`${this.searchVal} was not found`);
        this.searchVal = '';
      }
      else {
        console.log(`${tasks.length} results`);
        if (tasks.length == 1) {
          this.router.navigate(['/', 'taskDetails'], { queryParams: { "search": this.searchVal } });
        } else if (tasks.length > 1) {
          this.router.navigate(['/', 'tasks'], { queryParams: { "search": this.searchVal } });
        }
      }
    });
  }
}