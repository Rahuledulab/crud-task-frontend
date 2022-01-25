import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import TaskListModel from 'src/app/models/taskListmodel';
import TaskModel from 'src/app/models/taskModel';
import {TaskService} from '../../task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  taskLists :TaskListModel[]=[];
  // newTaskList: [];
  tasks: TaskModel[] =[];
  taskListId: string = '';

  constructor(private api: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // debugger;
    console.log("oninit")

    this.api.getAllTaskLists().subscribe(allTaskLists =>{
      this.taskLists=allTaskLists;
      // console.log(" this.taskLists==>"+this.taskLists[0]['_id'])
      // this.router.navigate(['task-list',this.taskLists[0]['_id']])
      // console.log("user"+JSON.stringify(this.router.navigate(['task-list',this.taskLists[0]['_id']])))
    })

    this.activatedRoute.params.subscribe(
      (params: Params)=>{
        // console.log("params==>"+JSON.stringify(params))
         this.taskListId = params.taskListid;
        //  console.log("id==>"+this.taskListId)
        if(this.taskListId){
          this.api.getAllTasksForATaskList(this.taskListId).subscribe(
            (tasks: TaskModel[])=>{ this.tasks = tasks
              // console.log("this.tasks==>"+JSON.stringify(this.tasks))
            }
          )
        }
      }
    )
  }

  taskClicked(task : TaskModel){
    console.log(task)
    this.api.updateTaskStatus(this.taskListId,task).subscribe(()=>{
      task.completed =!task.completed
      console.log("task.completed =>"+task.completed )
    })
  }

  deleteTask(task :TaskModel){
    console.log("selectedtask===>"+JSON.stringify(task))
    this.api.deleteAtaskInsideATaskList(this.taskListId,task._id)
    .subscribe((taskDeleted: TaskModel)=>{
      this.tasks = this.tasks.filter(t=> t._id != taskDeleted._id);
    });   
  }

  deleteTaskList(taskListClicked: TaskListModel){
    console.log("insdie funcation===>")
    this.api.deleteTaskList(taskListClicked._id)
    .subscribe(()=>{
      console.log("api callled funcation===>")
      this.taskLists = this.taskLists.filter(tL => tL._id != taskListClicked._id)
    })
  }

  addnewTaks(){
    if(this.taskListId){
      this.router.navigate(['./new-task'],{relativeTo: this.activatedRoute})

    }else{
      alert("please select tasklist");
      return;
    }
  }
}
