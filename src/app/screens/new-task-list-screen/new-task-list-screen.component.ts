import  TaskListModel  from 'src/app/models/taskListmodel';
import { TaskService } from './../../task.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task-list-screen',
  templateUrl: './new-task-list-screen.component.html',
  styleUrls: ['./new-task-list-screen.component.scss']
})
export class NewTaskListScreenComponent implements OnInit {

  constructor(
    private router: Router,
    private api: TaskService
  ) { }

  ngOnInit(): void {
  }
  addNewTaskList(title : string){
    if(title){
      this.api.createTaskList(title).subscribe(
        (newlyCreatedTaskList : TaskListModel)=>{
          this.router.navigate(['task-list',newlyCreatedTaskList._id])
        }
      )
    }else{
      alert("Title can not be empty")
      return;
    }
  }
}
