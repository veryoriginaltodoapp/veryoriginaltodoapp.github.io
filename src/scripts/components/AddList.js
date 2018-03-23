import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';

class AddList extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const value = this.input.value;
		if (value === '') return;
		this.input.value = '';
		this.props.createList(value, this.props.boardId);
		this.input.focus();
	}

	render() {

		if (this.props.isCreating !== 'list') {
			return (
				<li className='list-creator__link'
						onClick={this.props.startCreatingList}>
						Add a list...
				</li>
			);
		}

		return (
			<li className="list-creator">
				<div className="list-creator__close"
						onClick={this.props.closeListCreator}></div>
				<form name="list-creator-form" 
						onSubmit={this.handleSubmit}>
					<input type="text" 
							className="list-creator__input"
							placeholder="add a list"
							ref={(input) => this.input = input} />
				</form>
			</li>
		);
	}
}



function mapStateToProps(state) {
	return {
		isCreating: state.isCreating
	};
}

function mapDispatchToProps(dispatch) {
	return {
		startCreatingList: () => dispatch(actions.startCreatingList()),
		closeListCreator: () => dispatch(actions.closeListCreator()),
		createList: (name, boardId) => dispatch(actions.createList(name, boardId))
	};
}

AddList = connect(mapStateToProps, mapDispatchToProps)(AddList);

export default AddList;