import app from '../src/app';  // Import the app from src/app.ts

// Start the server
app.listen({ port: 5000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
