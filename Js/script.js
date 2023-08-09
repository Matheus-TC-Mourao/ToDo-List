// Declarando Variáveis
let todoForm = document.querySelector('#todo-form');
let todoInput = document.querySelector('#todo-input');
let addBtn = document.querySelector('#add-btn');
let todoList = document.querySelector('.todo-list');
const editForm = document.querySelector('.edit-form');
const toolBar = document.querySelector('#toolbar');
const editCancelBtn = document.querySelector('#cancel-edit-btn');
let editInput = document.querySelector('#edit-input');
const searchInput = document.querySelector('#search-input');
const itemList = document.querySelector('.item-list');

let oldInputValue;

// Funções

let saveTodo = (text) => {
	let newItem = `<div class="item-list">
	<div id="item" class="todo-item">${text}</div>

	<button class="check-item">
		<i class="fa-solid fa-check"></i>
	</button>
	<button class="edit-item">
		<i class="fa-solid fa-pen"></i>
	</button>
	<button class="delete-item">
		<i class="fa-solid fa-trash"></i>
	</button>
</div>`;

	todoList.innerHTML += newItem;
	todoInput.value = '';
	todoInput.focus();
};

const toggleForms = () => {
	editForm.classList.toggle('hide');
	todoForm.classList.toggle('hide');
	todoList.classList.toggle('hide');
};

const updateTodo = (editInput) => {
	const todo = document.querySelector('#item');

	let todoTitle = todo;

	if (todoTitle.innerText === oldInputValue) {
		todoTitle.innerText = editInput;
	}
};

// Eventos
todoForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const inputValue = todoInput.value;

	if (inputValue) {
		saveTodo(inputValue);
	}
});

document.addEventListener('click', (e) => {
	const targetEl = e.target;
	const parentEl = targetEl.closest('div');

	let todoTitle;

	if (parentEl && parentEl.querySelector('div')) {
		todoTitle = parentEl.querySelector('div').innerText;
	}

	if (targetEl.classList.contains('check-item')) {
		parentEl.classList.toggle('item-done');
		targetEl.classList.toggle('task-done');
	}

	if (targetEl.classList.contains('delete-item')) {
		parentEl.remove();
	}

	if (targetEl.classList.contains('edit-item')) {
		toggleForms();

		editInput.value = todoTitle;
		editInput.focus();
		oldInputValue = todoTitle;
	}
});

editCancelBtn.addEventListener('click', (e) => {
	e.preventDefault();

	toggleForms();
});

editForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let editInputValue = editInput.value;
	if (editInputValue) {
		updateTodo(editInputValue);
	}
	toggleForms();
});
