import React from 'react';
import DisplayBoardCreator from './DisplayBoardCreator';
import Board from './Board';
import {connect} from 'react-redux';
import actions from '../actions';

class Boards extends React.Component {

	render() {
		const boards = this.props.boards;

		return (
			<ul className="board__container">
				<DisplayBoardCreator />
				{boards.map((board) => {
					return <Board key={board.id} board={board} handleClick={this.props.handleClick} />
				})}
			</ul>
		);
	}
};

function mapStateToProps(state) {
	return {
		boards: state.boards
	};
}

function mapDispatchToProps(dispatch) {
	return {
		handleClick: (boardId) => {
			dispatch(actions.displayBoard());
			dispatch(actions.updateDisplayedBoard(boardId));
		}
	};
}

const DisplayBoards = connect(mapStateToProps, mapDispatchToProps)(Boards);

export default DisplayBoards;