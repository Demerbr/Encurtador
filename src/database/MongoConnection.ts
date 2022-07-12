import { config } from "../config/Constants"
import mongoose from "mongoose"



class MongoConnection {
    public async connect(): Promise<void>{
        try{

            await mongoose.connect(config.MONGO_CONNECTION)
            console.log("Database Connect")

        } catch(err){
            console.log(err.message)
            process.exit(1)
        }
    }
}

export { MongoConnection }