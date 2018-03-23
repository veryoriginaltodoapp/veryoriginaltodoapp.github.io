// state = {
//		displaying: 'BOARDS' || 'LISTS',
// 		isCreating: 'board' || 'list' || false,
// 		boards: [{
// 				name: string,
//				isDisplaying: boolean,
//				id: number,
// 				lists: [{
// 					name: string,
//					id: number,
// 					todos: [{
// 						name: string,
//						id: number,
// 						checked: boolean,
//						isDragging: boolean
// 					}]
// 				}]
// 		],
// }

import {combineReducers} from 'redux';

const ls = localStorage;
let idCounter;

(function() {
	idCounter = +ls.getItem('idCounter') || 0;
})();

function displaying(state = 'BOARDS', action) {
	switch (action.type) {
		case 'DISPLAY_HOMEPAGE':
			return 'BOARDS';

		case 'DISPLAY_BOARD':
			return 'LISTS';

		default:
			return state;
	}
}


function isCreating(state = false, action) {
	switch (action.type) {
		case 'START_CREATING_BOARD':
			return 'board';

		case 'START_CREATING_LIST':
			return 'list';

		case 'CLOSE_BOARD_CREATOR':
		case 'CLOSE_LIST_CREATOR':
			return false;
			
		default:
			return state;
	}
}



function boards(state = JSON.parse(ls.getItem('boards')) || [], action) {
	
	let newBoard,
		newState;

	switch (action.type) {
		case 'CREATE_BOARD':
			newBoard = {
				name: action.name,
				isDisplaying: false,
				id: idCounter++,
				lists: []
			}
			ls.setItem('idCounter', idCounter);

			newState = [...state, newBoard];
			ls.setItem('boards', JSON.stringify(newState));
			return newState;

		case 'UPDATE_DISPLAYED_BOARD':
			return state.map((board) => {
				if (board.id === action.boardId) board.isDisplaying = true;
				if (board.id !== action.boardId) board.isDisplaying = false;
				return board;
			});

		case 'CREATE_LIST':
		case 'CREATE_TODO':
		case 'SWITCH_TODO':
		case 'MOVE_TODO':
			newState = createNewBoard(state, action);
			ls.setItem('boards', JSON.stringify(newState));
			return newState;

		case 'PREPARE_DRAGGING':
		case 'FINISH_DRAGGING':
			return createNewBoard(state, action);

		default:
			return state;
	}
}



function lists(state = [], action) {
	let newList,
		newState;

	switch (action.type) {
		case 'CREATE_LIST':
			newList = {
				name: action.name,
				id: idCounter++,
				todos: []
			};
			ls.setItem('idCounter', idCounter);

			return [...state, newList];

		case 'CREATE_TODO':
		case 'SWITCH_TODO':
			return createNewList(state, action);

		case 'MOVE_TODO':
			const { item: fromList, index: fromListIndex } = findById(state, action.listId);
			const { item: toList, index: toListIndex } = findById(state, action.targetListId);
			const { item: todo, index: todoIndex } = findById(fromList.todos, action.todoId);

			let newFromList, newToList;

			if (action.listId === action.targetListId) {
				fromList.todos.splice(todoIndex, 1);
				newFromList = {
					name: fromList.name,
					id: fromList.id,
					todos: [...fromList.todos, todo]
				}

				return [...state.slice(0, fromListIndex), newFromList, ...state.slice(fromListIndex + 1)];
			}

			newFromList = {
				name: fromList.name,
				id: fromList.id,
				todos: fromList.todos.filter((todo) => todo.id !== action.todoId)
			};

			newToList = {
				name: toList.name,
				id: toList.id,
				todos: [...toList.todos, todo]
			};

			//ls.setItem('idCounter', idCounter);

			newState = [...state];
			newState.splice(fromListIndex, 1, newFromList);
			newState.splice(toListIndex, 1, newToList);

			console.log(newState);

			return newState;

		default: 
			return state;
	}
}



function todos(state = [], action) {
	let newTodo,
		currentTodo;

	switch (action.type) {
		case 'CREATE_TODO':
			newTodo = {
				name: action.name,
				id: idCounter++,
				checked: false
			}
			ls.setItem('idCounter', idCounter);

			return [...state, newTodo];

		case 'SWITCH_TODO':
			currentTodo = findById(state, action.id).item;
			return createNewTodo(state, action.id, !currentTodo.checked, currentTodo.isDragging);

		case 'START_DRAGGING':
			currentTodo = findById(state, action.id).item;
			return createNewTodo(state, action.id, currentTodo.checked, true);

		case 'FINISH_DRAGGING':
			currentTodo = findById(state, action.id).item;
			return createNewTodo(state, action.id, currentTodo.checked, false);

		default:
			return state;
	}
}



//////////////////////////////////////////
//////////   helper functions   //////////
//////////////////////////////////////////

function findById(items, id) {
	for (let i = 0; i < items.length; i++) {
		if (items[i].id === id) {
			return {
				item: items[i],
				index: i
			};
		}
	}
}

function createNewBoard(boards, action) {
	let {item: currentBoard, index} = findById(boards, action.boardId);
	boards.forEach(board => board.isDisplaying = false);

	const newLists = lists(currentBoard.lists, action);

	const newBoard = {
		name: currentBoard.name,
		id: idCounter++,
		isDisplaying: true,
		lists: newLists
	};

	ls.setItem('idCounter', idCounter);

	return [...boards.slice(0, index),
			newBoard,
			...boards.slice(index + 1)];
}

function createNewList(lists, action) {
	let {item: currentList, index} = findById(lists, action.listId);
	const newTodos = todos(currentList.todos, action);

	const newList = {
		name: currentList.name,
		id: idCounter++,
		todos: newTodos
	};
	ls.setItem('idCounter', idCounter);

	return [...lists.slice(0, index),
			newList,
			...lists.slice(index + 1)];
}

function createNewTodo(todos, id, checked, isDragging) {
	let {item: currentTodo, index} = findById(todos, id);
	const newTodo = {
		name: currentTodo.name,
		id: idCounter++,
		checked,
		isDragging
	};

	ls.setItem('idCounter', idCounter);

	return [...todos.slice(0, index),
			newTodo,
			...todos.slice(index + 1)];
}


const reducer = combineReducers({ displaying, isCreating, boards });
export default reducer;