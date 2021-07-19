const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const Joi = require('joi');
const getValidatedUser = require('./utils');


const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'hello world!';
        }
    })

    server.route({
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const payload = request.payload;
            console.log(payload);
            getValidatedUser(request.payload, request.payload.password)
                .then((user) => {
                    if (user) {
                        return 'Auth successful';
                    }
                    else {
                        return Boom.unauthorized('Bad email or password');
                    }
                })
                .catch((err) => {
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