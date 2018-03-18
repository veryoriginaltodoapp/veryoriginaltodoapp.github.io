import React from 'react';
import {connect} from 'react-redux';

class Logo extends React.Component {

	render() {
		return (
			<button className="app-logo" 
					title="home"
					onClick={() => this.props.onClick()} >
				<svg className="app-logo__img" />
			</button>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onClick: function() {
			dispatch({type: 'DISPLAY_HOMEPAGE'});
		}
	};
}

Logo = connect(function(state){return{dis: state.displaying}}, mapDispatchToProps)(Logo);

export default Logo;