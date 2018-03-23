import React from 'react';
import {connect} from 'react-redux';
import { DropTarget } from 'react-dnd';
import types from '../constants';
import Todo from './Todo';
import actions from '../actions';

class List extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.createTodo(this.props.boardId, 
								this.props.list.id, 
								this.input.value);
		this.input.value = '';
		this.input.focus();
	}

	componentWillReceiveProps() {

	}

	render() {
		const list = this.props.list;

		return this.props.connectDropTarget(
			<li className={this.props.isOver ? 'list-elem hovered' : 'list-elem'}>
				<div className='list-elem__title'>{list.name}</div>
				<div className='list-elem__line' />
				<form onSubmit={this.handleSubmit} >
					<input type="text"
							className="list-elem__input" 
							ref={(input) => this.input = input} />
				</form>
				<ul>
					{list.todos.map((todo) => {
						return <Todo key={todo.id} 
									boardId={this.props.boardId}
									listId={list.id}
									switchTodo={this.props.switchTodo} 
									{...todo} 
								/>
					})}
				</ul>
			</li>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		createTodo: (boardId, listId, name) => dispatch(actions.createTodo(boardId, listId, name)),
		switchTodo: (boardId, listId, id) => dispatch(actions.switchTodo(boardId, listId, id)),
		dispatchMoveTodo: (todoId, boardId, listId, targetListId) => dispatch(actions.moveTodo(todoId, boardId, listId, targetListId))
	};
}

const listTarget = {
	drop(props, monitor) {
		const todo = monitor.getItem();
		props.dispatchMoveTodo(todo.id, todo.boardId, todo.listId, props.list.id);
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

List = DropTarget(types.TODO, listTarget, collect)(List);
List = connect(null, mapDispatchToProps)(List);

export default List;

