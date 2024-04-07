import mongoose from 'mongoose';


export default async function connect() {
    try {
        await mongoose.connect("mongodb+srv://test:123@cluster0.gwqg2c4.mongodb.net/");
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}