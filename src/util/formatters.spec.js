import assert from 'assert';
import {
	formatAbbreviatedNumber,
	formatThousands,
} from './formatters';

describe('formatters', () => {
    describe('formatAbbreviatedNumber', () => {
        it('should abbreviate large numbers', () => {
            const value = 4230872156;
            assert.equal(formatAbbreviatedNumber(value), '4.2B');
        })
    });

    describe('formatNumberNoDecimal', () => {
        it('should format large numbers by placing thousands separators ', () => {
            const value = 1400;
            assert.equal(formatThousands(value), '1,400');
        });
    });
});
