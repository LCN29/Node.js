'use strict';


export default {
	port: 8081,
	url: 'mongodb://localhost:27017/WebSite',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	}
};