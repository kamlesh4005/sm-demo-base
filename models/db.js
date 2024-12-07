const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // const mongodbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@${process.env.PROJECT}.mongodb.net/gohighlevel?retryWrites=true&w=majority`;
    // const mongodbURI = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.PASSWORD}@${process.env.PROJECT}.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;
    // await mongoose.connect(mongodbURI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // });
    // console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
