const pg = require('pg')
const client = new pg.Client({
    connectionString: process.env.DATABASE_URL || 'postgres://nohpvjmjvitunu:304d77236b3955fe2a8cc35bae344359191b572f44670f187555740017e98c54@ec2-34-247-172-149.eu-west-1.compute.amazonaws.com:5432/d99erk98709nhb' ,
    ssl: {
      rejectUnauthorized: false
    }
  });
client.connect()
const db = 
{
    inputUser({nickname, password})
    {
        // inputUser({_email : 'example3@gmail.com', _nickname : 'exampleNickname3', _password : '3'})
        return client.query('insert into users (nickname, password) values ($1::text, $2::text)', [nickname, password]);
    } , 
    getByNick(nickname)
    {
        return client.query('select * from users where nickname = $1::text', [nickname])
    }
}
module.exports = db