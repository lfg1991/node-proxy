
const http = require('http');
const https = require('https');



function httpGet(url) {

    let http = url.startsWith('https') ? https : http;
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            // const { statusCode } = res;
            // const contentType = res.headers['content-type'];

            // let error;
            // if (statusCode !== 200) {
            //     error = new Error('Request Failed.\n' +
            //         `Status Code: ${statusCode}`);
            // } else if (!/^application\/json/.test(contentType)) {
            //     error = new Error('Invalid content-type.\n' +
            //         `Expected application/json but received ${contentType}`);
            // }
            // if (error) {
            //     console.error(error.message);
            //     // consume response data to free up memory
            //     res.resume();
            //     return;
            // }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {

                    resolve(rawData);
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    });
}

module.exports = {
    httpGet
}