import mongoose from "mongoose";

// import {Schema} from "mongoose";

let todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    tasks: [String]
})

// const taskModel = new mongoose.model("Tasks", todoSchema, "usertasks")
// export default taskModel;

export default mongoose.model("Todos", todoSchema, "userTodos");