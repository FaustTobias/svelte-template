#!/usr/bin/env bash

git config --global user.email "github-actions@users.noreply.github.com"
git config --global user.name "github-actions"
git add .
git commit -m "[automated] Update template"
git push origin HEAD --force