import app from './app.js';
import sequelize from './database/database.js';
import logger from './logs/logger.js';

async function main() {
   
    await sequelize.sync();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
    logger.info(`Server is running on port ${PORT}`);
}
main();