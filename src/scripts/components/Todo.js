import React from 'react';
import { DragSource } from 'react-dnd';
import types from '../constants';

class Todo extends React.Component {

	render() {
		const { switchTodo, boardId, listId, id, isDragging, connectDragSource } = this.props;

		const checked = this.props.checked ? 'checked' : '';
		const dragging = isDragging ? 'dragging' : '';
		const todoClass = `todo-elem ${checked} ${dragging}`;

		return connectDragSource(
			<li className={todoClass}>
				<span className="todo-elem__title">
					{this.props.name}
				</span>
				<span className="todo-elem__checkbox"
						onClick={() => switchTodo(boardId, listId, id)}>
					✓
				</span>
			</li>
		);
	}
}

const todoSource = {
	beginDrag(props) {
		const item = {
			boardId: props.boardId,
			listId: props.listId,
			id: props.id
		};
		return item;
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

export default DragSource(types.TODO, todoSource, collect)(Todo);