export const emailTemplete = ({title,userName,userQuestion, answer}) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 700px;
            background-color: #ffffff;
            margin: 40px auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 30px;
        }
        .email-body h2 {
            color: #333;
            font-size: 22px;
            margin-bottom: 15px;
        }
        .email-body p {
            font-size: 16px;
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .user-question {
            background-color: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #007bff;
            margin-bottom: 20px;
            font-style: italic;
            color: #333;
        }
        .answer-box {
            background-color: #e9f7fd;
            padding: 20px;
            border-left: 4px solid #007bff;
            margin-bottom: 30px;
        }
        .answer-box p {
            margin: 0;
            color: #333;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #888;
            background-color: #f0f0f0;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <div class="email-header">
            <h1>Your Question Has Been Answered</h1>
        </div>

        <div class="email-body">
            <h2>Hello ${userName},</h2>
            <p>Thank you for reaching out to us. We have carefully reviewed your question, and here is the response from our team:</p>

            <div class="user-question">
                <strong>Your Question:</strong> <br>
                ${userQuestion}
            </div>

            <div class="answer-box">
                <strong>Our Answer:</strong> 
                <p>${answer}</p>
            </div>

            <p>We hope this clarifies your query. If you have any more questions or need further assistance, feel free to reply to this email or contact our support team.</p>

            <p>Best regards,<br>
            The [Your Company] Team</p>
        </div>

        <div class="footer">
            &copy; 2024 [Your Company]. All rights reserved. <br>  
            <a href="[Company Website]">Visit our website</a>
        </div>
    </div>

</body>
</html>
`
}