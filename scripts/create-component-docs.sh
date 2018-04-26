#!/usr/bin/env bash
COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
	echo 'Must specify a component name.'
	exit
fi

echo "Adding example story of '${COMPONENT_NAME}' to the documentation"
echo "Make sure to export '${COMPONENT_NAME}' in 'src/index.js' and import '${COMPONENT_NAME}.less' in 'src/styles/components.less'!"

mkdir ./docs/examples/$COMPONENT_NAME

touch ./docs/examples/$COMPONENT_NAME.stories.js
touch ./docs/examples/$COMPONENT_NAME/WithDefaults.js

cat << EOF >> ./docs/examples/$COMPONENT_NAME.stories.js
import { storiesOf } from '@storybook/react';
import { exampleStory } from '../../.storybook/lucid-docs-addon';

import ${COMPONENT_NAME} from '../../src/components/${COMPONENT_NAME}/${COMPONENT_NAME}';
import WithDefaultsExample from './${COMPONENT_NAME}/WithDefaults';
import withDefaultsCode from '!!raw-loader!./${COMPONENT_NAME}/WithDefaults';

storiesOf('${COMPONENT_NAME}', module).add(
	'with defaults',
	exampleStory({
		component: ${COMPONENT_NAME},
		example: WithDefaultsExample,
		code: withDefaultsCode,
		path: ['${COMPONENT_NAME}'],
		options: { showAddonPanel: true },
	})
);

/*
 * This is the same as calling the \`exampleStory\` function above:

import { withDescription, withProps, withCode } from '../../.storybook/lucid-docs-addon';

storiesOf('${COMPONENT_NAME}', module)
	.add('with defaults',
		withDescription(${COMPONENT_NAME})(
			withProps(${COMPONENT_NAME})(
				withCode(withDefaultsCode)(
					WithDefaultsExample
				)
			)
		)
	);

*/
EOF
echo "Created ./docs/examples/$COMPONENT_NAME.stories.js"

cat << EOF >> ./docs/examples/$COMPONENT_NAME/WithDefaults.js
import React from 'react';
import { ${COMPONENT_NAME} } from '../../../src/index.js';

export default class extends React.Component {
	render() {
		return (
			<${COMPONENT_NAME} />
		);
	}
}
EOF
echo "Created ./docs/examples/$COMPONENT_NAME/WithDefaults.js"

echo "Example story added for '${COMPONENT_NAME}' in docs. Do \`npm run docs\` to see."
