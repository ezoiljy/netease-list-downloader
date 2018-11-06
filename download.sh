#!/bin/bash
echo '请输入歌单id以及目标下载位置（目录请避免~符号）'
read id path
mkdir -p "$path/$id"
node "`dirname $0`"/download.js $id > "$path/$id/log"
cd "$path/$id"

while read name url; do
	[[ -e "$name.mp3" ]] || \
		(wget -c "$url" -O "$name.mp3.part" -o "$name.log" &&
		 (mv "$name.mp3.part" "$name.mp3"; rm "$name.log")) &
done < log
rm log
