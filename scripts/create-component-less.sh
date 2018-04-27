#!/usr/bin/env bash
COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
	echo 'Must specify a component name.'
	exit
fi

cat << EOF >> ./src/styles/components.less
@import '../components/${COMPONENT_NAME}/${COMPONENT_NAME}';
EOF

echo "Imported 'src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.less' in src/styles/components.less"
