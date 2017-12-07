function loadTasks() {
    fetch('http://localhost:3000/tasks')
    .then(function(response) {
      return response.json();
    })
    .then(function(tasks) {
      var html = '';
      for (var i = 0, len = tasks.length; i < len; i++) {
        var task = tasks[i];
        var destroyButton = '<button type="button" class="btn btn-outline-danger" onclick="destroyTask(\'' + task._id + '\')">Видалити задачу</button>';
        html += '<li class="list-group-item" ><p class="lead">' + tasks[i].name + '</p>' + destroyButton + '</li>';
      }
      document.getElementById('tasks').innerHTML = html;
    });
  };
  
  
  function destroyTask(id) {
    fetch('http://localhost:3000/tasks/' + id, {
      method: 'delete'
    })
    .then(loadTasks());
  }
  
  function createTask() {
    var taskName = document.getElementById('new_task_name').value;
    fetch('http://localhost:3000/tasks', 
      {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: taskName})
      })
    .then(loadTasks());
  
    return false;
  };
  
  loadTasks();
