const express = require('express')
const router = new express.Router()
const request = require('request');

var url = `http://api.openweathermap.org/data/2.5/weather?q=nashik&units=metric&appid=3871ce670eee463591ba45b74d12ad9d`;
router.post('/weather', (req, res) => {
    const city = req.body.city;
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3871ce670eee463591ba45b74d12ad9d`;
    request(url, function (error, response, body) {
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
        const data = JSON.parse(body);
        var temp = data.main.temp;
        var temp_min = data.main.temp_min;
        var temp_max = data.main.temp_max;
        var city = data.name;
        var country = data.sys.country;
        var status = data.weather[0].main;
        console.log(status);
        res.render('weather', { temp: temp ,city:city, country:country, 
                                minTemp:temp_min, maxTemp:temp_max,
                                status:status});
    });
});


router.get('/weather', (req, res) => {
    request(url, function (error, response, body) {
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
        const data = JSON.parse(body)
        var temp = data.main.temp
        res.render('weather', { temp: 'temp', city: 'city', country:'country'});
    });
})

module.exports = router