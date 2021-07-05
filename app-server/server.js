const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const Joi = require('joi');
const getValidatedUser = require('./utils');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    server.auth.strategy('base', 'cookie', {
        password: 'supersecretpassword', // cookie secret
        cookie: 'app-cookie', // Cookie name
        ttl: 24 * 60 * 60 * 1000 // Set session to 1 day
    })
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World';
        }
    });
    server.route({
        method: 'POST',
        path: '/login',
        config: {
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string.min(2).max(200).required()
                }
            }
        },
        handler: function (request, reply) {
            getValidatedUser(request.payload.email, request.payload.password)
                .then(function (user) {
                    if (user) {
                        request.auth.session.set(user);
                        return 'Auth successful';
                    }
                    else {
                        return Boom.unauthorized('Bad email or password');
                    }
                })
                .catch(function (err) {
                    return reply(Boom.badImplementation);
                })
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();