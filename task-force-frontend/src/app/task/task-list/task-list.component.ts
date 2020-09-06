import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../task.service';
import { Task } from '../../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
tasks: Task[];

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let term = this.route.snapshot.queryParamMap.get("search");
    console.log (term);
    if (term) {
      this.taskService.searchTask(term).subscribe((tasks) => {
        this.tasks = tasks;
    })}
    else this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

}
