var express=require('express');
var moment=require('moment');
var path=require('path');
var app=express();
var port=3000;
var unix,time =null;

app.use(express.static(path.join(__dirname,'public')))

app.get('/time/:q',function(request,response){
  // var date=new Date();
  var query=request.params.q;
  if (+query >= 0){
    time=GeneralTime(+query);
    unix=query;
  }

  else if(moment(query, "MMMM D, YYYY").isValid()&&isNaN(+query)){
    time=query;
    unix=UnixTime(query);
  }
response.send({"Unix":unix,"Time":time});
});

app.get('/index',(req,res)=>{
  res.sendFile(path.join(__dirname,'public','index.html'))
})


var server=app.listen(process.env.PORT || '8080', function(){
  console.log('Time stamp is listening on the port %s', server.address().port);
  console.log('Ctrl +++++++ C to stop the server hahahahhahahha')
})

function UnixTime(date){
return moment(date, "MMMM D, YYYY").format("X");
}

function GeneralTime(date){
return moment.unix(unix).format("MMMM D, YYYY");
}
