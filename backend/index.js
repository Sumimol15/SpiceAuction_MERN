import express, { response } from "express";
import { PORT, mongoDBURL, saltRounds} from "./config.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {spice} from './models/spiceModel.js'
import { newSpice } from "./models/spices.js"
import { Auction } from "./models/Auction.js";
import { CompanyRegistration } from "./models/CompanyRegistration.js"

const app = express();
app.use(express.json());

//API for company registration


//const CompanyRegistration = require('./CompanyRegistration'); // Import the model

app.post('/companyReg', async (request, response) => {
    try {
        // Check if the required fields are provided
        if (!request.body.companyName || !request.body.registrationNumber || !request.body.email || !request.body.phone) {
            return response.status(400).json({ message: 'Send all required fields' });
        }

        // Create a new instance of the CompanyRegistration model
        const newCompanyRegistration = new CompanyRegistration({
            companyName: request.body.companyName,
            registrationNumber: request.body.registrationNumber,
            contactPerson: request.body.contactPerson,
            email: request.body.email,
            phone: request.body.phone,
            location: request.body.location, // You can add other fields as needed
        });

        // Save the new company registration to the database
        const savedCompany = await newCompanyRegistration.save();

        return response.status(201).json(savedCompany);
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ message: 'Error registering company' });
    }
});

//module.exports = router;


//API for adding to spices
app.post('/addNewSpice', async (request, response) => {
    try {
        if (!request.body.spiceName || !request.body.desc) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        // Create a new instance of the newSpice model
        const newSpiceDetail = new newSpice({
            spiceName: request.body.spiceName,
            desc: request.body.desc,
        });

        // Save the new spice to the database
        const savedSpice = await newSpiceDetail.save();

        return response.status(201).json(savedSpice);
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});
// API to publish new auction

app.post("/createAuction", async (request, response) => {
    try {
      const { spiceName, startDate, endDate } = request.body;
  
      if (!spiceName || !startDate || !endDate) {
        return response.status(400).json({ message: "Send all required fields" });
      }
  
      const newAuction = new Auction({
        spiceName,
        startDate,
        endDate,
        // Add other fields here
      });
  
      const savedAuction = await newAuction.save();
  
      return response.status(201).json(savedAuction);
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ message: error.message });
    }
  });



//API for user registration
app.post('/userReg', async (requset,response) => {
    try{
        if (
            !requset.body.firstname ||
            !requset.body.lastname || 
            !requset.body.email ||
            !requset.body.phone ||
            !requset.body.location ||
            !requset.body.username ||
            !requset.body.password ||
            !requset.body.usertype

        ) {
           return response.status(400).send({
            message : 'Send all req field ',
           });
        }
        const newUser = {
            firstname:requset.body.firstname,
            lastname:requset.body.lastname,
            email:requset.body.email,
            phone:requset.body.phone,
            location:requset.body.location,
            username:requset.body.username,
            password:await bcrypt.hash(requset.body.password, saltRounds),
            usertype:requset.body.usertype,
        };
        const user = await spice.create(newUser)
        return response.status(201).send(user)

        }
        
    
    catch (error){
        console.log(error.message)
        return response.status(500).send({message : error.message,});

    }
});


app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to Spice Auction');
});
// Databse connection
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });