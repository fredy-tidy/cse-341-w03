const swaggerAutogen = require('swagger-autogen');

const doc = {
     info: {
        title: 'User Api',
        description: 'Users Api'
     },
     host: 'localhost:3000',
     schemes: ['http', 'https']
};

const outputfile = './swagger.json';
const endpointsfiles = ['./routes/courses.js'];

// this will generate swagger.json

swaggerAutogen(outputfile,endpointsfiles, doc)