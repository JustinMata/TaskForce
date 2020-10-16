import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TaskService } from 'src/app/task.service';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { SortableDirective } from '../directives/sortable.directive';

@NgModule({
  declarations: [
    TaskDetailComponent, 
    TaskListComponent, 
    TaskPageComponent, 
    TaskSearchComponent, 
    TaskCreateComponent, 
    TaskCardComponent,
    SortableDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    TaskDetailComponent, 
    TaskListComponent, 
    TaskPageComponent, 
    TaskSearchComponent, 
    TaskCreateComponent,
    TaskCardComponent,
  ],
  providers: [
    TaskService,
    DecimalPipe
  ]
})
export class TaskModule { }
