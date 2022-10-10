#!/bin/bash

set -e

echo "Running all package tests (when defined)"

# We only want to run tests for the packages that have a "test" script defined

for package in packages/* ; do
  package_test_command=$(cat "$package/package.json" | jq -r '.scripts.test')
  package_name=$(cat "$package/package.json" | jq -r '.name')
  if [ "$package_test_command" != "null" ] ; then
    echo "Testing package $package_name"
    yarn workspace "$package_name" test
  else
    echo "Skipping package $package_name, no tests defined"
  fi
done