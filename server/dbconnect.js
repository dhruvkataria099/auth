import { connect } from 'mongoose'

export const connectDb = async () => {
        try {
            await connect('mongodb+srv://drowjin:123455678@atlascluster.rvfn5z6.mongodb.net/jinsserver?retryWrites=true&w=majority&appName=AtlasCluster')
            console.log('db connect')
        } catch (error) {
            console.log(error);     
        }
    }