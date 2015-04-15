module.exports = function (options) {

  this.options = options = options || {};

  var wnd;
  if (typeof window === 'undefined') {
    wnd = {};
  } else {
    wnd = window;
  }

  var Promise = options.Promise || wnd.Promise;
  if (!Promise) {
    throw new Error("No Promise library given in options.Promise");
  }

  var Zip = options.Zip || wnd.Zip;
  if (!Zip) {
    throw new Error("No Zip library given in options.Zip");
  }

  var globalRetryCount = options.retryCount || 1;


  /**
   * Unzip source zip file to dest directory
   *
   * @param src
   * @param dest
   */
  function unzip(src, dest, options) {
    var opt = options || {};
    var retryCount = opt.retryCount || globalRetryCount;

    var reject;
    var resolve;

    // create a promise that can be returned to caller and take references to resolve/reject functions for later use
    var p = new Promise(function (res, rej) {
      reject = rej;
      resolve = res;
    });

    function process(srcFile, destFolder, counter) {
      counter = counter + 1;
      /**
       * Both source and destination arguments can be URLs obtained from the HTML File interface or absolute paths to
       * files on the device.
       *
       * The callback argument will be executed when the unzip is complete, or when an error occurs. It will be called
       * with a single argument, which will be 0 on success, or -1 on failure The progressCallback argument is optional
       * and will be executed whenever a new ZipEntry has been extracted. E.g.:
       */
      var progressCallback = function (progressEvent) {
        //console.log("Progress: " + Math.round((progressEvent.loaded / progressEvent.total) * 100));
      };

      var callback = function (result) {
        if (result === -1) {
          // failed
          if (counter < retryCount) {
            process(srcFile, destFolder, counter);
          } else {
            reject("Unzip failed after " + retryCount + " for file: " + srcFile);
          }
        } else if (result === 0) {
          // success - would be great to have all the that were unzipped available here
          resolve({
            src: srcFile,
            dst: destFolder,
            attempt: counter
          });
        } else {
          // unknown result code
          reject("Unknown result code from ZIP lib");
        }
      }

      Zip.unzip(srcFile, destFolder, callback, progressCallback);
    };

    // kick off recursive processing
    process(src, dest, 0);

    return p;
  }


  return {
    unzip: unzip,
    Promise: Promise,
    Zip : Zip
  };
};