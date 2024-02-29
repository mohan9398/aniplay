const express = require('express');
const mongoose = require('mongoose');
const Watch = require('./models/Watch'); 

const app = express();
const PORT = 5000;


mongoose.connect('mongodb://localhost:27017/yourDBName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/aniId', async (req, res) => {
  try {
    const aniId = req.query.aniId;
    if (aniId === null) {
      
      await Watch.deleteOne({ aniId: null });
      res.send('Deleted documents with null aniId');
    } else {
      
      const newAni = new Watch({ aniId });
      await newAni.save();
      res.send('Stored aniId in database');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
