const cors = require('cors');
app.use(cors());

const nodemailer = require('nodemailer');





// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soorveerexam@gmail.com',
        pass: 'aA@8877861120',
    },
});





app.post('/api/get-quotation', (req, res) => {
    const { name, email, phone, service, details } = req.body;
  
    // Validate the data
    if (!name || !email || !phone || !service) {
      return res.status(400).json({ success: false, message: 'Please fill all the required fields.' });
    }
  
    // Send an email
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'admin@company.com',
      subject: 'New Quotation Request',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nDetails: ${details}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, message: 'Error sending email.' });
      } else {
        res.json({ success: true, message: 'Quotation request sent successfully.' });
      }
    });
  });

  document.getElementById('quotationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value,
      details: document.getElementById('details').value
    };
  
    try {
      const response = await fetch('/api/get-quotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      if (result.success) {
        alert('Quotation request sent successfully.');
      } else {
        alert('Failed to send quotation request.');
      }
    } catch (error) {
      alert('An error occurred.');
    }
  });
  
