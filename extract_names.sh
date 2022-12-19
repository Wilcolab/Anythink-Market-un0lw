#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Error: No file provided"
    exit 1
fi

awk -F',' 'tolower($4) ~ /@amazon.com$/ {print $3, $2}' "$1" >"extract_names.txt"
