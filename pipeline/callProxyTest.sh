#!/bin/bash

cd ./git_repo/task/;
npm install .
/usr/local/bin/nodejs proxyTester.js;

cat ./results.database.json > results.log

git add  ./results.database.json
git commit -m "Data Update from Pipeline"
git push
