import React from 'react';
import {connect} from 'react-redux';

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
					<input type="submit" />
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
		startCreatingList: function() {
			dispatch({type: 'START_CREATING_LIST'});
		},

		closeListCreator: function() {
			dispatch({type: 'CLOSE_LIST_CREATOR'});
		},

		createList: function(name, boardId) {
			dispatch({
				type: 'CREATE_LIST',
				boardId,
				name
			});
		}
	};
}

AddList = connect(mapStateToProps, mapDispatchToProps)(AddList);

export default AddList;