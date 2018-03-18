import React from 'react';
import {connect} from 'react-redux';
import List from './List';
import AddList from './AddList';

class Lists extends React.Component {

	render() {
		const board = this.props.board;

		return (
			<div className="list__container">
				<div className='board__title text-shadow'>{board.name}</div>
				<ul>
					{board.lists.map((list) => {
					return <List key={list.id} 
									boardId={board.id} 
									list={list} />
					})}
					<AddList boardId={board.id}/>
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	for (let i = 0; i < state.boards.length; i++) {
		let board = state.boards[i];
		if (board.isDisplaying) {
			return { board };
		}
	}
}

const DisplayLists = connect(mapStateToProps)(Lists);

export default DisplayLists;