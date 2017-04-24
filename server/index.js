var express = require('express');
var app = express();
var config = require('./config');
var VKApi = require('node-vkapi');
var VK    = new VKApi({
    app: {
        id: 5251562,
        secret: '6qlM0PxiVvIa5lXjFqUP'
    }
});
var UserModel = require('./mongoose').UserModel;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var fetchedCount = 0;

app.post('/importVKUsers', function (req, res) {
    fetchedCount = 0;
    // Total users to import
    var totalLimit = 3000000;
    // Request threads to run
    var threads = 5;

    for(var i = 0; i < threads; i++){
        var currentPartLimit = totalLimit/threads;
        var offset = currentPartLimit * i;
        var currentPartEnd = offset+currentPartLimit;
        var currentReq = 0;

        //console.log(totalLimit, currentPartLimit, offset, currentPartEnd, currentReq);
        importUsers(res, totalLimit, currentPartLimit, offset, currentPartEnd, currentReq);
    }
});


app.post('/getUsers', function(req, res){
    UserModel.aggregate([
        {
            $match: {
                "country.title": { "$exists": true, "$ne": null, "$ne": "" }
            }
        },
        {
            $group: {
                _id: '$country.title',
                country : { $first: "$country.title" },
                count: {$sum: 1}
            }
        }
    ], function (err, result) {
        if (err) {
            console.log(result);
            res.sendStatus(500);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

function importUsers(res, totalLimit, currentPartLimit, offset, currentPartEnd, currentRequest) {

    //Max users that can be fetched in one request (VK API Limit)
    var limit = 1000;

    VK.call('groups.getMembers', {
        group_id: '40567146',
        count: limit,
        offset: offset,
        fields: 'country,city',
        lang: 'en'
    }).then(function(result){
        fetchedCount += result.items.length;
        console.log('total fetched: ', fetchedCount);

        //Save fetched users to DB
        UserModel.insertMany(result.items, function(err, result){
            if(err){
                console.log(err.toString());
            }
        });

        //Update offset
        var newOffset = offset+limit;
        console.log('new offset:', newOffset);

        var newCurrentRequest = currentRequest+1;
        console.log('new current request:', newCurrentRequest);

        if(fetchedCount >= totalLimit){
            console.log("finish limit", totalLimit);
            return res.send("Imported: " + fetchedCount + " users");
        }else if(newOffset >= currentPartEnd){
            console.log("finish offset", newOffset);
            return;
        }else{
            importUsers(res, totalLimit, currentPartLimit, newOffset, currentPartEnd, newCurrentRequest);

        }
    }).catch(function(err){
        console.log(err);
    });
}


app.listen(config.port, function () {
    console.log('Server listening on port '+config.port);
});
