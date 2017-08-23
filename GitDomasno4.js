const http = require('http');

var CONTACTS_LIST = [];

var server = http.createServer(function(req, res){

	var url = req.url.split('/');

	if(url[1] == 'users' && url.length == 2){

		switch(req.method){
			case 'GET':
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(CONTACTS_LIST));
			break;
			case 'POST':
				var data = '';						

				req.on('data', function(chunk){					
					data += chunk;								
				}).on('end', function(){						
					CONTACTS_LIST.push(JSON.parse(data));		
					res.statusCode = 200;						
					res.end();									
				});												
																
			break;
		}
	}
	else if(url[1] == 'users' && url.length == 3){

		switch(req.method){
			case 'GET':
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(CONTACTS_LIST[parseInt(url[2])]));
			break;
			case 'POST':
			// res.setHeader('Content-Type','application/json');	
			res.end('user/num post');
			break;
			case 'PUT':
				var data = '';

				req.on('data', function(chunk){
					data += chunk;
				}).on('end', function(){
					CONTACTS_LIST.splice(parseInt(url[2]),1,JSON.parse(data));
					res.statusCode = 200;
					res.end();
				});

				res.end('user/num put');
			break;
			case 'DELETE':
				res.setHeader('Content-Type', 'application/json');
				CONTACTS_LIST.splice(parseInt(url[2]),1);
				res.end(JSON.stringify(CONTACTS_LIST));
			break;
		}
	}
	else {
		res.statusCode = 404;
		res.end('404 Not found');
	}
	// res.setHeader('Content-Type', 'text/html');
	// res.end('OK');
});

server.listen(8080);