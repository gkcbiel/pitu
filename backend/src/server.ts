import app from './app';
import database from './database';

database.sync();
console.log('Database running at 3307');

app.listen(3001);
console.log('Server running at 3001');

