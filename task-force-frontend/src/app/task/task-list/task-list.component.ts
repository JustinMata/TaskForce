import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Observable } from 'rxjs';

import { SortableDirective, SortEvent } from '../../directives/sortable.directive';
import { TaskService } from '../../task.service';
import { Task } from '../../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  total$: Observable<number>;

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$;
    this.total$ = this.taskService.total$;
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.taskService.sortColumn = column;
    this.taskService.sortDirection = direction;
  }
}
