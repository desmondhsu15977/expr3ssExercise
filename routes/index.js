var express = require('express');
var router = express.Router();
var request = require("request");


/* GET home page. */

router.get('/',  function(req, res,next){

	res.render('index', {title: 'Expr3ss! excercise...'});
	
	
});

router.post('/',function(req, res, next){
	
	//res.writeHead(200);
	//res.end("Thank you!\n");
	
	var data= {};
	data.first_name= req.body.first_name;
	data.last_name= req.body.last_name;
	data.email= req.body.email;
	data.address= req.body.street1+","+(req.body.street2? req.body.street2+" ," : "")+req.body.suburb+", "+req.body.country;
	console.log(""+data.address);
	// fire request
	request({
		url: "https://sheetsu.com/apis/59cc17dc",
		method: "POST",
		json: data
	},function (error, response, body) {
            console.log(body)
        

            if(body.status!=201){
				res.writeHead(200);
				res.end("Sorry! Something went wrong while trying to save your data!\n");
			}else{
				res.sendStatus(200);
			}

	});
	

});

module.exports = router;

