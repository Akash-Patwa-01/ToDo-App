
document.addEventListener("DOMContentLoaded", () => {
	const storedTasks = JSON.parse(localStorage.getItem('tasks'));

	if (storedTasks) {
		storedTasks.forEach((task)=> tasks.push(task));
		updateTasksList();
		updateStats();

	}
})


let tasks = [];

const saveTasks = () => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
	const taskInput = document.getElementById("taskInput");
	const text = taskInput.value.trim();

	if (text) {
		tasks.push({ text, completed: false });
		taskInput.value = "";
		updateTasksList();
		updateStats();
		saveTasks();
	}
};



const editTask = (index) => {
	const taskInput = document.getElementById("taskInput");
	taskInput.value = tasks[index].text;

	tasks.splice(index, 1);
	updateTasksList();
	saveTasks();
};

const updateStats = () => {
	const completeTasks = tasks.filter(task => task.completed).length;
	const totalTasks = tasks.length
	const progress = (completeTasks / totalTasks) * 100;
	const progressBar = document.getElementById('progress');

	progressBar.style.width = `${progress}%` ;

	document.getElementById(
		"number"
	).innerText = `${completeTasks} / ${totalTasks}`;

	if(tasks.length && completeTasks === totalTasks){
		blaskConfetti();
	}


};



const updateTasksList = () => {
	const taskList = document.querySelector(".task-list"); // Fixed incorrect ID reference
	taskList.innerHTML = "";

	tasks.forEach((task, index) => {
		const listItem = document.createElement("li");

		listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" data-index="${index}" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="editTask(${index})" />
                    <img src="./img/bin.png" class="delete" data-index="${index}" />
                </div>
            </div>
        `;

		taskList.appendChild(listItem);
	});

	// Add event listeners for checkboxes and delete buttons
	document.querySelectorAll(".checkbox").forEach((checkbox) => {
		checkbox.addEventListener("change", (e) => {
			toggleTaskComplete(e.target.dataset.index);
		});
	});

	document.querySelectorAll(".delete").forEach((deleteBtn) => {
		deleteBtn.addEventListener("click", (e) => {
			deleteTask(e.target.dataset.index);
		});
	});
};

const toggleTaskComplete = (index) => {
	tasks[index].completed = !tasks[index].completed;
	updateTasksList();
	updateStats();
	saveTasks();
};

const deleteTask = (index) => {
	tasks.splice(index, 1);
	updateTasksList();
	updateStats();
	saveTasks();
};

// Event listener for adding tasks
document.getElementById("newTask").addEventListener("click", function (e) {
	e.preventDefault();
	addTask();
});

const blaskConfetti = ()=> { 
	const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
