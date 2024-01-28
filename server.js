const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const cors = require('cors')
const app = express()
const API_KEY =process.env.API_KEY
app.use(express.json())
app.use(cors())


app.post('/api', async(req, res) => {
    const options={
        method: "POST",
        headers:{
            "Authorization":`Bearer ${API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages:[{role:"user",content:req.body.message}],
            max_tokens:200,

        })
    }
try{
    const response = await fetch('https://api.openai.com/v1/chat/completions',options)
    const data  = await response.json()
    res.status('200').send(data)

}catch (error){
    console.log(error)
}
})

// starting the server
app.listen(PORT, () => {
    console.log('Your server  is running on PORT  ' + PORT)
})

