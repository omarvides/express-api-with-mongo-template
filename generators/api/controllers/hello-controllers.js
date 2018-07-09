function helloController(req, res) {
  return res.json({ hello: 'world' });
}

module.exports = { helloController };
