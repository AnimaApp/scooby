Forked from https://github.com/reg-viz/reg-suit/tree/master/packages/reg-keygen-git-hash-plugin

# scooby-git-resolver

## Detection expected commit

This plugin detects automatically the parent's commit which is the source of the topic branch. And use the snapshot result of the detected commit as the expected result of regression testing.

![](images/gh_flow.png)

And if your topic branch has the merge commit from the parent(i.e. `master`) branch, this plugin uses this merge commit hash as the expected snapshot key.
