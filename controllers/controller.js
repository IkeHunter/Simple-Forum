
const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({extended: false});

module.exports = function(app, db){
	
	app.get('/', (req,res)=>{
		console.log('reading home');
		let sql = 'select * from forum';
		db.query(sql, (err, results) => {
			if(err) throw err;
			
			res.render('home', {dataFor: results});
           
		});
	});
	app.get('/new_comment/:id', (req,res)=>{
        res.render('forumInput');
    })
	 
	app.post('/new_comment/:id', urlencodeParser, (req,res)=>{
		console.log('posted');
		let item = req.body;
		console.log(item.body);
//		let post = {title: item.title, body: item.body, author: item.author};
//		let sql = ('insert into forum SET ?');
        let cTitle = item.title;
		let cBody = item.body;
		let cAuthor = item.author;
		let sql = `insert into comments (title, body, author, fid) values ("${cTitle}", "${cBody}", "${cAuthor}", ${req.params.id})`;
		let query = db.query(sql, item, (err, results) =>{
			if (err) throw err;
			res.redirect('/forum/' + req.params.id);
		
		});
	});
	
	app.post('/new_thread', urlencodeParser, (req,res)=>{
		let item = req.body;
		let fTitle = item.title;
		let fBody = item.body;
		let fAuthor = item.author;
		let sql = `insert into forum (title, discription, author) values ("${fTitle}", "${fBody}", "${fAuthor}")`; 
		let query = db.query(sql, item, (err, results) =>{
			if (err) throw err;
			res.redirect('/');
		
		});
	})
	
	app.get('/forum/:id', (req,res)=>{
		console.log('reading forum');
		let sql = `select * from comments where fid = ${req.params.id}`;
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.render('forum', {dataCom: results, key:req.params.id});
        });
		
	});
    
    
    app.get('/new_thread', (req,res)=>{
        res.render('threadInput');
    })
  
   app.delete('/delete/:id', (req,res)=>{
	   console.log('deleting');
	   let item = req.body;
	   let sql = `delete from comments where id = ${req.params.id}`;
	   db.query(sql, item, (err, results) => {
            if (err) throw err;
            res.json(results);
        });
	   
   })
    
   app.delete('/page/:id', (req,res)=>{
	   console.log('deleting thread');
	   let item = req.body;
	   let sql2 = `delete from comments where fid = ${req.params.id}`;
	   let sql = `delete from forum where id = ${req.params.id}`;
	   
	   db.query(sql2, item, (err, results) => {
            if (err) throw err;
//            res.json(results2);
        });
	   
	   db.query(sql, item, (err, results) => {
            if (err) throw err;
            res.json(results);
		   
        });
	   
	  
	   
   })
    
    
    
};





