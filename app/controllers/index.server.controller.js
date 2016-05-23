/**
 * Created by beiwp on 2016/5/7.
 */

exports.checkUser = function(req,res,next){
	if(!req.user){
		console.log('=========user invalid========='+new Date());
		res.redirect('/signin');
	}else{
		next();
	}

};


exports.render = function(req,res){
    console.log('==========INDEX===COUNTROLLER===================');
    //res.send('Welcome '+req.query['name']+' come to MEAN');
	if(req.session.lastVisit){
		console.log('=========req.session.lastVisit========='+req.session.lastVisit+'============');
	}
	req.session.lastVisit = new Date();
	
	res.render('index',{
		title:'MEAN',
		userFullName: req.user ? req.user.fullName : '',
		user:JSON.stringify(req.user)
	});
};


exports.jsontest = function(req,res){
	console.log('==========INDEX===COUNTROLLER===================');
	//res.send('Welcome '+req.query['name']+' come to MEAN');
	if(req.session.lastVisit){
		console.log('=========req.session.lastVisit========='+req.session.lastVisit+'============')
	}

	app.post('http://10.20.101.115/appInterface.php?m=sns&s=myCollectGoods&version=3.0', function (req,res,next) {
		
	})
};




