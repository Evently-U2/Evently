//imports
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const cors = require('cors')

const cookieParser = require('cookie-parser')

const connectDB = require('./db/connect')


//routes
const routes = require('./routes/index')


//middlewares
const middlewares  = require('./middlewares/index')


//variables
const PORT = process.env.PORT || 5000






//middlewares

// app.use(express.static('./public'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())




//routes

app.use('/register', routes.registeration)
app.use('/login', middlewares.auth, routes.login)
app.use('/events', routes.events)
app.use('/teams', middlewares.auth, routes.teams)



    //temp
      app.get('/', (req,res)=>{

          res.send("<h1>Evently - Landing Page</h1>")

      })


// app.post('/auth/login/uday', (req,res) => {
//   console.log()
//   res.send(JSON.stringify({
//     isValid:true,
//     user: {
//       name: 'Uday',
//       email: 'udaykpatel2004@gmail.com'
//     },
//     token: 'xyz'
    
//   }));
// });





//errors

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)





const start = async () => {

  try {

    await connectDB(process.env.MONGODB_URI);
    
    app.listen(PORT, () => console.log(`Server is running at http://127.0.0.1:${PORT}`) )

  } catch (error) {

    console.log(error)
  
  }
}
  
start()