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
    let term = this.route.snapshot.queryParamMap.get("search");
    console.log (term);
    if (term) {
      this.taskService.searchTask(term).subscribe((task) => {
        this.tasks$ = task;
    })}
  }
}
