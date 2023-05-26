#!/bin/bash

# This script should go to build dir and pack each folder to a zip archive
# Script automates the process and also prevent __macos files to present in a zip archive

# Array of browser names
browsers=("chrome" "firefox" "safari" "edge" "opera")

# App root path
app_path=$(pwd)
# Build folder path
build_folder="build"

# Iterate over browser names
for browser in "${browsers[@]}"
do
    # Copy Chrome build for Opera
    if [ "$browser" == "opera" ]; then
        cp -r "$app_path/build/chrome-mv3-prod" "$app_path/build/opera-mv3-prod"
    fi

    # Construct directory path
    directory_path="${build_folder}/${browser}-mv3-prod"
    
    # Check if directory exists
    if [ -d "$directory_path" ]; then
        cd $app_path/$directory_path
        ls -la
        zip -r "$app_path/build/$browser.zip" . -x '**/.*' -x '**/__MACOSX' -x '**/.DS_Store'
        cd $app_path
    else
        echo "Directory '$directory_path' does not exist for $browser"
    fi
done