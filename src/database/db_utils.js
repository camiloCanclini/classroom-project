const pool = require('./db_config')

/**
 * Find a User in the Database.
 *
 * @param {String} email - email user.
 * @param {String} pass - password user.
 * @returns {Object} - Info User
 */

exports.findUser = async (email, pass) => {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
    values: [email, pass],
  };
  return pool.query(query)
    .then((res) => {
      //console.log(res.rows[0])
      if (res.rows.length == 1) {
        return {exists:true, id: res.rows[0].id, name: res.rows[0].name}
      }else{
        return {exists:false}
      }
    }) 
    .catch((err) => {
      console.error('Error executing query', err.stack)
      return {exists:false}
    })
  
};
