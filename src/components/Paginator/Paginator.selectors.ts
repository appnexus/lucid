import _ from 'lodash';

export function totalPagesSelector({
	pageSizeOptions,
	selectedPageSizeIndex,
	totalCount,
	totalPages,
}: {
	pageSizeOptions: number[];
	selectedPageSizeIndex: number;
	totalCount: number;
	totalPages: number;
}) {
	const pageSize = pageSizeOptions[selectedPageSizeIndex];
	return _.isNumber(totalPages)
		? totalPages
		: totalCount <= pageSize
		? 1
		: Math.floor(totalCount / pageSize) + _.clamp(totalCount % pageSize, 0, 1);
}

export default {
	totalPages: totalPagesSelector,
};
