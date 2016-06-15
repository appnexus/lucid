export function onChange(state = {}, index){
	return {
		...state,
		index,
	};
}
