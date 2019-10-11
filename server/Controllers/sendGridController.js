const sgMail = require('@sendgrid/mail');
const moment = require('moment')
moment().format()

module.exports = {
    sendMessage: () => {
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally
    const msg = {
        from: "test@example.com",
        template_id: "d-7eed81ee3483482982edeb3bcb698425",
        personalizations: [
            {
                to: [{email: "zachary.spilinek@gmail.com"}],
                dynamic_template_data: {
                    name: "mckayicus"
                }
            },
            {
                to: [{email: "zachary.spilinek@gmail.com"}],
                dynamic_template_data: {
                    name: "derpitidus"
                }
            },
            {
                to: [{email: "qbotzach@yahoo.com"}],
                dynamic_template_data: {
                    name: "zachariausicus"
                }
            }
        ]
    }
    sgMail.send(msg);
    console.log('Email sent!')
    }
}

// const msg = {
//     "from": "test@example.com",
//     "templateId": "d-7eed81ee3483482982edeb3bcb698425",
//     "personalizations": [
//         {
//             "to": [{"email": "zachary.spilinek@gmail.com"}],
//             "dynamicTemplateData": {
//                 "name": "mckayicus"
//             }
//         }
//     ]
// }

// const msg = {
//     "from": "test@example.com",
//     "templateId": "d-7eed81ee3483482982edeb3bcb698425",
//     "dynamicTemplateData": {
//         "f_name": "Briandicus",
//     },
//     "personalizations": [
//         {
//             "to": "zachary.spilinek@gmail.com",
//             "substitutions": {
//                 "%f_name%": "mckayicus"
//             }
//         },
//         {
//             "to": "qbotzach@yahoo.com"
//         }
//     ],
//     "substitutionWrappers": [
//         "{{",
//         "}}"
//     ]
// }

// const msg = {
//     "from": "test@example.com",
//     "templateId": "d-7eed81ee3483482982edeb3bcb698425",
//     "personalizations": [
//         {
//             "to": "zachary.spilinek@gmail.com",
//             "substitutions": {
//                 "%f_name%": "mckayicus"
//             }
//         }
//     ],
//     "substitutionWrappers": [
//         "{{",
//         "}}"
//     ]
// }
// sgMail.send(msg);
// console.log('Email sent!')
// }
// }


// the below is with the "send_at" property. We don't need it since our cron job takes care of it.
// const msg = {
//     to: [
//         {"email": 'zachary.spilinek@gmail.com'},
//         {"email": 'qbotzach@yahoo.com'}
//     ],
//     from: 'test@example.com',
//     templateId: 'd-7eed81ee3483482982edeb3bcb698425',
//     dynamic_template_data: {
//         f_name: 'Zacherias'
//     },
//     send_at: 1570770000
//   };