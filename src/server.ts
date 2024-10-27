import app from './config/server';
import prisma from './config/database';

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
