import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars'
import { ExtendedOptions } from '../types/nodeMailerOptions';
import path from 'path';
const viewPath = path.resolve(__dirname, './templates/views/');
const partialsPath = path.resolve(__dirname, './templates/partials');

export async function sendMail(to: string, subject: string, template: string, context: Record<string, unknown>) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
  });

  transporter.use('compile', hbs({
    viewEngine: {
      extname: '.handlebars',
      layoutsDir: viewPath,
      defaultLayout: false,
      partialsDir: partialsPath,
    },
    viewPath: viewPath,
    extName: '.handlebars',
  }))

  const options: ExtendedOptions = {
    from: 'example@example.com',
    to,
    subject,
    template,
    context
  };

  await transporter.sendMail(options);
}