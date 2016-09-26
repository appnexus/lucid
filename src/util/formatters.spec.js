import assert from 'assert';
import {
	formatAbbreviatedNumber,
	formatNumberNoDecimal,
} from './formatters';

describe('formatters', () => {
    describe('formatAbbreviatedNumber', () => {
        it('should abbreviate large numbers', () => {
            const value = 4230872156;
            assert.equal(formatAbbreviatedNumber(value), '4.2B');
        })
    });

    describe('formatNumberNoDecimal', () => {
        it('should format numbers without decimals', () => {
            const value = 1400.65;
            assert.equal(formatNumberNoDecimal(value), '1401');
        });
    });
});
