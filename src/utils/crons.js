
import { scheduleJob } from "node-schedule";
import fs from 'fs';
import ExcelJS from 'exceljs';
import nodemailer from 'nodemailer';
import { Payment } from '../../db/collections/payments.js';
import sendemailservices from '../services/send-email.service.js';
// Sample function to get orders from the database (replace with actual DB call)
async function getpayments(){
    
    const payments=await Payment.find({paymentStatus:'success'})
    return payments
}

// Function to generate Excel from JSON data
async function generateExcel() {
  const payments = await getpayments();
  console.log(payments);
  
  // Create a new Excel workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('payments');

  // Add header row
  worksheet.columns = [
    { header: 'ID', key: 'id' ,width: 10 },
    { header: 'email', key: 'email', width: 30 },
    { header: 'name', key: 'name', width: 10 },
    { header: 'Price', key: 'price', width: 10 },
    { header: 'phonenumber', key: 'phonenumber', width: 10 },
  ];

  // Add orders data
  payments.forEach(pay => {
    worksheet.addRow({
      id: pay._id,
      email: pay.email,
      name: pay.name,
      price: pay.price,
      phonenumber: pay.phonenumber,
    });
  });

  const filePath = './payments.xlsx';

  // Write the workbook to a file
  await workbook.xlsx.writeFile(filePath);

  return filePath;
}

// Function to send the Excel file via email
async function sendEmailWithExcel(filePath) {
  // Set up email transport configuration (configure SMTP)
 

  // Email options
  
    const sendemail=await sendemailservices({to:process.env.EMAIL,message:"payments of week",attachments: [
        {
          filename: 'payments.xlsx',
          path: filePath,
        },
      ],})
  

    
}



export const cronsschedule=()=>{

   // Schedule the cron job to run at the end of each day (e.g., 23:59)
scheduleJob('0 8 * * 1', async () => {
    try {
      console.log('Running cron job to send orders...');
      const filePath = await generateExcel(); // Generate the Excel sheet
      await sendEmailWithExcel(filePath); // Send the email with the Excel file
    } catch (error) {
      console.error('Error running cron job:', error);
    }
  });
}