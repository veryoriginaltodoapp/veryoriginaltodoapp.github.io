import React from 'react';
import DisplayBoardCreator from './DisplayBoardCreator';
import Board from './Board';
import {connect} from 'react-redux';

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
		handleClick: function(boardId) {
			dispatch({
				type: "DISPLAY_BOARD",
			});
			dispatch({
				type: "UPDATE_DISPLAYED_BOARD",
				boardId
			});
		}
	};
}

const DisplayBoards = connect(mapStateToProps, mapDispatchToProps)(Boards);

export default DisplayBoards;