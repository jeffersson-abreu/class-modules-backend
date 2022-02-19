const jwt = require('jsonwebtoken');


// Permit access for authenticated users only
module.exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ 'message': 'Authenticação necessária' });
  }

  const parts = authHeader.split(' ');

  if (parts.length < 2) {
    return res.status(400).send({ 'message': 'Token incompleto' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(400).send({ 'error': 'Token malformado' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(400).send({ 'error': 'Token inválido ou expirado' });
    }

    req.user = { id: decoded.id }
    return next();
  })
}
