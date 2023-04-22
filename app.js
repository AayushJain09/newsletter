//jshint esversion: 6

const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const request = require("request")
const { post } = require("request")
const { response } = require("express")

const app = express()

// static files (images , css , etc.) renderring
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.eName

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]

    }

    const jsonData = JSON.stringify(data)

    const url= ""

    const options = {
        method: "post",
        auth: ""
    }

    const request = https.request(url, options, function(request){
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end()

})

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen( process.env.PORT || 3000 , function(){
    console.log("server running on port 3000");
})
