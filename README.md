# STEPS TO REPRODUCE
1. open terminal in a directory where this repo will be cloned.
2. run `git clone https://github.com/jehillert/expo-modules-int-issue-28892.git`
3. Run `yarn`
4. Run `npx install-expo-modules@latest`

# LOCATION OF ERROR
After running the above steps, view the file diffs at these two locations.
1. `projectRoot/android/app/build.gradle`, lines 36-40
2. `projectRoot/ios/Podfile`, lines 22-26