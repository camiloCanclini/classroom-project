const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

function configureLogging(app) {
  // Configurar la rotación diaria de archivos para los logs de usuarios normales
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
  });

  // Configurar la rotación diaria de archivos para los logs de usuarios administradores
  const adminLogStream = rfs.createStream('admin.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
  });

  // Función para filtrar las solicitudes de usuarios administradores
  function isAdmin(req) {
    // Lógica para determinar si el usuario es administrador
    return req.user && req.user.isAdmin;
  }

  // Configurar Morgan para que escriba en el archivo de registro correspondiente
  app.use(morgan('combined', { stream: accessLogStream, skip: isAdmin }));
  app.use(morgan('combined', { stream: adminLogStream, skip: (req) => !isAdmin(req) }));
}

module.exports = configureLogging;
