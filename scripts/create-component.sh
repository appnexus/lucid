#!/usr/bin/env bash
COMPONENT_NAME=$1

if [ -z "$COMPONENT_NAME" ]; then
	echo 'Must specify a component name.'
	exit
fi

./scripts/create-component-source.sh $COMPONENT_NAME
./scripts/create-component-dev.sh $COMPONENT_NAME
./scripts/create-component-exports.sh $COMPONENT_NAME
./scripts/create-component-less.sh $COMPONENT_NAME
./scripts/create-component-docs.sh $COMPONENT_NAME
