const mongoose = require('mongoose')

const ToDoSchema = new mongoose.Schema({
		toDo:{type:String, required:true},
		subToDo:[
		{subTODO:String, done:Boolean},
		{subTODO:String, done:Boolean},
		],
		notes:String,
		priority:Boolean,
		accomplished:Boolean,
		valueOfAccomplishments:Number,
})

const toDoCollection = mongoose.model("ToDo", ToDoSchema)

module.exports = toDoCollection
