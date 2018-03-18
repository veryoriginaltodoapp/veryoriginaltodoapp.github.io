import React from 'react';
import {connect} from 'react-redux';


class BoardCreator extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.createBoard(this.input.value);
		this.input.value = '';
	}

	render() {
		if (this.props.isCreating !== 'board') {
			return (
				<li className="board__elem board-elem__link text-shadow"
					onClick={this.props.startCreatingBoard}>
						Create a new board...
				</li>
			);
		}

		return (
			<li className="board-creator board__elem" >
				<div className="board-creator__header">
					<h3 className="board-creator__title text-shadow">
						Creating a board
					</h3>
					<button className="board-creator__close" 
							onClick={this.props.closeBoardCreator}>
					</button>
				</div>
				<div className="board-creator__content">
					<span className="board-creator__text text-shadow">What shall we call the board?</span>
					<form onSubmit={this.handleSubmit} >
						<input type="text" 
								className="board-creator__input" 
								ref={input => this.input = input} />
						<input type="reset" 
								value="CANCEL"
								className="board-creator__button" 
								onClick={this.props.closeBoardCreator} />
						<input type="submit" 
								value="CREATE"
								className="board-creator__button" 
								onClick={this.handleSubmit} />
					</form>
				</div>
			</li>
		);
	}
};




function mapStateToProps(state) {
	return { isCreating: state.isCreating }
}

function mapDispatchToProps(dispatch) {
	return {
		startCreatingBoard: function() {
			dispatch({type: 'START_CREATING_BOARD'})
		},
		closeBoardCreator: function() {
			dispatch({type: 'CLOSE_BOARD_CREATOR'})
		},
		createBoard: function(name) {
			if (name !== '') {
				dispatch({
					type: 'CREATE_BOARD',
					name
				});
			}
		}
	}
}


const DisplayBoardCreator = connect(mapStateToProps, mapDispatchToProps)(BoardCreator);

export default DisplayBoardCreator;