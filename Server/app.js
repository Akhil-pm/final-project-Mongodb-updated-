const express = require('express')
const bodyParser = require('body-parser')
const cors= require('cors')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

const PlacesData = require('./src/model/Placesdata')
const SignupData = require('./src/model/Signupdata')
const Travel_reg_Data = require('./src/model/Travel-reg-data')

var app = new express();

app.use(cors());
app.use(bodyParser.json())

//**********Loading list of containment zones********* */
app.get('/places',function(req,res){

    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log("get")
    PlacesData.find().sort({_id:-1})
             .then(function(places){
                 res.send(places)
             })
})
//******************************************************** */



//**********Admin adds new containment zones********* */
app.post('/add',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')

    console.log("Post request recieved")

    var newzone={
        place : req.body.data.place,
        taluk : req.body.data.taluk,
        duration : req.body.data.duration,
        note : req.body.data.note
    }
    console.log(newzone)
    var newData= new PlacesData(newzone);
    newData.save((err,doc)=>{
        if(err){console.log("Error Occured")}
        else{res.status(200).send(doc)}
    })           
})
//******************************************************** */


//**********Admin deletes ********* */
app.delete('/delete/:id',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')

    // console.log(req.params.id)
    PlacesData.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err){res.send(doc)}
        else{console.log("Error")}
    })

})
//******************************************************** */


//**********Admin edits containment zones********* */
app.put('/edit',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')

    console.log(" server called ")

    console.log("id: "+req.body.data._id)

    const id= req.body.data._id

    var editItem={
        place : req.body.data.place,
        taluk : req.body.data.taluk,
        duration : req.body.data.duration,
        note : req.body.data.note
    }

    console.log(editItem)

    PlacesData.findByIdAndUpdate(id,{ $set: editItem },(err,doc)=>{
        if(!err){res.send(doc)}
        else{console.log("Error")}
    });
})
//******************************************************** */



//**********Sign-Up********* */
app.post('/signup',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    let email=req.body.email;
    console.log(email)
    SignupData.find({email:email},(err,doc)=>{
        if(err){console.log(err)}
        else
        {
            if(doc.length!=0)
            {
                res.json({exists:"true"})
            }
            else
            {
                if(email==="admin123@gmail.com")
                {
                    var userData={
                        name:req.body.name,
                        username:req.body.username,
                        phoneNo: req.body.phoneNo,
                        email:req.body.email,
                        password: req.body.password,
                        role:"admin"
                    }
                    let user=new SignupData(userData)
                    user.save((err,doc)=>{
                        if(err){console.log(err)}
                        else{
                          let payload = {subject:doc._id,userType:doc.role}
                          let token = jwt.sign(payload,'secretKey')
                            res.json({exists:"false","token":token,"user":doc})
                         }
                        })
                }
                else{
                    let userData =req.body;
                  let user=new SignupData(userData)
                  user.save((err,doc)=>{
                    if(err){console.log(err)}
                    else{
                      let payload = {subject:doc._id,userType:doc.role}
                      let token = jwt.sign(payload,'secretKey')
                        res.json({exists:"false","token":token,"user":doc})
                     }
                    })
                }            
            }           
        }
    })  
})
//******************************************************** */


//**********Login********* */
app.post('/login',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')

    let email=req.body.email
    let password = req.body.password

    console.log(email+','+password)

    SignupData.findOne({email:email},(err,user)=>{
          if(err){console.log(err)}
          else{
              if(!user)
              {
                // console.log("check0")
                return res.status(401).send('invalid email')
              }
              else{
                // console.log("check1")
                  if(user.password!=password){
                    // console.log("check2")
                    res.status(401).send("invalid password")
                  }
                  else{
                    let payload = {subject:user._id,userType:user.role}
                    let token = jwt.sign(payload,'secretKey')
                     res.status(200).json({"token":token,"user":user})
                    //  console.log("check3")
                  }
              }
          }

        })    
})
//******************************************************** */


//**********User registers for travel permission********* */
let counter = 000

