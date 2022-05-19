//___________________
//Dependencies
//___________________
const express = require('express')
const methodOverride  = require('method-override')
const mongoose = require ('mongoose')
const ToDoSchema = require('./models/to-do-schema.js')
const AffirmationSchema = require('./models/affirmations-schema.js')
const seedDataToDos = require('./models/to-do-data.js')
const seedDataAffirmations = require('./models/affirmations-data.js')

const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , () => {
	console.log('connected to mongo')
})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes


// Adding Seed Data for to-dos
app.get('/to-do/seed', (req,res) => {
	ToDoSchema.create(seedDataToDos, (err, createSeedDataToDos) => {
			res.redirect('/to-do')
		}
	)
})


// Adding Seed Data for affiramtions
app.get('/to-do/seed2', (req,res) => {
	AffirmationSchema.create(seedDataAffirmations, (err, createSeedDataAffirmations) => {
			res.redirect('/to-do')
		}
	)
})


// New To Do page
app.get('/to-do/new', (req, res) => {
	res.render('new.ejs');
});



// Home page
app.get('/to-do', (req, res) => {
	if(req.body.priority === 'on'){
			req.body.priority = true;
	} else {
			req.body.priority = false;
	}
	ToDoSchema.find({}, (err, allToDos) => {
	AffirmationSchema.find({}, (err, oneAffirmation) => {
			res.render(
				'index.ejs',
					{
						toDos: allToDos,
						affirmation: oneAffirmation
					}
				)
		})
	})
})

// // Show-accomplished page
// app.get('/to-do/accomplished', (req, res) => {
// 	ToDoSchema.findById(req.params.id, (err,accomplishedToDos) => {
// 		console.log(req.body);
// 			res.render(
// 				'show-accomplished.ejs',
// 					{
// 						accomplished: accomplishedToDos
// 					}
// 				)
// 		})
// 	})


// Edit page
app.get('/to-do/:id/edit', (req, res) => {
		ToDoSchema.findById(req.params.id, (err,foundToDo) => {
			res.render(
				'edit.ejs',
			{
				toDo:foundToDo
			}
		)
	})
})

//Edit subToDos page
app.get('/to-do/:id/editSubToDo', (req, res) => {
		ToDoSchema.findById(req.params.id, (err,foundToDo) => {
			res.render(
				'editSubToDo.ejs',
			{
				toDo:foundToDo
			}
		)
	})
})


// show page
	app.get('/to-do/:id', (req, res) => {
		if(req.body.priority === 'on'){
				req.body.priority = true;
		} else {
				req.body.priority = false;
		}
	ToDoSchema.findById(req.params.id, (err, foundToDo) => {
				res.render(
					'show.ejs',
					{
						toDo: foundToDo
					}
				)
			})
	})


// //Update to do on show page
// app.put('/to-do/:id', (req, res) => {
// 	if (req.body.id = { checkbox: [ 'checkbox'] }) {
// 		console.log("Hello");
// 	}
// 		ToDoSchema.findByIdAndUpdate(req.params.id, req.body, {
// 			new: true}, (err, updatedToDo) => {
// 				console.log(req.body.id);
// 				console.log(req.body);
// 				res.send('/to-do')
// 			// res.redirect('/to-do/:id')
// 		})
// 	})

// Adding new to do
app.post('/to-do', (req, res) => {
	console.log(req.body.subToDo);
	if(req.body.priority === 'on'){
			req.body.priority = true;
	} else if(req.body.priority ==='off'){
			req.body.priority = false;
	}
	let subToDoToAdd0 = req.body.subToDo0
	let subToDoToAdd1 = req.body.subToDo1
	let subToDoToAdd2 = req.body.subToDo2
	let subToDoToAdd3 = req.body.subToDo3
	let subToDoToAdd4 = req.body.subToDo4
	let subToDoToAdd5 = req.body.subToDo5
	let subToDoToAdd6 = req.body.subToDo6
	let subToDoToAdd7 = req.body.subToDo7
	let subToDoToAdd8 = req.body.subToDo8
	let subToDoToAdd9 = req.body.subToDo9
	let subToDoToAdd10 = req.body.subToDo10

req.body.subToDo = [{
		subTODO:subToDoToAdd0,
		done:false
},
{
	subTODO:subToDoToAdd1,
	done:false
},
{
	subTODO:subToDoToAdd2,
	done:false
},
{
	subTODO:subToDoToAdd3,
	done:false
},
{
	subTODO:subToDoToAdd4,
	done:false
},
{
	subTODO:subToDoToAdd5,
	done:false
},
{
	subTODO:subToDoToAdd6,
	done:false
},
{
	subTODO:subToDoToAdd7,
	done:false
},
{
	subTODO:subToDoToAdd8,
	done:false
},
{
	subTODO:subToDoToAdd9,
	done:false
},
{
	subTODO:subToDoToAdd10,
	done:false
}]

  ToDoSchema.create(req.body, (error, createdToDo) => {
		console.log(req.body.priority);
		console.log(req.body);
		console.log(req.body.subToDo);
		// res.send('/to-do/new')
		res.redirect('/to-do')
	})
})


// Update/Edit
app.put('/to-do/:id', (req, res) => {
	if(req.body.priority === 'on'){
			req.body.priority = true
	} else {
			req.body.priority = false
	}
ToDoSchema.findByIdAndUpdate(req.params.id, req.body, {
	new: true}, (err, updatedToDo) => {
			// res.send(updatedToDo)
			console.log(updatedToDo);
		res.redirect('/to-do')
	})
})


// Delete
app.delete('/to-do/:id', (req, res) => {
	ToDoSchema.findByIdAndRemove(req.params.id, (err, data) => {
		res.redirect('/to-do')
	})
})




// // Adding new to do
// app.post('/to-do/newToDo', (req, res) => {
// 	if(req.body.priority === 'on'){
// 			req.body.priority = true;
// 	} else {
// 			req.body.priority = false;
// 	}
//   ToDoSchema.create(req.body, (error, createdToDo) => {
// 		res.send('/to-do/newsubToDo')
//     })
// })


// //Adding accomplishment to show-accomplished page
// app.put('/to-do', (req, res) => {
// 	ToDoSchema.findByIdAndUpdate(req.params.id, req.body, {
// 		new: true}, (err, accomplishedToDo) => {
// 			console.log(req.params);
// 			res.send('/to-do')
// 			res.redirect('/to-do/accomplished')
// 		})
// })


//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
