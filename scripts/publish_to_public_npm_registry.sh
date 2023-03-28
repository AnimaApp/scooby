#!/bin/bash

set -e

echo "Patching NPM registry to point to public NPM registry"

git grep -rl 'https://npm.pkg.github.com' packages/ > affected_files.txt

echo "These files will be affected"
cat affected_files.txt

if [ "$(uname)" == "Darwin" ]; then
  # macOS
  cat affected_files.txt | xargs sed -i '' 's,https://npm.pkg.github.com,https://registry.npmjs.org,g'
else
  # Linux
  cat affected_files.txt | xargs sed -i 's,https://npm.pkg.github.com,https://registry.npmjs.org,g'
fi

echo "Publishing packages"

for package in `ls packages`; do
  PACKAGE_PATH=packages/$package
  pushd $PACKAGE_PATH

  yarn publish --access public

  popd
done