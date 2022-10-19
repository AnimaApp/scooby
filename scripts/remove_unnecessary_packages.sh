#!/bin/bash

echo "Removing unnecessary packages"

# We move the ones we want to keep
mkdir pkg_to_keep

mv packages/scooby-service pkg_to_keep
mv packages/scooby-core pkg_to_keep
mv packages/scooby-context pkg_to_keep
mv packages/scooby-github-api pkg_to_keep
mv packages/scooby-api pkg_to_keep
mv packages/scooby-shared pkg_to_keep

# Delete all the others
rm -Rf packages/

# And replace it back
mv pkg_to_keep packages

ls -la packages/