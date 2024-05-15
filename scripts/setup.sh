#!/bin/zsh
set -e
set -o pipefail
set -x

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

say "Setting up..."

if [[ $BITRISE_IO == "true" ]]; then
  say "Workflow is being run from bitrise.io.  Exiting script..."
  exit 0
fi

say "Setting environment file for staging."
if [ $BITRISE_TRIGGERED_WORKFLOW_TITLE == "StagingRelease" ]; then
  cp .env.staging .env
fi

say "Updating build number."
echo "$LATEST_BUILD"
INCREMENTED_BUILD_NUMBER=$(($LATEST_BUILD+1))
echo "$INCREMENTED_BUILD_NUMBER"
envman add --key LATEST_BUILD --value "$INCREMENTED_BUILD_NUMBER"

file=".bitrise.secrets.yml"
temp_file=".bitrise.secrets_temp.yml"

# Copy original line 1 to temp file
head -n 1 "$file" > "$temp_file"

# Write new line 2 to temp file
echo "  - LATEST_BUILD: $INCREMENTED_BUILD_NUMBER" >> "$temp_file"

# Skip lines 1-2 and append rest of original file
tail -n +3 "$file" >> "$temp_file"

# Replace the original file with the temporary file
mv "$temp_file" "$file"

# Update xcode project build number
PROJECT=./ios/jnotes.xcodeproj/project.pbxproj
sed -i '' -e 's/CURRENT_PROJECT_VERSION \= [^\;]*\;/CURRENT_PROJECT_VERSION = '$LATEST_BUILD';/' $PROJECT
build_number=`sed -n '/CURRENT_PROJECT_VERSION/{s/CURRENT_PROJECT_VERSION = //;s/;//;s/^[[:space:]]*//;p;q;}' $PROJECT`

announceBig "Setup script done"
