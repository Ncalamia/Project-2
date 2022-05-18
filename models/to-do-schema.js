const mongoose = require('mongoose')

const ToDoSchema = new mongoose.Schema({
		toDo:{type:String, required:true},
		subToDo:[String],
		notes:String,
		priority:Boolean,
		accomplished:Boolean,
})

const toDoCollection = mongoose.model("ToDo", ToDoSchema)

module.exports = toDoCollection
