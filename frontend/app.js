const apiUrl = 'http://localhost:5000/api/tasks';

// get the token stored in localStorage
const token = localStorage.getItem('token');

// header authentication token config
const axiosInstance = axios.create({
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
const taskList = document.getElementById('taskList');
const showAllButton = document.getElementById('showAll');

// show tasks function
const renderTasks = async (status = '') => {
    try {
        let url = apiUrl;
        if (status) {
            url = `${apiUrl}?completed=${status}`;
        }

        const response = await axiosInstance.get(url);
        const tasks = response.data;

        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between');
            li.innerHTML = `
                ${task.title} 
                <button class="btn btn-success btn-sm" onclick="toggleTaskStatus('${task.id}', ${task.completed})">${task.completed ? 'Concluída' : 'Marcar como Concluída'}</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask('${task.id}')">Excluir</button>
            `;
            taskList.appendChild(li);
        });
    } catch (error) {
        alert('Error loading tasks or invalid token!');
        window.location.href = 'login.html';
    }
};

// new task
document.getElementById('addTaskBtn').addEventListener('click', async () => {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() === '') {
        alert('Enter task title!');
        return;
    }
    try {
        await axios.post(apiUrl, { title: taskInput.value });
        taskInput.value = '';
        renderTasks();
    } catch (error) {
        alert('Error creating task.');
    }
});

// mark as completed
const toggleTaskStatus = async (id, completed) => {
    try {
        await axios.put(`${apiUrl}/${id}`, { completed: !completed });
        renderTasks();
    } catch (error) {
        alert('Error updating task status.');
    }
};

// delete task
const deleteTask = async (id) => {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        renderTasks();
    } catch (error) {
        alert('Error deleting task.');
    }
};

// Filters
document.getElementById('showAll').addEventListener('click', () => renderTasks());
document.getElementById('showCompleted').addEventListener('click', () => renderTasks(true));
document.getElementById('showPending').addEventListener('click', () => renderTasks(false));