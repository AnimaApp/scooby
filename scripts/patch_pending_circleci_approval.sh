#!/bin/bash

set -e

CIRCLECI_JOB_NAME="$1"

echo "Patching approval job named: $CIRCLECI_JOB_NAME"

for i in {1..10}
do
  echo "waiting for status to appear..."

  sleep 10

  curl --request GET \
    --url "https://api.github.com/repos/AnimaApp/scooby/statuses/$CIRCLE_SHA1" \
    --header 'Accept: application/vnd.github.v3+json' \
    --header "Authorization: Bearer $GITHUB_CI_BOT_TOKEN" > commit-statuses.json

  cat commit-statuses.json
  cat commit-statuses.json | jq -r '.[].context' > commit-statuses.txt
  
  if grep -q "ci/circleci: $CIRCLECI_JOB_NAME" "commit-statuses.txt"; then
    echo "status appeared, patching the pending state"
    URL=$(cat commit-statuses.json| jq -r --arg name "$CIRCLECI_JOB_NAME" -c 'map(select(.context | contains($name))) | .[].target_url' | head -1)

    curl --request POST \
      --url "https://api.github.com/repos/AnimaApp/scooby/statuses/$CIRCLE_SHA1" \
      --header 'Accept: application/vnd.github.v3+json' \
      --header "Authorization: Bearer $GITHUB_CI_BOT_TOKEN" \
      --header 'Content-Type: application/json' \
      --data '{
        "state": "success",
        "target_url": "'"$URL"'",
        "description": "Patched pending state, please visit circleCI to start the approval.",
        "context": "ci/circleci: '"$CIRCLECI_JOB_NAME"'"
      }'

    exit 0
  fi
done

echo "Could not patch CircleCI approval, timed out"