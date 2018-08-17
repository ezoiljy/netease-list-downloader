#!/bin/bash
echo '请输入歌单id以及目标下载位置（目录请避免~符号）'
read id path
mkdir $path/$id

node download.js $id > log
while read name url; do
    wget -b "$url" -O "$path/$id/$name.mp3"
done < log
rm log