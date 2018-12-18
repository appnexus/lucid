#!/usr/bin/env bash

TAG=`git describe --abbrev=0 --candidates=0 --tags 2>/dev/null`
TAG_CODE=$?
CURRENT_BRANCH=`git symbolic-ref -q --short HEAD`
IS_LASTEST_CODE=`[ $TAG_CODE -eq 0 ] && [ $CURRENT_BRANCH = "master" ]; echo $?`

if [ $IS_LASTEST_CODE -eq 0 ]; then
	IS_LASTEST=true
	BUILD_ID=$TAG
else
	IS_LASTEST=false
	BUILD_ID=$CURRENT_BRANCH
fi

# Replace all `/` with `_` so we don't confuse other commands or docspot
BUILD_ID=${BUILD_ID//\//_}

# check that dist/docs exists, then upload archive to docspot
if [ ! -e dist/docs ]; then
	echo "Not found: dist/docs -- must build docs first (npm run build-docs)"
	exit
fi

echo "Tarring the dist/docs assets..."
pushd dist/docs &>/dev/null
tar -czf /tmp/$BUILD_ID.tar.gz . &>/dev/null
popd &>/dev/null

echo "POSTing to docspot (buildId: $BUILD_ID, isLatest: $IS_LASTEST)..."
curl "https://docspot.adnxs.net/api/projects" \
	--form file=@/tmp/$BUILD_ID.tar.gz \
	--form projectId=lucid \
	--form buildId=$BUILD_ID \
	--form isLatest=$IS_LASTEST &>/dev/null

if [ $? -eq 0 ]; then
	echo "Uploaded to: https://docspot.adnxs.net/projects/lucid/$BUILD_ID"
else
	echo "Error: unable to upload to: https://docspot.adnxs.net/projects/lucid/$BUILD_ID"
fi

