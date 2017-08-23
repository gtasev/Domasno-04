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

				req.on('data', function(chunk){					//on metodot e eventListener metod koj kako parametri prima
					data += chunk;								// event i callback koj ke se izvri koga ke nastane eventot
				}).on('end', function(){						//'data' e event koga pocnuva da se prenesuva JSON filot, bidejki
					CONTACTS_LIST.push(JSON.parse(data));		//toj se prenesuva pukva po bukva na promenlivata data i gi
					res.statusCode = 200;						//lepi site bukvi edna po edna za da go napravi cel string
					res.end();									// koga ke zavrsi so toa, vika deka e gotov t.e. go aktivira
				});												//'end' eventot t.e. kazuva jas zavrsiv so prefrlanjeto i taka
																//se startuva naredniot volancen on metod so event 'end'
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

//  bojang@gmail.com
//  https://desktop.github.com/