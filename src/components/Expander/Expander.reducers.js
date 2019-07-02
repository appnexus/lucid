export const initialState = {
	isExpanded: false
};

export function reducer(state, action) {
	switch (action.type) {
		case actions.toggleIsExpanded:
			return {isExpanded: !state.isExpanded};
		default:
			throw new Error();
	}
}

export const mapDispatchToProps = (dispatch, props) => {
	return {
		onToggle: () => dispatch({type: actions.toggleIsExpanded, props})
	};
};

const actions = {
	toggleIsExpanded: 'toggleIsExpanded',
};
