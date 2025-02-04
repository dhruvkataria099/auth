import { connect } from 'mongoose'

export const connectDb = async () => {
        try {
            await connect('mongodb://127.0.0.1:27017/jinsserver')
            console.log('db connect')
        } catch (error) {
            console.log(error);     
        }
    }