module.exports = function ( app ) {
    app.get('/login',function(req,res){
        res.render('login');
    });

    app.post('/login',function(req,res){
        var user={
            username:'admin',
            password:'admin'
        }
        if(req.body.username==user.username&&req.body.password==user.password){
            req.session.user = user;
            res.send(200);
        }else{
            req.session.error = "用户名或密码不正确"
            res.send( 404 );
        }
    });
}