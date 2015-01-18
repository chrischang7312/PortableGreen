historyData = {
    host: "http://history.muffinlabs.com/",

    /*
     * Lightweight JSONP fetcher
     * Copyright 2010-2012 Erik Karlsson. All rights reserved.
     * BSD licensed
     */

    /*
     * Usage:
     * 
     * JSONP.get( 'someUrl.php', {param1:'123', param2:'456'}, function(data){
     *   //do something with data, which is the JSON object you should retrieve from someUrl.php
     * });
     */
    jsonP: (function(){
	      var counter = 0, head, window = this, config = {};
	      function load(url, pfnError) {
		        var script = document.createElement('script'),
			          done = false;
		        script.src = url;
		        script.async = true;
            
		        var errorHandler = pfnError || config.error;
		        if ( typeof errorHandler === 'function' ) {
			          script.onerror = function(ex){
				            errorHandler({url: url, event: ex});
			          };
		        }
		        
		        script.onload = script.onreadystatechange = function() {
			          if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
				            done = true;
				            script.onload = script.onreadystatechange = null;
				            if ( script && script.parentNode ) {
					              script.parentNode.removeChild( script );
				            }
			          }
		        };
		        
		        if ( !head ) {
			          head = document.getElementsByTagName('head')[0];
		        }
		        head.appendChild( script );
	      }
	      function encode(str) {
		        return encodeURIComponent(str);
	      }
	      function jsonp(url, params, callback, callbackName) {
		        var query = (url||'').indexOf('?') === -1 ? '?' : '&', key;
				    
		        callbackName = (callbackName||config['callbackName']||'callback');
		        var uniqueName = callbackName + "_json" + (++counter);
		        
		        params = params || {};
		        for ( key in params ) {
			          if ( params.hasOwnProperty(key) ) {
				            query += encode(key) + "=" + encode(params[key]) + "&";
			          }
		        }	
		        
		        window[ uniqueName ] = function(data){
			          callback(data);
			          try {
				            delete window[ uniqueName ];
			          } catch (e) {}
			          window[ uniqueName ] = null;
		        };
            
		        load(url + query + callbackName + '=' + uniqueName);
		        return uniqueName;
	      }
	      function setDefaults(obj){
		        config = obj;
	      }
	      return {
		        get:jsonp,
		        init:setDefaults
	      };
    }()),
	  load : function(options) {
		    var callback, month, day, host;
 
		    if ( typeof(options) == "function" ) {
			      callback = options;
		    }
		    else if ( typeof(options) == "object" ) {
			      callback = options.callback;
			      month = options.month;
			      day = options.day;
	      }
		  

			// change the /date/month/day to change the date
		    this.jsonP.get(this.host + '/date' + '/' + month + '/' + day, {}, function(tmp) {
				    historyData.data = tmp.data;
				    historyData.url = tmp.url;
				    historyData.date = tmp.date;

				    if ( typeof(callback) == "function" ) {
					      callback(historyData.data);
				    }
			  });
	  }
}
/*
historyData.load({
	month: 1,
	day: 12,
	callback: function(data) {
		console.log('done');
		d = data;
	} 
});
*/
function getData(monthin, dayin) {
	var monthvar = monthin;
	var dayvar = dayin;
	// new object 
	var inputobject = {
		month: monthvar,
		day: dayvar,
		callback: function(data) {
			console.log('working');
			objectforoutput = data;
		}
		
	}
	return inputobject;
};











