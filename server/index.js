
var express = require('express');
var app = express();
var VKApi = require('node-vkapi');
var VK    = new VKApi({
    app: {
        id: 5251562,
        secret: '6qlM0PxiVvIa5lXjFqUP'
    }
});
var UserModel = require('./mongoose').UserModel;

app.get('/', function (req, res) {


});

app.post('/', function (req, res) {

    for(var i = 0; i < 10; i++){
        var totalLimit = 3000000;
        var currentPartLimit = 3000000/10;
        var offset = currentPartLimit * i;
        var currentPartEnd = offset+currentPartLimit;
        var currentReq = 0;

        console.log(totalLimit, currentPartLimit, offset, currentPartEnd, currentReq);
        importUsers(res, totalLimit, currentPartLimit, offset, currentPartEnd, currentReq);
    }
});

var fatchedCount = 0;
var fatchedResult = [];

app.post('/getUsers', function(req, res){
    UserModel.aggregate([
        {
            $match: {
                "country.title": { "$exists": true, "$ne": null }
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
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});


function importUsers(res, totalLimit, currentPartLimit, offset, currentPartEnd, currentRequest) {

    var limit = 1000;

    VK.call('groups.getMembers', {
        group_id: '40567146',
        count: limit,
        offset: offset,
        fields: 'country,city'
    }).then(function(result){
        //console.log(result);
        fatchedCount += result.items.length;
        console.log('total fatrched: ', fatchedCount);

        UserModel.insertMany(result.items, function(err, result){
           // console.log(result);
        });


        var newOffset = offset+limit;
        console.log('new offset:', newOffset);

        var newCurrentRequest = currentRequest+1;

        console.log('new current request:', newCurrentRequest);

        if(fatchedCount >= totalLimit){
            console.log("finish limit", totalLimit);
            return res.send("Count:"+fatchedCount);
        }else if(newOffset >= currentPartEnd){
           console.log("finish offset", newOffset);
            return;
        }else{
            importUsers(res, totalLimit, currentPartLimit, newOffset, currentPartEnd, newCurrentRequest);

        }


        //
    }).catch(function(err){
        console.log(err);
    });
}


app.listen(3000, function () {
    console.log('Server listening on port 3000!');
});
