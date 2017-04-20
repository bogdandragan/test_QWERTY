
var express = require('express');
var app = express();
var VKApi = require('node-vkapi');
var VK    = new VKApi({
    app: {
        id: 5251562,
        secret: '6qlM0PxiVvIa5lXjFqUP'
    }
});

app.get('/', function (req, res) {


    VK.call('groups.getMembers', {
        group_id: '40567146',
        count: '1000',
        offset: '1100000',
        fields: 'country,city'
    }).then(function(result){
        console.log(result);
        res.send(result);
    }).catch(function(err){
        console.log(err);
    });


});

app.listen(3000, function () {
    console.log('Server listening on port 3000!');
});
