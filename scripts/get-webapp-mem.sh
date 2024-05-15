#!/bin/zsh

BOLD_YELLOW="\033[1;93m"     # Yellow
BOLD_WHITE="\033[1;97m"      # White
COLOR_OFF="\033[0m"

FILE_SIZE=$(du -h src/assets/webapp/index.html)

echo "$BOLD_WHITE\n📌 Web App File Size: $COLOR_OFF$BOLD_YELLOW$FILE_SIZE$COLOR_OFF"
