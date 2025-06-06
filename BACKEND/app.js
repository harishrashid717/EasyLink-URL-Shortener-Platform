import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import urlRoute from './src/routes/urlRoutes.js'
import pool from './src/db/connections.js';
import redirectToFullUrl from './src/controller/reDirecttoFullUrl.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res)=>{
    res.send('Home page');
})
app.use('/url', urlRoute);

app.get('/:id', redirectToFullUrl);

app.get('/dbCheck', async(req, res)=>{
    const [rows] = await pool.query('SELECT * FROM short_url_table WHERE id = ?' , [1]);
    return res.json({data : rows[0]});
})
// 404 Route handler middleware
app.use((req, res)=>{

    res.status(404).json({
        sucess : false,
        message : 'Route Not Found'
    })
})

// error handler middleware
app.use((err, req, res, next)=>{
    return res.json({err});
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        success : false,
        message,
        errors: err.details || null
    });
})

app.listen(3000, ()=>{
    console.log('Server started at port 3000');
});