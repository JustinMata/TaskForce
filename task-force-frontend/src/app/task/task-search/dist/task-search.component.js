"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TaskSearchComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var TaskSearchComponent = /** @class */ (function () {
    function TaskSearchComponent(taskService, router) {
        this.taskService = taskService;
        this.router = router;
        this.searchVal = '';
    }
    TaskSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        var input = document.getElementById("myInput");
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("myBtn").click();
            }
        });
        this.router.events.subscribe(function (e) {
            if (e instanceof router_1.NavigationEnd) {
                _this.searchVal = '';
            }
        });
    };
    TaskSearchComponent.prototype.searchTask = function () {
        var _this = this;
        this.taskService.searchTask(this.searchVal).subscribe(function (tasks) {
            _this.tasks = tasks;
            console.log(tasks);
            if (tasks === undefined || (tasks === null || tasks === void 0 ? void 0 : tasks.length) === 0) {
                alert(_this.searchVal + " was not found");
                _this.searchVal = '';
            }
            else {
                console.log(tasks.length + " results");
                if (tasks.length == 1) {
                    _this.router.navigate(['/', 'taskDetails'], { queryParams: { "search": _this.searchVal } });
                }
                else if (tasks.length > 1) {
                    _this.router.navigate(['/', 'tasks'], { queryParams: { "search": _this.searchVal } });
                }
            }
        });
    };
    TaskSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-task-search',
            templateUrl: './task-search.component.html',
            styleUrls: ['./task-search.component.css']
        })
    ], TaskSearchComponent);
    return TaskSearchComponent;
}());
exports.TaskSearchComponent = TaskSearchComponent;
