#!/bin/bash
echo hi >> ~/Desktop/testing.log
which nodejs
/usr/bin/nodejs -v
export PATH=/home/hussein/bin:/home/hussein/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
cd /home/hussein/Documents/fusing-connections-analyzer/task/;
npm install .
/usr/bin/nodejs proxyTester.js;

cat ./results.database.json > results.log

git add  ./results.database.json
git commit -m "Data Update from Pipeline"
git push
