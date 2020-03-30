const app = require('./src/server');
const port = process.env.PORT || 3001;

app.listen(port)

console.log('app started on port ' + port);