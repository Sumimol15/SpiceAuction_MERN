
import mongoose from "mongoose";

const companyRegistrationSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: String,
    
});

const CompanyRegistration = mongoose.model('CompanyRegistration', companyRegistrationSchema);

export {CompanyRegistration};