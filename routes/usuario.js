//Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');
//var SEED = require('../config/config').SEED;

var app = express();


var Usuario = require('../models/usuario');

//Rutas

//========================================
// Obtener todos los usuarios
//========================================
app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role').exec((err, usuarios) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando Usuarios',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarios
        });
    });

});

//========================================
// Crear nuevo usuarios
//========================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            //console.error('Error', err);
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });
    });
});


//========================================
// Actualizar usuarios
//========================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            //console.error('Error', err);
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Usuario',
                errors: err
            });
        }

        if (!usuario) {
            //console.error('Error', err);
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el ' + id + ' no existe',
                errors: { message: 'No existe usuario con ese id' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioUpdate) => {

            if (err) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Usuario',
                    errors: err
                });
            }
            usuarioUpdate.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioUpdate
            });

        });

    });
});

//========================================
// Borrar usuario por id
//========================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar Usuario',
                errors: err
            });
        }
        if (!usuarioBorrado) {

            return res.status(500).json({
                ok: false,
                mensaje: 'No existe un Usuario',
                errors: { message: 'No existe un Usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

module.exports = app;