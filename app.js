const express     = require('express');
const app       = express();
const api       = require('./Route/route');
const bodyParser    = require('body-parser');
const jwt     = require('jsonwebtoken');
const env    = require('dotenv').config();
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');


app.use(express.static("uploads"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//========================= jwt Token =======================================

// Enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
// Get the Access Token
// TODO: Validate the JWT token
app.use((req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            return jwt.verify(token,'secret', (err, userData) => {  
                if(err){
                     res.status(401).json('Please login');
                }else{
                    req.user = {
                        id      : userData.id,
                        email   : userData.email,
                        role_id : userData.role_id,
                        role_type:userData.role_type,
                        company_name:userData.company_name,
                        company_id : userData.company_id,
                        token   : token,
                        exp     : userData.exp
                    }
                }
                return next();
            });
        }
        return res.unauthorized();
    }
    next();
});

//======================== check api for heroku link ========================

app.get('/',(req, res) => {
    res.status(400).send("API is running");
})

app.use('/api',api);

//===================== swagger api ==================================

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT,console.log('Server Run'+process.env.PORT));