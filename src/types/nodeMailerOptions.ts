import { Options } from "nodemailer/lib/mailer";

export type ExtendedOptions = Options & { template: string, context?: Record<string, unknown> };

