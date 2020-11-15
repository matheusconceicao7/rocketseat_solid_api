import { IMailProvider, IMessage } from './../IMailProvider';
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import  {env} from './../../config/dotenv'
import e from 'express';

export class MailtrapMailProvider implements IMailProvider{
    private transporter: Mail;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.mailHost,
            port: env.mailPort,
            auth: {
                user: env.mailUsername,
                pass: env.mailPassword
            }
        })
    }
    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body
        })
    }
}