"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TaskCardComponent = void 0;
var core_1 = require("@angular/core");
var TaskCardComponent = /** @class */ (function () {
    function TaskCardComponent(taskService, router) {
        this.taskService = taskService;
        this.router = router;
        this.task$ = null;
        this.newTitle$ = '';
        this.updated$ = false;
    }
    TaskCardComponent.prototype.ngOnInit = function () {
        this.newTitle$ = this.task$.title;
    };
    TaskCardComponent.prototype.updateTask = function () {
        var _this = this;
        if (this.task$.title === this.newTitle$) {
            return;
        }
        this.task$.title = this.newTitle$;
        this.taskService.updateTask(this.task$).subscribe(function () {
            _this.updated$ = true;
            console.log("Task updated successfully.");
        }, function (err) {
            console.log(err);
        });
    };
    TaskCardComponent.prototype.toggleComplete = function () {
        if (this.task$.completed) {
            this.markUncomplete();
        }
        else {
            this.markComplete();
        }
    };
    TaskCardComponent.prototype.markComplete = function () {
        this.taskService.patchTask(this.task$.id).subscribe(function () {
            console.log("Task marked completed successfully.");
        }, function (err) {
            console.log(err);
        });
    };
    TaskCardComponent.prototype.markUncomplete = function () {
        this.task$.completed = !this.task$.completed;
        this.taskService.updateTask(this.task$).subscribe(function () {
            console.log("Task marked uncompleted successfully.");
        }, function (err) {
            console.log(err);
        });
    };
    TaskCardComponent.prototype.deleteTask = function () {
        var _this = this;
        if (confirm("Are you sure you want to delete this task?")) {
            this.taskService.deleteTask(this.task$.id).subscribe(function () {
                console.log("Task deleted successfully.");
                _this.router.navigate(['/', 'tasks']);
            }, function (err) {
                console.log(err);
            });
        }
    };
    __decorate([
        core_1.Input()
    ], TaskCardComponent.prototype, "task$");
    TaskCardComponent = __decorate([
        core_1.Component({
            selector: 'app-task-card',
            templateUrl: './task-card.component.html',
            styleUrls: ['./task-card.component.css']
        })
    ], TaskCardComponent);
    return TaskCardComponent;
}());
exports.TaskCardComponent = TaskCardComponent;
