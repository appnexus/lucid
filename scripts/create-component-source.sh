#!/usr/bin/env bash
COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
	echo 'Must specify a component name.'
	exit
fi

echo "Scaffolding new source code for new component: '${COMPONENT_NAME}'"

mkdir ./src/components/$COMPONENT_NAME
touch ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.jsx
touch ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.spec.jsx
touch ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.less

cat << EOF >> ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.jsx
import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Button from '../Button/Button';
import { lucidClassNames } from '../../util/style-helpers.js';

const cx = lucidClassNames.bind('&-${COMPONENT_NAME}');

const { func, number, string } = PropTypes;

const ${COMPONENT_NAME} = (props) => {
	const { className, count, onIncrement, ...passThroughs } = props;

	return (
		<div className={cx('&', className)} {...passThroughs}>
			Count: {count}
			<Button onClick={onIncrement}>Add one</Button>
		</div>
	);
};

// ${COMPONENT_NAME}.peek = {
// 	description: \`
//		This component was generated to quickly start development in Lucid UI.
//		Update this description with something appropriate for the new component
//		to be added to the library.
// 	\`
// 	categories: ['controls', 'selectors'],
// };

${COMPONENT_NAME}.propTypes = {
	// Note: optional description text can be added with backticks:
	className: string\`
		Appended to the component-specific class names set on the root element.
	\`,
	count: number,
	onIncrement: func\`
		A function that is called when the button is clicked.
		Signature: \\\`({ props, event }) => {}\\\`
	\`,
};

${COMPONENT_NAME}.defaultProps = {
	count: 0,
	onIncrement: _.noop,
};

export default ${COMPONENT_NAME};
EOF
echo "Created ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.jsx"

cat << EOF >> ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.spec.jsx
import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import ${COMPONENT_NAME} from './${COMPONENT_NAME}';
import Button from '../Button/Button';

describe('${COMPONENT_NAME}', () => {
	common(${COMPONENT_NAME});

	describe('Events', () => {
		describe('onIncrement', () => {
			it('should be called when button is clicked', () => {
				const onIncrement = jest.fn();
				const wrapper = shallow(
					<${COMPONENT_NAME} onIncrement={onIncrement} />
				);
				wrapper.find(Button).simulate('click');
				expect(onIncrement).toHaveBeenCalled();
			});
		});
	});
});
EOF
echo "Created ./src/components/$COMPONENT_NAME/$COMPONENT_NAME.spec.jsx"

cat << EOF >> ./src/components/$COMPONENT_NAME/${COMPONENT_NAME}.less
@import (reference) '../../styles/variables.less';
@import (reference) '../../styles/mixins.less';

.lucid-${COMPONENT_NAME} {
	display: flex;
}
EOF
echo "Created ./src/components/$COMPONENT_NAME/${COMPONENT_NAME}.less"

echo "Make sure to export '${COMPONENT_NAME}' in 'src/index.js' and import '${COMPONENT_NAME}.less' in 'src/styles/components.less'!"
echo "Created new component: '${COMPONENT_NAME}'"
