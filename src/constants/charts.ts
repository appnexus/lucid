// NOTE: these needs to stay in sync with variables.less

// Each of these map to a less variable that applies the actual color
export const COLOR_0 = 'color-chart-0';
export const COLOR_0_LIGHTEST = 'color-chart-0-lightest';
export const COLOR_0_LIGHT = 'color-chart-0-light';
export const COLOR_0_DARK = 'color-chart-0-dark';
export const COLOR_0_DARKEST = 'color-chart-0-darkest';
export const COLOR_1 = 'color-chart-1';
export const COLOR_1_LIGHTEST = 'color-chart-1-lightest';
export const COLOR_1_LIGHT = 'color-chart-1-light';
export const COLOR_1_DARK = 'color-chart-1-dark';
export const COLOR_1_DARKEST = 'color-chart-1-darkest';
export const COLOR_2 = 'color-chart-2';
export const COLOR_2_LIGHTEST = 'color-chart-2-lightest';
export const COLOR_2_LIGHT = 'color-chart-2-light';
export const COLOR_2_DARK = 'color-chart-2-dark';
export const COLOR_2_DARKEST = 'color-chart-2-darkest';
export const COLOR_3 = 'color-chart-3';
export const COLOR_3_LIGHTEST = 'color-chart-3-lightest';
export const COLOR_3_LIGHT = 'color-chart-3-light';
export const COLOR_3_DARK = 'color-chart-3-dark';
export const COLOR_3_DARKEST = 'color-chart-3-darkest';
export const COLOR_4 = 'color-chart-4';
export const COLOR_4_LIGHTEST = 'color-chart-4-lightest';
export const COLOR_4_LIGHT = 'color-chart-4-light';
export const COLOR_4_DARK = 'color-chart-4-dark';
export const COLOR_4_DARKEST = 'color-chart-4-darkest';
export const COLOR_5 = 'color-chart-5';
export const COLOR_5_LIGHTEST = 'color-chart-5-lightest';
export const COLOR_5_LIGHT = 'color-chart-5-light';
export const COLOR_5_DARK = 'color-chart-5-dark';
export const COLOR_5_DARKEST = 'color-chart-5-darkest';
export const COLOR_6 = 'color-chart-6';
export const COLOR_6_LIGHTEST = 'color-chart-6-lightest';
export const COLOR_6_LIGHT = 'color-chart-6-light';
export const COLOR_6_DARK = 'color-chart-6-dark';
export const COLOR_6_DARKEST = 'color-chart-6-darkest';
export const COLOR_GOOD = 'color-chart-good';
export const COLOR_GOOD_LIGHTEST = 'color-chart-good-lightest';
export const COLOR_GOOD_LIGHT = 'color-chart-good-light';
export const COLOR_GOOD_DARK = 'color-chart-good-dark';
export const COLOR_GOOD_DARKEST = 'color-chart-good-darkest';
export const COLOR_BAD = 'color-chart-bad';
export const COLOR_BAD_LIGHTEST = 'color-chart-bad-lightest';
export const COLOR_BAD_LIGHT = 'color-chart-bad-light';
export const COLOR_BAD_DARK = 'color-chart-bad-dark';
export const COLOR_BAD_DARKEST = 'color-chart-bad-darkest';
export const COLOR_NEUTRAL = 'color-chart-neutral';

export const PALETTE_6: string[] = [
	COLOR_3,
	COLOR_0_DARKEST,
	COLOR_2,
	COLOR_4_LIGHTEST,
	COLOR_5,
	COLOR_1_LIGHT,
];

// In order to keep the naming scheme correct I'm introducing a new default
// palette that has 7 items while not breaking existing code that uses a 6
// color palette.
export const PALETTE_7: string[] = [
	COLOR_3,
	COLOR_0_DARKEST,
	COLOR_2,
	COLOR_4_LIGHTEST,
	COLOR_5,
	COLOR_1_LIGHT,
	COLOR_6,
];

export const PALETTE_30: string[] = [
	COLOR_0_LIGHTEST,
	COLOR_0_LIGHT,
	COLOR_0,
	COLOR_0_DARK,
	COLOR_0_DARKEST,

	COLOR_1_LIGHTEST,
	COLOR_1_LIGHT,
	COLOR_1,
	COLOR_1_DARK,
	COLOR_1_DARKEST,

	COLOR_2_LIGHTEST,
	COLOR_2_LIGHT,
	COLOR_2,
	COLOR_2_DARK,
	COLOR_2_DARKEST,

	COLOR_3_LIGHTEST,
	COLOR_3_LIGHT,
	COLOR_3,
	COLOR_3_DARK,
	COLOR_3_DARKEST,

	COLOR_4_LIGHTEST,
	COLOR_4_LIGHT,
	COLOR_4,
	COLOR_4_DARK,
	COLOR_4_DARKEST,

	COLOR_5_LIGHTEST,
	COLOR_5_LIGHT,
	COLOR_5,
	COLOR_5_DARK,
	COLOR_5_DARKEST,
];

export const PALETTE_MONOCHROME_GOOD_3: string[] = [
	COLOR_GOOD_LIGHT,
	COLOR_GOOD,
	COLOR_GOOD_DARK,
];

export const PALETTE_MONOCHROME_GOOD_5: string[] = [
	COLOR_GOOD_LIGHTEST,
	COLOR_GOOD_LIGHT,
	COLOR_GOOD,
	COLOR_GOOD_DARK,
	COLOR_GOOD_DARKEST,
];

export const PALETTE_MONOCHROME_BAD_3: string[] = [
	COLOR_BAD_LIGHT,
	COLOR_BAD,
	COLOR_BAD_DARK,
];

export const PALETTE_MONOCHROME_BAD_5: string[] = [
	COLOR_BAD_LIGHTEST,
	COLOR_BAD_LIGHT,
	COLOR_BAD,
	COLOR_BAD_DARK,
	COLOR_BAD_DARKEST,
];

export const PALETTE_MONOCHROME_0_5: string[] = [
	COLOR_0_LIGHTEST,
	COLOR_0_LIGHT,
	COLOR_0,
	COLOR_0_DARK,
	COLOR_0_DARKEST,
];

export const PALETTE_MONOCHROME_1_5: string[] = [
	COLOR_1_LIGHTEST,
	COLOR_1_LIGHT,
	COLOR_1,
	COLOR_1_DARK,
	COLOR_1_DARKEST,
];

export const PALETTE_MONOCHROME_2_5: string[] = [
	COLOR_2_LIGHTEST,
	COLOR_2_LIGHT,
	COLOR_2,
	COLOR_2_DARK,
	COLOR_2_DARKEST,
];

export const PALETTE_MONOCHROME_3_5: string[] = [
	COLOR_3_LIGHTEST,
	COLOR_3_LIGHT,
	COLOR_3,
	COLOR_3_DARK,
	COLOR_3_DARKEST,
];

export const PALETTE_MONOCHROME_4_5: string[] = [
	COLOR_4_LIGHTEST,
	COLOR_4_LIGHT,
	COLOR_4,
	COLOR_4_DARK,
	COLOR_4_DARKEST,
];

export const PALETTE_MONOCHROME_5_5: string[] = [
	COLOR_5_LIGHTEST,
	COLOR_5_LIGHT,
	COLOR_5,
	COLOR_5_DARK,
	COLOR_5_DARKEST,
];

export const PALETTE_MONOCHROME_6_5: string[] = [
	COLOR_6_LIGHTEST,
	COLOR_6_LIGHT,
	COLOR_6,
	COLOR_6_DARK,
	COLOR_6_DARKEST,
];
