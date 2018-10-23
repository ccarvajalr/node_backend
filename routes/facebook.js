var express = require('express');
var config = require('../config/config');
var FB = require('fb');

var app = express();


FB.setAccessToken(config.FacebookAccessToken);
var fb = new FB.Facebook({ timeout: 1, version: 'v3.1' });
var metricasApp = FB.extend({ appId: config.FacebookappId, appSecret: config.FacebookAppSecret });

//===================================
// Obtener todas las cuentas
//===================================
app.get('/accounts', (req, res) => {

    FB.api('me/accounts?type=page', function(resdata) {
        if (!resdata || resdata.error) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Usuario',
                errors: resdata
            });
        }
        //var odd = JSON.stringify(res.data);
        //console.log(odd);
        res.status(200).json({
            ok: true,
            data: resdata.data
        });

        /*console.log(res.data[0].name);
        res.data.forEach(function(page) {
            console.log(page.name);
            console.log(page.id);
        });
       */
    });


});
app.get('/account/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;
    //console.log(id);
    FB.api(id + '?fields=about,name,fan_count,new_like_count', function(fbRes) {

        if (!fbRes || fbRes.error) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al obtener cuenta',
                errors: fbRes.error
            });
        }

        res.status(200).json({
            ok: true,
            data: fbRes
        });

        console.log(fbRes);
    });
})




module.exports = app;