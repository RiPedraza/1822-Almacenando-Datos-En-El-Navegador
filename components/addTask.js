import { uniqueDates } from '../services/date.js';
import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTask.js';

export const  addTask = (evento) => {
  evento.preventDefault();
  
  const list = document.querySelector('[data-list]');
  const input = document.querySelector('[data-form-input]');
  const calendar = document.querySelector("[data-form-date]");

  const value = input.value;
  const date = calendar.value;
  const dateFormat = moment(date).format("DD/MM/YYYY");

  if(value === "" || date === ""){
    return; 
  }

  input.value = ''; //vaciamos los campos despues de pulsar el boton
  calendar.value = ''; //vaciamos los campos despues de pulsar el boton
  
  const complete = false;

  const taskObj = {
    value,
    dateFormat,
    complete,
    id: uuid.v4()
  };

  list.innerHTML = '';

  const taskList = JSON.parse(localStorage.getItem('tasks')) || []; //Colocamos la doble barra vertical || (pleca), para establecer un valor por defecto en caso de que el primer argumento de "null", esto es para evitar un error al usar el metodo push más abajo. En Alura le dicen  pipe ||
  taskList.push(taskObj); 
  localStorage.setItem('tasks', JSON.stringify(taskList));
  
  displayTasks();
};
  
export const createTask = ({value,dateFormat,complete, id}) => {
  const task = document.createElement('li');
  task.classList.add('card');

  const taskContent = document.createElement('div');
  
  const check = checkComplete(id);

  if(complete){
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
  }

  const titleTask = document.createElement('span');
  titleTask.classList.add('task');
  titleTask.innerText = value;
  taskContent.appendChild(check);
  taskContent.appendChild(titleTask);

  const dateElement = document.createElement("span");
  dateElement.innerHTML = dateFormat;

  task.appendChild(taskContent);
  task.appendChild(dateElement);
  task.appendChild(deleteIcon(id));
  return task;
};