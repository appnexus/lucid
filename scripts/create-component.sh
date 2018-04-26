#!/usr/bin/env bash
COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
	echo 'Must specify a component name.'
	exit
fi

function onerror {
	echo "Unable to finish creating component '${COMPONENT_NAME}'"
	exit
}

trap onerror ERR

function create-component-all {
	./scripts/create-component-source.sh $COMPONENT_NAME &&
	./scripts/create-component-dev.sh $COMPONENT_NAME &&
	./scripts/create-component-exports.sh $COMPONENT_NAME &&
	./scripts/create-component-less.sh $COMPONENT_NAME &&
	./scripts/create-component-docs.sh $COMPONENT_NAME
}

create-component-all | while read line; do echo "> $line"; done

cat << EOF | cat

Created component: '${COMPONENT_NAME}'
 + source code - edit files in 'src/components/${COMPONENT_NAME}/'
 + dev storybook - edit 'stories/${COMPONENT_NAME}.stories.js' and run \`npm run dev\`
 + docs page - edit 'docs/examples/${COMPONENT_NAME}.stories.js' and run \`npm run docs\`

EOF
