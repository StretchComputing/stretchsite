// Copyright © 2012 by Stretch Computing, Inc. All rights reserved.
//
// Any redistribution or reproduction of part or all of the contents in any
// form is prohibited without prior approval. You may not, except with our
// express written permission, distribute or commercially exploit the content.
//

var ARC = (function (r, $) {
  'use strict';

	r.serverError = "Arc server error - try again later.";

	// Define an object of event handlers inside of 'interface' for each Arc API
	r.interface = {
		// Create Customer API response handlers
    createCustomer: {
      // A callback function to respond to success returned by the REST/Ajax call.
      successHandler: function (data, status, jqXHR) {
        try {
					var results = status.Results; 
				  Cookie.set('arcToken', results.Token, 9000, '/');
          RSKYBOX.log.debug('entering', 'RSKYBOX.config.createCusotmer.successHandler');
        } catch (e) {
					RSKYBOX.log.error("exception = " + e.message, "arc.html.createCustomer.successHandler");
        }
      },

      // A callback function to respond to errors returned by the REST/Ajax call.
      errorHandler: function (jqXHR, textStatus, errorThrown) {
        try {
					// TODO not sure how to differentiate between a 422 and other types of errors. Code below did NOT work
          //RSKYBOX.log.debug('entering', 'arc.html.createCustomer.errorHandler');
          //if (jqXHR.responseText) { return; }  // This is an apiError which is handled by statusCodeHandlers below.
					//alert(r.serverError);
        } catch (e) {
					RSKYBOX.log.error("exception = " + e.message, "arc.html.createCustomer.errorHandler");
        }
      },

      // An object compatible with jQuery's Ajax statusCode option.
      // This is an object of key/value pairs where the key is the status code to
      // respond to, and the value is the callback function that responds.
      // rSkybox API errors are returned in HTTP code 422.
      statusCodeHandlers: {
        422: function (jqXHR) {
          try {
            var apiCodes = r.createCustomer.getApiCodes();
						var errorCodes = JSON.parse(jqXHR.responseText).ErrorCodes; 
						var code = "not found";
						if(errorCodes.length > 0) {
							code = errorCodes[0].Code;
						}
						RSKYBOX.log.debug('code = ' + code, 'arc.html.createCustomer.statusCodeHandlers');

            if (apiCodes[code]) {
							// TODO do an 'inline' error message instead of a popup
							alert(apiCodes[code]);
            } else {
							alert(r.serverError);
              RSKYBOX.log.debug('Undefined apiStatus: ' + code, 'arc.html.createCustomer.statusCodeHandlers');
						}
          } catch (e) {
						RSKYBOX.log.error("exception = " + e.message, "arc.html.createCustomer.statusCodeHandlers");
          }
        }
      }

    } // end of 'createCustomer' object

  }; // end of 'interface' object

  return r;
}(ARC || {}, jQuery));
