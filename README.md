# cordova-js-zip
==========

Promises wrapper for [Cordova zip library] (https://github.com/MobileChromeApps/zip)

## Getting started

```bash

    # npm install component
    npm install cordova-js-zip    

    # install Cordova and plugins
    cordova platform add ios@3.7.0
    cordova plugin add org.apache.cordova.file
    cordova plugin add https://github.com/MobileChromeApps/zip.git
```


## Usage


```javascript
    
    // require 
    var zipUtil = require('cordova-js-zip'); 
    
    var zip = zipUtil({
     retryCount: 3, // How many times to retry unzip if it fails (default is 1)
     Zip: window.zip // The zip library
     Promise: require('promiscuous') // Promise/A+ library
    });

    zip.unzip(src, dest, options)   // unzip src zip file to dest directory
    options.retryCount = 5 // retry unzip for 5 times before failing (defaults to 1)
```

The Promise option expects a library that follows the [Promise/A+ spec](https://promisesaplus.com/), such as Q ([github](https://github.com/kriskowal/q)).

The Zip option expects the Cordova zip library or something that implements the same API.

## Tests

  npm test

## Changelog

### 0.0.1 (20150415)

* First version with unzip functionality

## Licence

Apache 2