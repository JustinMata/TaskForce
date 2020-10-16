import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, map, switchMap, tap, catchError } from 'rxjs/operators';

import { Task } from './task';
import { SortColumn, SortDirection } from './directives/sortable.directive';
import { async } from '@angular/core/testing';

interface SearchResult {
  tasks: Task[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

// Justin's API
const BASE_URL = 'http://54.215.33.173:8080';

const compare = (v1: string | number | boolean, v2: string | number | boolean): number => {
  if(typeof v1 === 'string' && typeof v2 === 'string') {
    v1 = v1.toLowerCase();
    v2 = v2.toLowerCase();
  }
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(tasks: Task[], column: SortColumn, direction: string): Task[] {
  if (direction === '' || column === '') {
    return tasks;
  } else {
    return [...tasks].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction  === 'asc' ? res : -res;
    });
  }
}

function matches(task: Task, term: string, pipe: PipeTransform) {
  return task.completed.toString() === term.toLowerCase() || task.createdOn.toLowerCase().includes(term.toLowerCase()) 
  || pipe.transform(task.id).includes(term) 
  || task.title.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private loading = new BehaviorSubject<boolean>(true);
  private search = new Subject<void>();
  private tasks = new BehaviorSubject<Task[]>([]);
  private total = new BehaviorSubject<number>(0);

  private state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http: HttpClient, private pipe: DecimalPipe) {
    this.search.pipe(
      tap(() => this.loading.next(true)),
      debounceTime(200),
      switchMap(() => this.search$()),
      delay(200),
      tap(() => this.loading.next(false))
      ).subscribe(result => {
        this.tasks.next(result.tasks);
        console.log(result.tasks);
        this.total.next(result.total);
      });

      this.search.next();
  }

  get loading$() { return this.loading.asObservable(); }
  get tasks$() { return this.tasks.asObservable(); }
  get total$() { return this.total.asObservable(); }
  get page() { return this.state.page };
  get pageSize() { return this.state.pageSize; }
  get searchTerm() { return this.state.searchTerm; }

  set page(page: number) { this.set({ page }); }
  set pageSize(pageSize: number) { this.set({ pageSize }); }
  set searchTerm(searchTerm: string) { this.set({ searchTerm }); }
  set sortColumn(sortColumn: SortColumn) { this.set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this.set({ sortDirection }); }

  private set(patch: Partial<State>) {
    Object.assign(this.state, patch);
    this.search.next();
  }

  private async search$(): Promise<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this.state;

    let tasks: Task[];

    await this.getTasks().toPromise().then(result => {
      tasks = result as Task[];
    });

    tasks = sort(tasks, sortColumn, sortDirection);
    
    tasks = tasks.filter(task => matches(task, searchTerm, this.pipe));

    const total = tasks.length;
    
    tasks = tasks.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return { tasks, total };
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${BASE_URL}/todos`, task).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/todos/${id}`).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    );
  }

  deleteAllTasks(): Observable<any> {
    return this.http.delete(`${BASE_URL}/todos/truncate`).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${BASE_URL}/todos/${id}`).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    );
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${BASE_URL}/todos`).pipe(
      catchError((error: any) => {
        console.error(error);
        return of([]);
      })
    );
  }

  patchTask(id: number): Observable<any> {
    return this.http.patch(`${BASE_URL}/todos/${id}`, null).pipe(
      catchError((error: any) => {
        console.error(error);
        return of([]);
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${BASE_URL}/todos`, task).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(null);
      })
    );
  }

  searchTask(term: string): Observable<Task[]> {
    let x = 0;
    return this.getTasks().pipe(
      map((tasks: Task[]): Task[] => {
        return this.filterByValue(term, tasks);
      })
    );
  }

  filterByValue(myString: String, tasks: Task[]): Task[] {
    let myResults: Task[] = [];
    for (let i = 0; i < tasks.length; i++) {
  
      if (tasks[i].title.toLowerCase().includes(myString.toLowerCase())) {
        myResults.push(tasks[i]);
      }
    }
    return myResults;
  }
}
