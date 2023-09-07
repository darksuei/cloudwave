#!/bin/bash

if [ $# -ne 2 ]; then
    echo "Usage: $0 <commit_message> <remote_url>"
    exit 1
fi

COMMIT_MESSAGE="$1"
REMOTE_URL="$2"
SCRIPT_NAME="git-init.sh" 

if ! grep -q "$SCRIPT_NAME" .gitignore; then
    echo "$SCRIPT_NAME" >> .gitignore
fi

git init

git add .

git commit -m "$COMMIT_MESSAGE"

git branch -M main

git remote add origin $REMOTE_URL

git push -u origin main

echo "->> Repository successfully initialized and code pushed to remote!"

