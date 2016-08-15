if [ -z $BROWSERSTACK_USERNAME ]; then
	echo 'set BROWSERSTACK_USERNAME'
	exit 1
fi

if [ -z $BROWSERSTACK_ACCESS_KEY ]; then
	echo 'set BROWSERSTACK_ACCESS_KEY'
	exit 1
fi
