#!/bin/zsh

# CONFIGURATION
ARCHITECTURE="arm"
CACHE_TO_DELETE=("haste-*" "metro-*" "yarn-*" "react-*")
DERIVED_DATA_DIR=$HOME/Library/Developer/Xcode/DerivedData
IOS_BUILD_COMMAND="yarn run:ios:dev --device='jeh_iphone_12'"
PACKAGE_MANAGER="yarn"

# FORMATTING
BOLD_BLACK="\033[1;90m"      # Black
BOLD_RED="\033[1;91m"        # Red
BOLD_GREEN="\033[1;92m"      # Green
BOLD_YELLOW="\033[1;93m"     # Yellow
BOLD_BLUE="\033[1;94m"       # Blue
BOLD_PURPLE="\033[1;95m"     # Purple
BOLD_CYAN="\033[1;96m"       # Cyan
BOLD_WHITE="\033[1;97m"      # White
COLOR_OFF="\033[0m"

# FUNCTIONS
say()
{
  echo "$BOLD_YELLOW\n🔸 $1$COLOR_OFF"
}

printDivider()
{
  printf %"$COLUMNS"s |tr " " "•"
}

sayDone()
{
  echo "$BOLD_BLUE🔹 done$COLOR_OFF"
}

announceBig()
{
  echo "$BOLD_RED"
  printDivider
  echo "$BOLD_WHITE🔸🔸🔸 $1 🔸🔸🔸$BOLD_RED"
  printDivider
  echo "$COLOR_OFF"
}

# START
announceBig "RUNNING CLEANING SCRIPT"

# WATCHMEN
say "Deleting watchmen..."
watchman watch-del-all

# TEMPORARY FILES
say "Deleting temporary files..."
for i in $CACHE_TO_DELETE; do
    echo "   Deleting $BOLD_PURPLE\$TMPDIR/$i$COLOR_OFF"
    rm -rf $TMPDIR/$i
done

# ❌ SIMULATOR FILES
say "IOS: Deleting iOS simulator files..."
rm -rf $DERIVED_DATA_DIR && mkdir $DERIVED_DATA_DIR


# ❌ PODFILE.LOCK
say "IOS: Removing Podfile.lock file..."
cd ios && rm -f /Podfile.lock && cd ..

say "IOS: Removing pods folder..."
cd ios && rm -rf Pods && cd ..

# ❌ NODE_MODLES
say "NODE: Deleting ./node_modules..."
rm -rf node_modules

# ❌ YARN.LOCK, PACKAGE-LOCK.JSON
if [[ $PACKAGE_MANAGER == "yarn" ]]; then
  say "NODE: Deleting yarn-lock file..."
  rm -f yarn-lock.json
else
  say "Deleting package-lock file..."
  rm -f package-lock.json
fi

# ❌ YARN/NPM CACHE
say "NODE: Deleting $PACKAGE_MANAGER cache..."
if [[ $PACKAGE_MANAGER == "yarn" ]];
then
  yarn cache clean
else
  npm cache clean –force
fi

# ✅ INSTALL DEPENDENCIES
say "NODE: Installing project dependencies..."
$PACKAGE_MANAGER install

# ✅ install COCOAPODS
say "IOS: Installing cocoapods pods..."
cd ios && \
  pod cache clean --all && \
  pod deintegrate && \
  pod install

announceBig "ALL DONE!!!"

# * ALTERNATIVES
# *  cd ios && pod install && cd ..
# *  cd ios && pod repo update && pod install && pod update && cd ..
# *  cd ios && pod repo update && pod install && pod update && cd ..

# * TERMINOLOGY
# * <pod install>
# *   This is to be used the first time you want to retrieve the pods for the project, but
# *   also every time you edit your Podfile to add, update or remove a pod.

# * Every time the pod install command is run — and downloads and install new pods — it
# * writes the version it has installed, for each pods, in the Podfile.lock file. This
# * file keeps track of the installed version of each pod and locks those versions.
# * When you run pod install, it only resolves dependencies for pods that are not already
# * listed in the Podfile.lock.

# * For pods listed in the Podfile.lock, it downloads the explicit version listed in the
# * Podfile.lock without trying to check if a newer version is available
# * For pods not listed in the Podfile.lock yet, it searches for the version that matches
# * what is described in the Podfile (like in pod 'MyPod', '~>1.2')

# * <pod outdated>
# *   When you run pod outdated, CocoaPods will list all pods which have newer versions than
# *   the ones listed in the Podfile.lock (the versions currently installed for each pod).
# *   This means that if you run pod update PODNAME on those pods, they will be updated — as
# *   long as the new version still matches the restrictions like pod 'MyPod', '~>x.y' set
# *   in your Podfile.

# * <pod update>
# *   When you run pod update PODNAME, CocoaPods will try to find an updated version of the
# *   pod PODNAME, without taking into account the version listed in Podfile.lock. It will
# *   update the pod to the latest version possible (as long as it matches the version
# *   restrictions in your Podfile).

# * NOTES:
# *  • If you run pod update with no pod name, CocoaPods will update every pod listed in your Podfile to the latest version possible.
# *  • out-of-date source repos which you can update with `pod repo update` or with `pod install --repo-update`.
