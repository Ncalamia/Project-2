const mongoose = require('mongoose')

const AffirmationSchema = new mongoose.Schema({
	message: {type:String, required:true},
})

const affirmationCollection = mongoose.model("Affirmation", AffirmationSchema)

module.exports = affirmationCollection
