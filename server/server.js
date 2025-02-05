import express from 'express'
import cors from 'cors'
import bcrypt,{hash} from 'bcrypt'
import todosModel from './models/todosModel.js'
import { connectDb } from './dbconnect.js'
import jwt from 'jsonwebtoken'
import { authToken } from './middleware/authMiddleware.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: ["http://localhost:5173","https://auth-3493-4thst1cib-dhruvs-projects-8b6f1d48.vercel.app","https://auth-3493.vercel.app"],
    methods: ['GET',"POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

connectDb()

app.post('/register' , async (req, res) => {
    try {
        const { username, email, password} = req.body;
        if (!username || !email || !password) {
           return res.status(403).send({message : 'all fields are mandatory!'})
        }

        const regex = /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(email)) {
          return res.status(403).send({message : 'Email should be in format!'})      
        }

        const existingUser = await todosModel.findOne({ $or: [{email},{username}] })
        console.log(existingUser);

        if (existingUser) {
            return res.status(401).send({message : "user is aready registered!"})
        }
        
        const hashPassword = await bcrypt.hash(password,10)
       
        const createdUser = await todosModel.create({ username, email, password: hashPassword })
        
        res.send({status : 200, message: createdUser })
      
    } catch (error) {
        res.send({err: error.message})
    }
})

app.post('/login' , async (req, res) => {
    try {
        const { usernameOrEmail , password} = req.body;
        if (!usernameOrEmail || !password) {
           return res.status(403).send({message : 'all fields are mandatory!'})
        }

        const existingUser = await todosModel.findOne({ $or: [{email: usernameOrEmail},{username: usernameOrEmail }] })
        
        if (!existingUser) {
            return res.status(401).send({message : "user is not registered!"})
        }
        if (existingUser.username == usernameOrEmail || existingUser.email == usernameOrEmail) {
            if (await bcrypt.compare(password,existingUser.password)) {
                const obj = { useId : existingUser._id, userEmail: existingUser.email, userUsername: existingUser.username }
               
                const token = jwt.sign(obj,"asdvfgqdfge3445454g5y")
                
                res.cookie('token',token,{
                    httpOnly: true,
                    // secure: true,
                    // sameSite: true
                }).send({success: true, message: 'login success!'})

            }else{
                res.send({success: false, message: 'password is wrong'});
            }   
        }
      
    } catch (error) {
        res.send({err: error.message})
    }
})

app.get('/current', authToken,async (req,res) => {
    try {
        const user = await todosModel.findById(req.userId)
        console.log(user);
        if (user) {
            res.send({status : true})
        }else{
            res.send({status : false})
        }
    } catch (error) {
        console.log(error.message);
        
    }
})

app.post('/logout',async (req,res) => {
    try {
        
        res.clearCookie('token').send({success: true, message: 'logout succ!'})

    } catch (error) {
        console.log(error.message);
        
    }
})
app.get('/',async (req,res) => {
    try {
        
        res.send({message: 'server is live!'})
    } catch (error) {
        console.log(error.message);
        
    }
})

app.listen(8080, () => {
    console.log('server is running!!')
    
})



