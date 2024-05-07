// Import nodemailer module
const nodemailer = require("nodemailer");
const User = require("../models/users");
const fs = require("fs");

require("dotenv").config();

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASS,
  },
});

const sendMail = async (
  id_list,
  BloodGroup,
  patientName,
  Address,
  DeseaseName,
  hospital_name,
  phoneNumber,
  requesterName,
  filePath,
  file_name
) => {
  id_list.forEach(async (element) => {
    const user_info = await User.findOne({ _id: element });
    const pdfFilePath = filePath;
    const fileName = file_name;
    const pdfAttachment = {
      filename: fileName, // Name of the attachment
      content: fs.createReadStream(pdfFilePath), // Stream of the PDF file
    };
    // Setup email data
    let mailOptions = {
      from: process.env.GMAIL_ACCOUNT,
      to: `${user_info.email}`,
      subject: `Urgent Blood Donation Needed - ${patientName}`,
      text: `Dear ${user_info.uname},
             I hope this email finds you well. I am reaching out to you on behalf of ${hospital_name}, where we are currently in urgent need of blood donations for a patient in critical condition.
             Patient Information:
                    - Patient Name: ${patientName}
                    - Blood Group Required: ${BloodGroup}
                    - Address: ${Address}
                    - Disease/Condition: ${DeseaseName}
             The situation is critical, and we are appealing to the generosity of donors like you to help save a life. Your donation could make a significant difference and give hope to the patient and their family during this challenging time.

             If you are able and willing to donate blood, please visit our facility at the earliest convenience. Alternatively, you may contact our blood donation coordinator at [Phone Number] to schedule an appointment or inquire further.

             Your willingness to contribute to this noble cause is deeply appreciated. Together, we can make a difference and provide vital support to those in need.

             Also we Are sending an attachment of medical report by the Doctor.

             Thank you for your kindness and compassion.
             
             Contact Information,
             ${requesterName}
             ${phoneNumber}`,
      attachments: [pdfAttachment],
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error occurred:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
};
module.exports = { sendMail };
