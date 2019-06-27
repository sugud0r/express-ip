#!/usr/bin/env bash

echo "Running pre-push hook"
echo "Running Tests before push to server"
npm test

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 echo "Tests must pass before push!"
 exit 1
fi

echo "Done successfully"