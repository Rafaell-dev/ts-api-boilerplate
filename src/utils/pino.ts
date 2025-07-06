import Pino from "pino";
import fs from "fs";
import { env } from "./env";

const streams: Pino.StreamEntry[] = [];

if (env.LOG_DESTINATION) {
	if (!fs.existsSync(env.LOG_DESTINATION)) {
		fs.mkdirSync(env.LOG_DESTINATION, { recursive: true });
	}

	streams.push({
		level: "info",
		stream: Pino.destination({
			dest: `${env.LOG_DESTINATION}/info.log`,
			append: true,
			sync: false
		}),
	});

	streams.push({
		level: "debug",
		stream: Pino.destination({
			dest: `${env.LOG_DESTINATION}/debug.log`,
			append: true,
			sync: false
		}),
	});

	streams.push({
		level: "warn",
		stream: Pino.destination({
			dest: `${env.LOG_DESTINATION}/warn.log`,
			append: true,
			sync: false
		}),
	});

	streams.push({
		level: "error",
		stream: Pino.destination({
			dest: `${env.LOG_DESTINATION}/error.log`,
			append: true,
			sync: false
		}),
	});

	streams.push({
		level: "fatal",
		stream: Pino.destination({
			dest: `${env.LOG_DESTINATION}/fatal.log`,
			append: true,
			sync: false
		}),
	});
}

if (env.LOG_TO_STDOUT || env.ENVIROMENT === "development") {
	streams.push({
		level: env.LOG_LEVEL || "info",
		stream: Pino.transport({
			target: "pino-pretty",
			options: {
				colorize: true,
				translateTime: "yyyy-mm-dd HH:MM:ss",
				ignore: "pid,hostname",
				messageFormat: "{msg}",
				levelFirst: true,
				crlf: false
			}
		})
	});
}


export const pino = streams.length > 0 
	? Pino({
		level: env.LOG_LEVEL || "info",
		enabled: env.ENVIROMENT !== "test",
		formatters: {
			level: (label) => {
				return { level: label };
			},
		},
		timestamp: Pino.stdTimeFunctions.isoTime,
		base: {
			pid: process.pid,
			hostname: undefined,
		}
	}, Pino.multistream(streams))
	: Pino({
		level: env.LOG_LEVEL || "info",
		enabled: env.ENVIROMENT !== "test",
		transport: {
			target: "pino-pretty",
			options: {
				colorize: true,
				translateTime: "yyyy-mm-dd HH:MM:ss",
				ignore: "pid,hostname",
				messageFormat: "{msg}",
				levelFirst: true,
			}
		}
	});

export const createLogger = (context: string) => {
	return pino.child({ context });
};

// Use example:
// const logger = createLogger('UserService');
// logger.info('User created successfully', { userId: 123 });
// logger.error('Failed to create user', { error: error.message });