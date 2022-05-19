

module.exports = [
	{
		toDo:"Laundry",
		subToDo:[
			{subTODO:"Put wash in the washing machine", done:false},
			{subTODO:"Put wash in the dryer", done:false},
			{subTODO:"Fold laundry", done:false},
			{subTODO:"Put laundry away", done:false}
			],
		notes:"Don't forget to clean the lint out of the dryer",
		priority:true,
		accomplished:false,
		valueOfAccomplishments:0,
	},
	{
		toDo:"Clean the house",
		subToDo:[
		{subTODO: "Clean bathroom", done:false},
		{subTODO: "Dust", done:false},
		{subTODO: "Vacuum", done:false},
		{subTODO: "Mop", done:false}
		],
		notes:null,
		priority:false,
		accomplished:false,
		valueOfAccomplishments:0,
	},
	{
		toDo:"Yard work",
		subToDo:[
		{subTODO: "Plant Flowers", done:false},
		{subTODO: "Rake Leaves", done:false}
		],
		notes:null,
		priority:true,
		accomplished:false,
		valueOfAccomplshments:0,
	},
	{
		toDo:"Take out Trash",
		subToDo:[
		{subTODO: null, done:null}
		],
		notes:"Don't forget to empty all of the trash cans around the house. Trash is picked up on Monday morning at 8am.",
		priority:false,
		accomplished:false,
		valueOfAccomplishments:0,
	},
]
