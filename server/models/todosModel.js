import mongoose, { Schema, model } from "mongoose";

const todosSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    } 
})

export default model('todos', todosSchema)

// export default todosModel