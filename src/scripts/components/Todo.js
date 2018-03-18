import React from 'react';

export default class Todo extends React.Component {
	constructor(props) {
		super(props);

		this.onMouseDown = this.onMouseDown.bind(this);
	}

	// createAvatar() {

	// }

	onMouseDown(e) {
		const t = e.target.closest('.todo-elem');

		const shiftX = e.clientX + window.pageXOffset - t.getBoundingClientRect().left;
		const x = window.pageXOffset + t.getBoundingClientRect().left + shiftX;

		const shiftY = e.clientY + window.pageYOffset - t.getBoundingClientRect().top;
		const y = window.pageYOffset + t.getBoundingClientRect().top + shiftY;

		this.props.handleTodoMouseDown(this.props.boardId, this.props.listId, this.props.id);
		const self = this;

		document.onmousemove = function(e) {
			const moveX = e.pageX - x;
			const moveY = e.pageY - y;

			if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
				return;
			}

			self.todo.classList.add('dragging');

			self.todo.style.left = e.pageX + 'px';
			self.todo.style.top = e.pageY + 'px';
		}

		document.onmouseup = function(e) {
			self.props.handleTodoMouseUp(self.props.boardId, self.props.listId, self.props.id);
		}
	}

	render() {
		const checked = this.props.checked ? 'checked' : '';
		const dragging = this.props.isDragging ? 'dragging' : '';
		const todoClass = `todo-elem ${checked} ${dragging}`;

		return (
			<li className={todoClass}
				ref={(todo) => this.todo = todo }
				onMouseDown={this.onMouseDown} >
				<span className="todo-elem__title">
					{this.props.name}
				</span>
				<span className="todo-elem__checkbox"
						onClick={() => this.props.handleTodoClick(this.props.boardId, 
																  this.props.listId, 
																  this.props.id)}>
					✓
				</span>
			</li>
		);
	}
}