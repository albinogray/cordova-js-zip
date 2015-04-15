# cordova-js-zip
==========

Promises wrapper for [Cordova zip library] (https://github.com/MobileChromeApps/zip)

## Getting started

```bash

    # npm install component
    npm install cordova-js-zip
    npm install bluebird # a library that follows the Promise/A+ spec

    # install Cordova and plugins
    cordova platform add ios@3.7.0
    cordova plugin add org.apache.cordova.file
    cordova plugin add https://github.com/MobileChromeApps/zip.git
```


## Usage


```javascript
    
    var zip = zipUtil({
     retryCount: 3, // How many times to retry unzip if it fails (default is 1)
     Zip: window.zip // The zip library
     Promise: require('promiscuous') // Promise/A+ library
    });

    zip.unzip(src, dest, options)   // unzip src zip file to dest directory
    options.retryCount = 5 // retry unzip for 5 times before failing (defaults to 1)
```

The Promise option expects a Promise library that follows the [Promise/A+ spec](https://promisesaplus.com/), such as bluebird ([github](https://github.com/petkaantonov/bluebird), [download](https://raw.githubusercontent.com/markmarijnissen/cordova-app-loader/master/www/lib/bluebird.js)).

The Zip option expects the Cordova zip library or something that implements the same API.

## Changelog

### 0.0.1 (20150415)

* First version with unzip functionality

## Licence

Apache 2