app.post('/register',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')

    console.log("Post request recieved")
       let dest = req.body.dest
       let co_pass = req.body.co_pass
       let vehicleType = req.body.vehicleType

       if(co_pass==null)
       {
        var num=0;
       }
       if(co_pass!=null){
        var num=co_pass.split(",")
       }

    console.log(dest)
    PlacesData.findOne({place:{$regex: new RegExp('^'+dest+ '$',"i")}},(err,doc)=>{
        if(err)
        {
            console.log("Error") 
        }
        else{
            if(doc)
            {
                console.log(doc)
                res.json({"msg":`ENTRY BLOCKED - ${dest} is containment zone`,flag:"false"})
                
            }
            else{
                // console.log(co_passengers)
                // console.log(num.length)
                if((vehicleType=== "2 wheeler" && num.length>1)||(vehicleType=== "3 wheeler" && num.length>2)||(vehicleType=== "4 wheeler" && num.length>2))
                {
                    res.json({"msg":"Accompany only specified number of people",flag:"false"})
                }
                else
                {
                    counter++
                    console.log(counter)

                    var data={
                            name : req.body.name,
                            email : req.body.email,
                            phoneNo : req.body.phoneNo,
                            destination : req.body.dest,
                            address : req.body.addr,
                            dest_address : req.body.dest_addr,
                            co_passengers : req.body.co_pass,
                            date : req.body.date,
                            time : req.body.time,
                            vehicleNo : req.body.vehicleNo,
                            vehicleType : req.body.vehicleType,
                            driver_name : req.body.driver_name,
                            reason : req.body.reason,
                            token_no: `TVM-00${counter}`,
                            approved:false
                          }
                    let travel_reg = Travel_reg_Data(data);
                    travel_reg.save((err,doc)=>{
                        if(err){console.log(err)}
                        else{
                            res.json({"msg":`entry to ${dest} is registered with token number ${data.token_no}`,flag:"true","data":doc})
                          
                         }
                        })                
                }                
            }
        }        
    })          
})
//******************************************************** */


//**********Admin views the list of applications by user ********* */
app.get('/list',verifyToken,function(req,res){

    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log("get")
    Travel_reg_Data.find()
             .then(function(data){
                 res.send(data)
             })
})
//******************************************************** */


//**********Admin approves the applications by user ********* */
app.post('/approve',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    let user=req.body

    const id=req.body._id 

    console.log("workd")
    sendMail(user,info=>{
      console.log("success")
      console.log(user)
      console.log(info.messageId)
      Travel_reg_Data.findByIdAndUpdate(id,{ $set: user },(err,doc)=>{
         if(!err){res.send(doc)}
        else{console.log("Error")}
          });
     })
})
//******************************************************** */



//********** Function to send email notification to applicants on approval ********* */
async function sendMail(user,callback)
{
    console.log(user.token_no)
    var transporter = nodemailer.createTransport({
        // service: "Gmail",
        host: "smtp.mailtrap.io",                    //mailtrap is used only for testing purpose 
        port:587,                                    //To send mail to user in real use real email and password
        secure: false,
        auth: {
          user: "b1949c493b35e3",
          pass: "82a5eef6dad98d"
        }

      });

      let mailOptions = {
        from: "for_test87@outlook.com", 
        to: user.email, 
        subject: "Travel application approved", 
        text:  `Your travel to ${user.dest} is approved with token number ${user.token_no}`
     };

   let info= await transporter.sendMail(mailOptions) 
   callback(info)
}
//******************************************************** */




//********** Function to verify the token ********* */
function verifyToken(req,res,next)
{
    // console.log("0")
    // console.log(req.headers.authorization)
 if(!req.headers.authorization)
 {
    //  console.log("1")
     return res.status(401).send('Unauthorized request')
 }
   let token = req.headers.authorization.split(' ')[1]
   if(token==='null')
   {
    //    console.log("2")
    return res.status(401).send('Unauthorized request')
   } 
      let payload=jwt.verify(token,'secretKey')
    //   console.log(payload)
      if(!payload)
      {
        return res.status(401).send('Unauthorized request')
      }
         req.userData={userId:payload.subject,userType:payload.userType}
         next()
}
//******************************************************** */


const port = 3000;
app.listen(port,function(){

    console.log("Server port : "+port)
})
