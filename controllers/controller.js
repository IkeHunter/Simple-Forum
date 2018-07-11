const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended: false});

module.exports = function(app, db){
	
	app.get('/', (req,res)=>{
		console.log('reading home');
		let sql = 'select * from forum';
		db.query(sql, (err, results) => {
			if(err) throw err;
			console.log(results);
			res.render('home', {dataFor: results});
			
		});
	});
	
	app.post('/', urlencodeParser, (req,res)=>{
		console.log('posted');
		let item = req.body;
		console.log(item);
		let post = {title: item.title, body: item.body, author: item.author};
		let sql = ('insert into forum SET ?');
		let query = db.query(sql, item, (err, results) =>{
			if (err) throw err;
			res.render('home');
		
		});
	});
	
};





