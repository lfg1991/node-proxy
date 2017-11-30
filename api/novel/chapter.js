

const {httpGet} = require('../util/util');

const cheerio = require('cheerio');

const url = require('url');

const path = require('path');


async function getHtml(u) {
    let goalUrl = url.parse(u);
    let html = await httpGet(u);
    let $ = cheerio.load(html);
    analysis($, require(path.resolve('../collection',goalUrl.host)).chapter);
}

function analysis($, chapter) {


    let data = {};
    for(key in chapter){

        let v = chapter[key];

        if(typeof v === 'string'){
            data[key] = upSelector($, v);
        }

        if(Array.isArray(v)){

            let d;
            for(value of v){
                if(typeof value === 'string'){
                    d = upSelector($, value);
                }else if(typeof value === 'function'){
                    d = value(d);
                }
            }
            data[key] = d;
        }



    }

    console.log(data)

}

function upSelector($, selector) {
    let s = selector.split(":");
    let r;
    for(i in s){
        if(i === '0'){
            r = $(s[i]);
        }else{
            r = r[s[i]]()
        }
    }
    return r.text();
}


getHtml('https://www.biqudu.com/43_43821/');