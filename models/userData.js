import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  taskTitle:  {
    type: String,
    required: true,
    trim: true
  },
  taskDescription: {
    type: String,
    required: true,
    trim: true
  },
  assignedTo: {
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Done"],
    default: "Pending"
  },
  createdBy: {
    type: String, 
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("userdata", userDataSchema);
