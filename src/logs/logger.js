import pino from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYs:dd/mm/yyyy HH:MM:ss',
        },
    },
});

export default logger;