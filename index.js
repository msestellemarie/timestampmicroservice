var path = require('path');
var express = require('express');
var app = express();

app.listen(process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, "public")));

app.get('/:id', function(req, res){
  var dateStr = req.params.id;
  if(isNaN(Number(dateStr))){
    var date = new Date(dateStr);
  }
  else {
    var date = new Date(Number(dateStr)*1000);
  }
  if(date.toString() === "Invalid Date"){
    res.send(
      {
        natural: "null",
        unix: "null"
      }
    )
  }
  else {
    res.send(
      {
        natural: date.toLocaleDateString('en-US',{year:'numeric', month:'long', day:'numeric'}),
        unix: Number((date.valueOf()/1000).toFixed(0))
      }
    )
  }
});
