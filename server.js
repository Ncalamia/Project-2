//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
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


// New page
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

// Update
app.put('/to-do/:id', (req, res) => {
	if(req.body.priority === 'on'){
			req.body.priority = true;
	} else {
			req.body.priority = false;
	}
	ToDoSchema.findByIdAndUpdate(req.params.id, req.body, {
		new: true}, (err, updatedToDo) => {
			// res.send(updatedToDo)
		res.redirect('/to-do')
	})
})


// // Delete
// app.delete('/pokedex/:id', (req, res) => {
// 	PokeSchema.findByIdAndRemove(req.params.id, (err, data) => {
// 		res.redirect('/pokedex')
// 	})
// })

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


// Adding new to do
app.post('/to-do', (req, res) => {
	if(req.body.priority === 'on'){
			req.body.priority = true;
	} else {
			req.body.priority = false;
	}
  ToDoSchema.create(req.body, (error, createdToDo) => {
		console.log(req.body);
		console.log(createdToDo);
      res.redirect('/to-do')
    })
})




//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
