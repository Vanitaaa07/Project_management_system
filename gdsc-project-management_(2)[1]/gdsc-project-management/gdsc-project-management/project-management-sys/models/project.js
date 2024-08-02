const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    githubLink: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    liveLink: { 
        type: String, 
        optional: true
    },
    techStack: { 
        type: String, 
        optional: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Project',projectSchema);