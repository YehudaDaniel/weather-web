const request = require('postman-request');


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1b064b901e696b2368bd8ebcaebc9867&query='+latitude+','+longitude+'&units=f';

    request( { url, json: true}, (err, { body }) => {
        if(err){
            callback('Unable to connect to Weather service.', undefined);
        }else if(body.error){
            callback('Invalid latitude or longitude was provided. Please check again.', undefined);
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is ' + body.current.temperature + ' degrees out, but feels like ' + body.current.feelslike + ' degrees.');
        }
    });

};

module.exports = forecast;