"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TaskPageComponent = void 0;
var core_1 = require("@angular/core");
var TaskPageComponent = /** @class */ (function () {
    function TaskPageComponent(taskService, route, router) {
        this.taskService = taskService;
        this.route = route;
        this.router = router;
        // Force the router to refresh the page again even if it is already on this page
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }
    TaskPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        var term = this.route.snapshot.queryParamMap.get("search");
        console.log(term);
        if (term) {
            this.taskService.searchTask(term).subscribe(function (tasks) {
                _this.tasks = tasks;
            });
        }
        else
            this.taskService.getTasks().subscribe(function (tasks) {
                _this.tasks = tasks;
            });
    };
    TaskPageComponent = __decorate([
        core_1.Component({
            selector: 'app-task-page',
            templateUrl: './task-page.component.html',
            styleUrls: ['./task-page.component.css']
        })
    ], TaskPageComponent);
    return TaskPageComponent;
}());
exports.TaskPageComponent = TaskPageComponent;
