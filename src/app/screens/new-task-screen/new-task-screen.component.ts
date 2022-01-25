import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task-screen',
  templateUrl: './new-task-screen.component.html',
  styleUrls: ['./new-task-screen.component.scss']
})
export class NewTaskScreenComponent implements OnInit {
  taskListId: string = '';
  constructor(
    private api: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.taskListId = params.taskListId;
      }
    );
  }

  ngOnInit(): void {
  }

  addNewTask(title :string){
    this.api.createTaskInsideATaskList(this.taskListId, title)
      .subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      });

  }
}
