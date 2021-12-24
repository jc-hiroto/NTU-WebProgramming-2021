const connect_mongo = () => {
  mongoose.connect(process.env.MONGO_URL, {
               useNewUrlParser: true,
               useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
      console.log('connected to mongo');
  });
  return db;
};

export default connect_mongo;