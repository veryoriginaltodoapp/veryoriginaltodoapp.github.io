const actions = {
	displayHomepage() {
		return {type: 'DISPLAY_HOMEPAGE'};
	},

	displayBoard() {
		return {type: 'DISPLAY_BOARD'};
	},

	updateDisplayedBoard(boardId) {
		return {
			type: 'UPDATE_DISPLAYED_BOARD',
			boardId
		};
	},

	startCreatingBoard() {
		return {type: 'START_CREATING_BOARD'};
	},

	closeBoardCreator() {
		return {type: 'CLOSE_BOARD_CREATOR'};
	},

	createBoard(name) {
		return {
			type: 'CREATE_BOARD',
			name
		};
	},

	startCreatingList() {
		return {type: 'START_CREATING_LIST'};
	},

	closeListCreator() {
		return {type: 'CLOSE_LIST_CREATOR'};
	},

	createList(name, boardId) {
		return {
			type: 'CREATE_LIST',
			name,
			boardId
		};
	},

	createTodo(boardId, listId, name) {
		return {
			type: 'CREATE_TODO',
			boardId,
			listId,
			name
		};
	},

	switchTodo(boardId, listId, id) {
		return {
			type: 'SWITCH_TODO',
			boardId,
			listId,
			id
		};
	},

	moveTodo(todoId, boardId, listId, targetListId) {
		return {
			type: 'MOVE_TODO',
			todoId, 
			boardId,
			listId, 
			targetListId
		};
	}
}

export default actions;