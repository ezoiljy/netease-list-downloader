// 下载网易云音乐歌单里的歌曲
var superagent = require('superagent');
var argv = require('argv');
var cheerio = require('cheerio');
var arguments = process.argv.splice(2);

const url = 'http://music.163.com/song/media/outer/url?id=';
const pre = 'https://music.163.com/playlist?id='

superagent.get(pre + arguments[0])
.end(function(err, resp){
    if(err){
        console.log(err);
    }
    var $ = cheerio.load(resp.text);
    $('ul[class=f-hide] li').each(function(idx, ele){
        var cur = $(ele);
        var title = cur.find('a').text();
        var id = cur.find('a').attr('href');
        var num = id.replace(/[^0-9]/ig, '');
        var name = title.replace(/[ ]/ig,'_')
        console.log(name + ' ' + url + num);
    });
});
