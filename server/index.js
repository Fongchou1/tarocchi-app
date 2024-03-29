// eslint-disable-next-line
const express = require('express');
const path = require('path');
require('dotenv').config();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var Airtable = require('airtable');

var base = new Airtable({apiKey: process.env.AIRTABLE_ACCESS}).base(process.env.BASE);
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 6000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    // res.send('{"message":"Hello from the custom server!"}');
    base('cards').select({
      view: "DB"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
    
      res.send(records);
    
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    
    }, function done(err) {
      if (err) { console.error(err); return; }
    });
  });

  app.get('/content', function (req, res) {
    res.set('Content-Type', 'application/json');
    // res.send('{"message":"Hello from the custom server!"}');
    base('content').select({
      // Selecting the first 3 records in Grid view:
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
    
      res.send(records);
    
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    
    }, function done(err) {
      if (err) { console.error(err); return; }
    });
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
