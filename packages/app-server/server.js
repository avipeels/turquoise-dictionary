const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const getUser = require('../db-server/dist/index').getUser;

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ["*"],
            }
        }
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
        handler: async (request, reply) => {
            try {
                const isValidUser = await getUser(request.payload.email, request.payload.password);
                if (!isValidUser) {
                    return Boom.unauthorized('Bad email or password');
                }
                return isValidUser;
            }
            catch (e) {
                return e;
            }
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