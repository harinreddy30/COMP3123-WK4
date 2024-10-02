const express = require('express');
const empRouter = require('./emp') 
const userRouter = require('./user') 
const errorHandlerMiddlewareRouter = require('./errorHandlerMiddleware');
const app = express();
const SERVER_PORT =  process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const loggerMiddleware = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
    next();
}

// Apply the middleware to all requests - Application Level Middleware
app.use('/user',loggerMiddleware);

app.use('/user',userRouter)
app.use('/emp', empRouter)

app.get('/error', (req, res) => {
    throw new Error('This is a forced error');
    res.send('Welcome to Express Error handling');
})

// app.get('/err', (req, res) => {
//     try{
//         throw new Error('This is a forced error');
//     } catch(error){
//         next(error);
//     }
//     res.send('Welcome to Express Error handling');
// })

// hhtp:..localhost:3000
app.get('/', (req, res) =>{
    res.send('Hello World Index');
});

app.get('/about', (req, res) =>{
    res.send('About Us');
})

app.get('/contact', (req, res) =>{
    res.send('Contact Us');
})

app.delete('/hello', (req, res)=>{
    res.status(204)

    res.send('<h1>Delete - Hello World</h1>')
})

app.put('/hello', (req, res)=>{
    res.status(203)

    res.send('<h1>Put - Hello World</h1>')

})

app.get('/student', (req, res) =>{
    res.status(200)
    const stud = {
        name: 'John Doe',
        age: 25,
    }
    res.json(stud);
})

//http://localhost:3000/employee?fnm=Harin&lnm=Reddy
app.get('/employee', (req, res) =>{
    console.log(req.query);
    res.send(req.query);
})

app.get('/employee/:fname/:lnm/:city', (req, res) =>{
    console.log(req.params);
    const fname = req.params.fname;
    const lnm = req.params.lnm;
    const city = req.params.city;
    res.send(`First Name: ${fname}, last Name: ${lnm}, City: ${city}`)
}) 

app.post('/hello', (req, res) => {
    res.send('POST - Hello World');
})

app.use(errorHandlerMiddlewareRouter)

// Listen to the server
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
})