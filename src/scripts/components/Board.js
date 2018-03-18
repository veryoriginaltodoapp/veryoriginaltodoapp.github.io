import React from 'react';

export default class Board extends React.Component {
	render() {
		const board = this.props.board;
		return (
			<li className="board__elem" 
				onClick={() => {this.props.handleClick(board.id)}}>
				{board.name}
			</li>
		);
	}
};