import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  tasks: Task[];


  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
    // Force the router to refresh the page again even if it is already on this page
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    let term = this.route.snapshot.queryParamMap.get("search");
    console.log(term);
    if (term) {
      this.taskService.searchTask(term).subscribe((tasks) => {
        this.tasks = tasks;
      })
    }
    else this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onSelect(task:Task) {
    this.tasks[0] =task;
    this.router.navigate(['/', 'taskDetails'], { queryParams: { "search": this.tasks[0].title } })

  }

}
