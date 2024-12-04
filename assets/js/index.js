import { generateId } from './helper.js';

let dataJobs = localStorage.getItem('dataJobs');
if (!dataJobs) {
  dataJobs = [];
} else {
  dataJobs = JSON.parse(dataJobs);
  console.log('🚀 ~ dataJobs:', dataJobs);
}

let inputElement = document.querySelector('.todo-input');
let btnAddElement = document.querySelector('.btn-add');
let clearButton = document.querySelector('.btn-clear');
let container = document.querySelector('.todo-list');

let editingId = null;

const checkInputContent = () => {
  if (inputElement.value.trim() !== '') {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }
};

inputElement.addEventListener('input', checkInputContent);

clearButton.addEventListener('click', () => {
  inputElement.value = '';
  checkInputContent();
});

const handleAddJob = () => {
  let value = inputElement.value.trim();
  if (!value) {
    alert('Không được để trống!!!!');
    inputElement.focus();
    return;
  }

  let job = {
    id: generateId(2000),
    title: value,
  };

  dataJobs.push(job);
  handleSaveData();
  handleRender();
  resetForm();
  checkInputContent();
};

const handleUpdateJob = () => {
  let value = inputElement.value.trim();
  if (!value) {
    alert('Không được để trống!!!!');
    inputElement.focus();
    return;
  }

  dataJobs = dataJobs.map((job) =>
    job.id === editingId ? { ...job, title: value } : job
  );

  handleSaveData();
  handleRender();
  resetForm();
};

const resetForm = () => {
  inputElement.value = '';
  editingId = null;
  btnAddElement.textContent = 'Add';
};

const handleEditJob = (event) => {
  let jobId = parseInt(event.target.getAttribute('data-id'));

  const job = dataJobs.find((job) => job.id === jobId);

  if (job) {
    inputElement.value = job.title;
    editingId = job.id;
    btnAddElement.textContent = 'Update';
  }
};

const handleDeleteJob = (event) => {
  let jobId = parseInt(event.target.getAttribute('data-id'));

  dataJobs = dataJobs.filter((job) => job.id !== jobId);

  handleSaveData();
  handleRender();
};

const handleSaveData = () => {
  localStorage.setItem('dataJobs', JSON.stringify(dataJobs));
};

const handleRender = () => {
  container.innerHTML = '';

  dataJobs.forEach((job) => {
    let containerItem = document.createElement('div');
    containerItem.className = 'todo-list-item';
    containerItem.innerHTML = `
      <span>${job.title}</span>
      <button class="btn btn-edit" data-id="${job.id}">Edit</button>
      <button class="btn btn-del" data-id="${job.id}">Del</button>
    `;

    container.prepend(containerItem);
  });

  const editButtons = document.querySelectorAll('.btn-edit');
  editButtons.forEach((btn) => btn.removeEventListener('click', handleEditJob));
  editButtons.forEach((btn) => btn.addEventListener('click', handleEditJob));

  const deleteButtons = document.querySelectorAll('.btn-del');
  deleteButtons.forEach((btn) =>
    btn.removeEventListener('click', handleDeleteJob)
  );
  deleteButtons.forEach((btn) =>
    btn.addEventListener('click', handleDeleteJob)
  );
};

btnAddElement.addEventListener('click', () => {
  if (editingId) {
    handleUpdateJob();
  } else {
    handleAddJob();
  }
});

handleRender();
