#!/bin/zsh
##############################################
# What this script does:
#   • DELETE watchmen
#   • CLEAN temp files
#   • DELETE cached native android deps
#   • CLEAN android files
#   • DELETE node_modules
#   • DELETE yarn-lock.json
#   • DELETE package-lock.json
#   • INSTALL node_modules
#   • RUN gradlew tasks
#   • RUN gradlew tasks
##############################################
# Checklist (before running this script)
# • Try deleting folder: ~/.gradle
# • Make sure Android Studio is closed
##############################################

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

say()
{
  echo "$BOLD_YELLOW\n🔸 $1$COLOR_OFF"
}

printDivider()
{
  printf %"$COLUMNS"s |tr " " "•"
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

# ❌ WATCHMEN
say "Deleting watchmen..."
watchman watch-del-all

# ❌ TEMPORARY FILES
say "Deleting temporary files..."
for i in $CACHE_TO_DELETE; do
    echo "   Deleting $BOLD_PURPLE\$TMPDIR/$i$COLOR_OFF"
    rm -rf $TMPDIR/$i
done

# ❌ ANDROID CACHE
say "ANDROID: Deleting gradle caches..."
cd android && rm -rf ~/.gradle && cd ..

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

# ✅ GRADLEW COMMANDS
say "ANDROID: Running gradlew cleanup and tasks commands..."
# cd android && ./gradlew cleanBuildCache && cd ..
cd android && ./gradlew clean && ./gradlew tasks && cd ..

announceBig "ALL DONE!!!"
