#!/usr/bin/env bash
COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
	echo 'Must specify a component name.'
	exit
fi

echo "Adding storybook story for '${COMPONENT_NAME}' for local development"

touch ./stories/$COMPONENT_NAME.stories.js

cat << EOF >> ./stories/$COMPONENT_NAME.stories.js
import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/index.less';
import ${COMPONENT_NAME} from '../src/components/${COMPONENT_NAME}/${COMPONENT_NAME}';

storiesOf('${COMPONENT_NAME}', module)
	.add('dev', () => {
		return (
			<${COMPONENT_NAME} />
		);
	});
EOF
echo "Created ./stories/$COMPONENT_NAME.stories.js"

echo "Story added for '${COMPONENT_NAME}'. Do \`npm run dev\` to start development"
