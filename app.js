const exp = require('express');
const app = exp();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const https = require('https');

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");

  //var url = "https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&appid=f0320ed94d3f9c5f39fd0dd4c54cbfee"
  // https.get(url, function(response){
  //   console.log(response.statusCode);
  //   response.on("data",function(data){
  //     const weatherData = JSON.parse(data);
  //     var temp = weatherData.main.temp;
  //     var desc = weatherData.weather[0].description;
  //     var icon = weatherData.weather[0].icon;
  //     res.write("<h1>Temperature in Paris is: "+temp+ "degree Celcius</h1>");
  //     res.write("<h2>Description: "+desc+"</h2>");
  //     res.write('<img src= "http://openweathermap.org/img/wn/'+icon+'@2x.png">')
  //     res.send();
  //   });
  // });
});

app.post("/", function(req, res){
  var city = req.body.city.toLowerCase();
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+ "&units=metric&appid=f0320ed94d3f9c5f39fd0dd4c54cbfee";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var desc = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
      res.write("<h1>Temperature in "+city.toUpperCase()+" is: "+temp+ " Degree Celcius</h1>");
      res.write("<h2>Description: "+desc+"</h2>");
      res.write('<img src= "http://openweathermap.org/img/wn/'+icon+'@2x.png">')
      res.send();
    });
  });
})


app.listen(3000, function(){
  console.log('Server is running on port 3000');
});
