const passport = require('passport');
const requireLogin = require('../middleware/requireLogin');


module.exports = app => {
  app.post('/api/projects/add', requireLogin, async (req, res) => {
    req.user.projects.push(req.body.name);
    const user = await req.user.save();

    console.log('CHECK: ', user);
    res.send(user);
  });
}
