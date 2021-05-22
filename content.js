// helpers
var helpers = {
  doesQueryStringExist: function(qs) {
    // check if query string does exist in the url
    var queryString = (qs || '').trim();
    return queryString.indexOf('?') >= 0;
  },
  doesQueryStringHasParam: function(key, qs) {
    // check if query string has the param
    var queryString = (qs || '').trim();
    var isQueryStringValid = this.doesQueryStringExist(queryString);

    // check if key provided or not
    if (key) {
      var cleanQueryString = isQueryStringValid ? queryString.slice(queryString.indexOf('?') + 1) : '';
      var queryStringParams = cleanQueryString.split('&');

      // loop all query string params
      for (var i = 0; i < queryStringParams.length; i++) {
        var _param = queryStringParams[i];

        // check if the param is valid
        if (_param && _param.indexOf('=') >= 0) {
          var _key = (_param.split('=')[0]).trim();
          var _value = (_param.split('=')[1]).trim();

          // if the query string param's key equals provided one, its found
          if (_key === key.trim()) {
            return true;
          }
        }
      }
    }

    return false;
  },
  updateQueryString: function(key, value, qs) {
    // query string param updater/inserter
    var queryString = (qs || '').trim();
    var isQueryStringValid = this.doesQueryStringExist(queryString);
    var result = queryString;

    // check if key and value provided or not
    if (key && value !== null && typeof value !== undefined) {
      var cleanQueryString = isQueryStringValid ? queryString.slice(queryString.indexOf('?') + 1) : '';
      var isKeyFound = false;

      if (cleanQueryString && cleanQueryString.indexOf('=') > 0) {
        var queryStringParams = cleanQueryString.split('&');

        // loop all query string params
        for (var i = 0; i < queryStringParams.length; i++) {
          var _param = queryStringParams[i];

          // check if the param is valid
          if (_param && _param.indexOf('=') >= 0) {
            var _key = (_param.split('=')[0]).trim();

            // if the query string param's key equals provided one, update the value
            if (_key === key.trim()) {
              isKeyFound = true;

              result = (isQueryStringValid ? queryString.slice(0, queryString.indexOf('?')) : queryString) + '?' + cleanQueryString.replace(_param, key + '=' + value);

              break;
            }
          }
        }
      }

      // if the provided key is not found in the query string, append it
      if (!isKeyFound) {
        result = (isQueryStringValid ? queryString.slice(0, queryString.indexOf('?')) : queryString) + '?' + (cleanQueryString ? cleanQueryString + '&' : '') + key + '=' + value;
      }
    }

    return result;
  },
  removeQueryStringParam: function(key, qs) {
    // remove param from query string
    var queryString = (qs || '').trim();
    var isQueryStringValid = this.doesQueryStringExist(queryString);
    var result = queryString;

    // check if key provided or not
    if (key) {
      var cleanQueryString = isQueryStringValid ? queryString.slice(queryString.indexOf('?') + 1) : '';
      var queryStringParams = cleanQueryString.split('&');

      // loop all query string params
      for (var i = 0; i < queryStringParams.length; i++) {
        var _param = queryStringParams[i];

        // check if the param is valid
        if (_param && _param.indexOf('=') >= 0) {
          var _key = (_param.split('=')[0]).trim();

          // if the query string param's key equals provided one, remove the param in query string
          if (_key === key.trim()) {
            var _rem = _param;

            // if the param is the first one
            if (i === 0 && queryStringParams.length > 1) {
              _rem += '&';
            } else if (i > 0) {
              _rem = '&' + _rem;
            }

            var _last = cleanQueryString.replace(_rem, '');

            result = queryString.slice(0, queryString.indexOf('?')) + (_last ? '?' + _last : '');

            break;
          }
        }
      }
    }

    return result;
  }
};

// listen incoming messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // get existing image elements
    var _images = document.getElementsByTagName('img');

    if (request.message === 'image_cache_break') {
      // break all existing images (if there is any) cache by versioning them
      for (var i = 0; i < _images.length; i++) {
        var _img = _images[i];
        var _src = _img.attributes['src'];

        if (_src && _src.value) {
          // change/insert versioning querystring parameter in the url
          _img.setAttribute('src', helpers.updateQueryString('v', new Date().getTime(), _src.value));
        }
      }

      // send the operation succeeded message
      chrome.runtime.sendMessage({'message': 'image_cache_break_done', 'data': _images.length});
    }

    if (request.message === 'image_total_count') {
      // send existing image count in the message
      chrome.runtime.sendMessage({'message': 'image_total_count_done', 'data': _images.length});
    }
  }
);
