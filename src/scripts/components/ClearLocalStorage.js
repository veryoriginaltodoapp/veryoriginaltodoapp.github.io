import React from 'react';

export default class ClearLocalStorage extends React.Component {

	render() {
		return (
			<button className="ls-clear"	
					onClick={() => {
						localStorage.removeItem('boards');
						localStorage.removeItem('idCounter');
					}} >
					clear localStorage
			</button>
		);
	}
}