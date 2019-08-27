import _ from 'lodash';
import React from 'react';
import { Button, CheckIcon } from '../../../index';

const kinds = [undefined, 'primary', 'link', 'danger', 'invisible'];
const sizes = [undefined, 'small', 'short', 'large'];

export default () => (
	<div
		style={{
			display: 'grid',
			gridGap: '10px',
			gridTemplateColumns: `repeat(${kinds.length}, auto)`,
			justifyItems: 'start',
			alignItems: 'center',
			gridAutoFlow: 'column',
		}}
	>
		{_.map(sizes, (size, sizeIndex) =>
			_.map(kinds, kind => (
				<React.Fragment key={`${size}-${kind}`}>
					<Button style={{ gridColumn: sizeIndex + 1 }} size={size} kind={kind}>
						{size ? size : 'standard'} {kind}
					</Button>
					<Button style={{ gridColumn: sizeIndex + 1 }} size={size} kind={kind}>
						<CheckIcon />
						{size ? size : 'standard'} {kind}
					</Button>
					<Button
						isDisabled
						style={{ gridColumn: sizeIndex + 1 }}
						size={size}
						kind={kind}
					>
						<CheckIcon />
						disabled {size ? size : 'standard'} {kind}
					</Button>
					<Button
						style={{ gridColumn: sizeIndex + 1 }}
						size={size}
						kind={kind}
						hasOnlyIcon={true}
					>
						<CheckIcon />
					</Button>
				</React.Fragment>
			))
		)}
	</div>
);
