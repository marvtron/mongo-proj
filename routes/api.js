// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID});
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const router = vertex.router();

const Profile = require('../models/Profile');
const Team = require('../models/Team');

router.get('/profile', (req, res) => {
	//const query = req.query;
	let filters = req.query;
	if(req.query.age != null) {
		filters = {
			age: {$gt: req.query.age}
		};
	}

	Profile.find(filters)
	.then(profiles => {
		res.json({
			confirmation:'success!',
			data: profiles
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		});
	});
});
// NON RESTful! should be 'router.put' for update method, but there's no front end to test
// example... http://localhost:3000/api/profile/update?id=5cb4e787cdb3f3c0acee8acd&age=28
router.get('/profile/update', (req, res) => {
	const query = req.query; // require: id & key=value
	const profileId = query.id;
	delete query['id'];

	Profile.findByIdAndUpdate(profileId, query, {new: true})
	.then(profile => {
		res.json({
			confirmation: 'success!',
			data: profile
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail!',
			message: err.message
		});
	});
});

router.get('/profile/delete', (req, res) => {
	const query = req.query;

	Profile.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'success!',
			data: 'Profile ' +query.id+ ' successfully removed'
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail!',
			message: err.message
		});
	});
});

router.get('/profile/:id', (req, res) => {
	const id = req.params.id;

	Profile.findById(id)
	.then(profile => {
		res.json({
			confirmation: 'success!',
			data: profile
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Profile ' + id + 'not found!'
		});
	});
});

router.post('/profile', (req, res) => {

	Profile.create(req.body)
	.then(profile => {
		res.json({
			confirmation: 'success!',
			data: profile
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		});
	});
});
router.get('/teams', (req, res) => {

	Team.find()
	.then(teams => {
		res.json({
			confirmation:'success!',
			data: teams
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		});
	});
});

// NON RESTful should be 'router.put' for update method, but there's no front end to test
// example... http://localhost:3000/api/teams/update?id=5cb4ea07cdb3f3c0acee8b53&league=La%20Liga%20Primera
router.get('/teams/update', (req, res) => {
	const query = req.query; // require: id & key=value
	const teamId = query.id;
	delete query['id'];

	Team.findByIdAndUpdate(teamId, query, {new: true})
	.then(teams => {
		res.json({
			confirmation: 'success!',
			data: teams
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail!',
			message: err.message
		});
	});
});

router.get('/teams/:id', (req, res) => {
	const id = req.params.id;

	Team.findById(id)
	.then(teams => {
		res.json({
			confirmation: 'success!',
			data: teams
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'team ' + id + ' not found!'
		});
	});
});

router.post('/teams', (req, res) => {

	Team.create(req.body)
	.then(teams => {
		res.json({
			confirmation: 'success!',
			data: teams
		});
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		});
	});
	// res.json({
	// 	confirmation: 'success!',
	// 	data: req.body
	// });
});








module.exports = router;
