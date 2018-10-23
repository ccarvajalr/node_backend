var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'rayaapp.mysql.database.azure.com',
    user: 'raya-admin@rayaapp',
    password: 'Cotorras16db',
    database: 'appmetricas',
    port: 3306
});

module.exports = connection;