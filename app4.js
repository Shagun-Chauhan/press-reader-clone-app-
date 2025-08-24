const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Allow CORS

// MongoDB connection
const mongoURI = 'mongodb+srv://shagun:shagun2911@cluster.ltcwn.mongodb.net/feedbackDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define Feedback schema and model
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Route to handle feedback submission (POST method)
app.post('/submit-feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save feedback to the database
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();

    console.log('Feedback saved:', newFeedback);
    res.status(200).json({ message: 'Thank you for your feedback!' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ message: 'Error saving feedback' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
