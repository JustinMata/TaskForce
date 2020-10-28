import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../task';
import { TaskService } from '../../task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  @Input() tasks$: Task[] = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let term1 = this.route.snapshot.queryParamMap.get("search");
    let term2 = this.route.snapshot.queryParamMap.get("id");
    if (term1) {
      this.taskService.searchTask(term1).subscribe((task) => {
        this.tasks$ = task;
      });
    } else if (term2) {
      this.taskService.getTask(Number(term2)).subscribe(task => {
        this.tasks$ = [task];
      });
    }
  }
}
