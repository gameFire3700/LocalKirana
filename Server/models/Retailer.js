const mongoose = require('mongoose');

//Define the schema(Structure Of Retailer Collection)
const retailerSchema = new mongoose.Schema({

  retailer_id:{
    
    type: Number,
    required: true,           // field must be provided
    unique: true,             // no duplicates allowed
    index: true              // make it searchable
  },
  name:{

    type: String,
    required: [true, "Retailer name is required"],
    trim: true               // removes extra spaces   

  },
  contact:{

    type: String,
    required: [true, "Contact number is required"],
    match: [/^[0-9]{10}$/, "Contact number must be 10 digits"]  // validation            
  },
  email: {
  type: String,
  required: [true, "Email is required"],
  unique: true,
  lowercase: true,
  trim: true,
  match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"]
}
,
  gst_no :{

    type: String,
    required: [true, "GST number is required"],
    unique: true,
    uppercase: true,
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST format"]

  },
  shop_addresses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    
  registration_data:{
  
    type: Date,
    default: Date.now,       // auto-fill with current date
    required: [true, "Registration date is required"]

  },
  is_active: { type: Boolean, default: true },
  created_by: { type: String },
  updated_by: { type: String }

},
  { timestamps: true }); //created at updated at automatically

  // Indexes for search
retailerSchema.index({ name: 1 });
retailerSchema.index({ shop_address: "text" });

  //create model
  const Retailer = mongoose.model('Retailer' , retailerSchema,'retailers');

  //export
  module.exports= Retailer;
  
