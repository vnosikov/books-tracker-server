const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Project = mongoose.model('projects');
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/projects/add', requireLogin, async (req, res) => {
    const project = new Project({
      name: req.body.name,
      _user: req.user.id,
    });

    await project.save();
    res.send(project);
  });

  app.get('/api/projects', requireLogin, async (req, res) => {
    const projects = await Project.find({ _user: req.user.id });
    res.send(projects);
  });

  app.delete('/api/projects/:id', requireLogin, async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).send();
  });

  app.post('/api/projects/current', requireLogin, async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { currentProjectId: req.body.projectId },
      );

      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
};
