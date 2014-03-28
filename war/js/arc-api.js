'use strict';

// define a new 'var ARC' for each API. Following the pattern used in rskybox.js file.
var ARC = (function(r, $) {
	
  var
    apiCodes = {
      103: 'User already exists.',
      104: 'User rejected terms.'
    };
	// end of var definitions

  r.createCustomer = {
    // Access to the apiCodes if the client app wants to use our messages.
    getApiCodes: function () {
      return apiCodes;
    },

		// TODO: read from $('#dob').val() and convert to YYYY-MM-DD
		// TODO: read $('#confirmpassword').val() and make sure it is the same as password
		register: function(firstName, lastName, email, password, birthDate, notifications, facebook, twitter, acceptTerms) {
			RSKYBOX.log.error("testing rskybox from ArcTest.html", "joe1");
			RSKYBOX.log.debug("previous set cookie = " + Cookie.get('arcToken'));
			try {
				var customer = new r.Customer({
						FirstName: firstName,
						LastName: lastName, 
						eMail: email,
						Password: password,
						BirthDate: birthDate,
						Notifications: notifications,
						Facebook: facebook,
						Twitter: twitter,
						AcceptTerms: acceptTerms 
					});

				customer.setUrl();

				customer.save(null, {
							success: r.interface.createCustomer.successHandler,
							error: r.interface.createCustomer.errorHandler,
							statusCode: r.interface.createCustomer.statusCodeHandlers
						});
			} catch(e) {
				RSKYBOX.log.error("register exception = " + e.message, "arc.html.createCustomer.register");
			}
		}
	};

	return r;
})(ARC || {}, jQuery);
