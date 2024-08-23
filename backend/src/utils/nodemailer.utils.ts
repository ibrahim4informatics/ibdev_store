import { Transporter, createTransport } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'
const transport: Transporter = createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})
const sendMail = async (mail: MailOptions): Promise<boolean> => {
    try {
        const info = await transport.sendMail(mail);
        console.log('Message sent: ', info.messageId);
        return true

    }
    catch (err) {
        console.log(err);
        return false;
    }
}
export { sendMail }