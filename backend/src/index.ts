import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import bcrypt from 'bcrypt'
import { mainRouter } from './routes/mainRouter'

dotenv.config()


const app = express()
const PORT = process.env.PORT || 3002;

app.use(express.json())
app.use(cors())
app.use(helmet())

app.get("/", async (req: any, res: any) => {
    return res.json({message:"HElath cheack"}
  )
})

app.use("/api/v1", mainRouter)

app.listen(PORT, () => {
    
  console.log(`server listening to port ${PORT}`)

})



