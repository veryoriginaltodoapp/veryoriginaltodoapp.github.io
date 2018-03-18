import React from 'react';
import {connect} from 'react-redux';
import Todo from './Todo';

class List extends React.Component {

	render() {
		const list = this.props.list;

		return (
			<li className='list-elem'>
				<div className='list-elem__title'>{list.name}</div>
				<div className='list-elem__line' />
				<form onSubmit={(e) => {
					e.preventDefault();
					this.props.handleSubmit(this.props.boardId, 
											list.id, 
											this.input.value);
					this.input.value = '';
				}} >
					<input type="text"
							className="list-elem__input" 
							ref={(input) => this.input = input} />
				</form>
				<ul>
					{list.todos.map((todo) => {
						return <Todo key={todo.id} 
									boardId={this.props.boardId}
									listId={list.id}
									handleTodoClick={this.props.handleTodoClick} 
									handleTodoMouseDown={this.props.handleTodoMouseDown}
									handleTodoMouseUp={this.props.handleTodoMouseUp}
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
		handleSubmit: function(boardId, listId, name) {
			dispatch({
				type: 'CREATE_TODO',
				boardId,
				listId,
				name
			});
		},

		handleTodoClick: function(boardId, listId, id) {
			dispatch({
				type: 'TODO_CLICKED',
				boardId,
				listId,
				id
			});
		},

		handleTodoMouseDown: function(boardId, listId, id) {
			dispatch({
				type: 'START_DRAGGING',
				boardId,
				listId,
				id,
			});
		},

		handleTodoMouseUp: function(boardId, listId, id) {
			dispatch({
				type: 'FINISH_DRAGGING',
				boardId,
				listId,
				id
			});
		}
	};
}

export default connect(null, mapDispatchToProps)(List);

