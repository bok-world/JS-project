// document.addEventListener("DOMContentLoaded",function(){
(function(){
    'use strict';
    var tasker = {
      init: function(){
        this.cacheDom();
        this.bindEvents();
        this.evalTasklist();
      },
      cacheDom: function(){
        this.taskInput = document.getElementById("input-task");
        this.addBtn = document.getElementById("add-task-btn");
        this.tasklist = document.getElementById("tasks");
        this.tasklistChildren = this.tasklist.children; 
        this.errorMessage = document.getElementById("error");
      },
      bindEvents : function(){
        this.addBtn.onclick = this.addTask.bind(this);
        this.taskInput.onkeypress = this.enterKey.bind(this);
      },
      evalTasklist: function(){
        var i, chkBox, delBtn;
        for(i = 0; i<this.tasklistChildren.length; i+=1){
          chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
          chkBox.onclick = this.completeTask.bind(this, this.tasklistChildren[i], chkBox);
  
          delBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
          delBtn.onclick = this.delTask.bind(this,i);
        }
      },
      render : function(){
        var taskLi, taskChkbk, taskVal, taskBtn, taskTrash;
        // build HTMl
        taskLi = document.createElement("li");
        taskLi.setAttribute("class","task");
        // chkeckbox
        taskChkbk = document.createElement("input");
        taskChkbk.setAttribute("type", "checkbox");
        // user task
        taskVal = document.createTextNode(this.taskInput.value);
        // del button
        taskBtn = document.createElement("button");
        // trash icon
        taskTrash = document.createElement("i");
        taskTrash.setAttribute("class","fa fa-trash");
        taskTrash.textContent = '-' 
        console.log(taskTrash.textContent)
        // insert trash can into button
        taskBtn.appendChild(taskTrash);
  
  
        // append elements to taskLi
        taskLi.appendChild(taskChkbk);
        taskLi.appendChild(taskVal);
        taskLi.appendChild(taskBtn);
  
        // add task to task list
        this.tasklist.appendChild(taskLi);
  
      },
      completeTask: function(i, chkBox){
        if(chkBox.checked){
          i.className = "task completed";
        }else{
          this.incompleteTask(i);
        }
      },
      incompleteTask: function(i){
        i.className = "task";
      },
      enterKey: function(event){
        if(event.keyCode ===13  || event.which === 13){
          this.addTask();
        }
      },
      addTask: function(){
        var value = this.taskInput.value;
        this.errorMessage.style.display = "none";
  
        if(value ===""){
          this.error();
        } else{
          this.render();
          this.taskInput.value ="";
          this.evalTasklist();
        }
      },
      delTask : function(i){
        this.tasklist.children[i].remove();
        this.evalTasklist();
      },
      error: function(){
        this.errorMessage.style.display = "block";
      }
  
    };
  
    tasker.init();
  
  }());
// }());
// })