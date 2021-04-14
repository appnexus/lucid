import * as d3Format from 'd3-format';

export function formatAbbreviatedNumber(value: number): string {
	return d3Format.format('.2s')(value).replace('G', 'B');
}

export function formatThousands(value: number): string {
	return d3Format.format(',.0f')(value);
}
