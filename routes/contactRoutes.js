import express from "express"
import nodemailer from "nodemailer"
const router = express.Router();
router.post('/',async(req,res)=>{
    const{name,email,message}=req.body;
    console.log("REQ.BODY 👉", req.body);

    try{
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        });
        const mailOptions={
            from:`'Portfolio Contact'<${process.env.EMAIL_USER}>`,
            to:process.env.EMAIL_USER,
            replyTo:email,
            subject:`Portfolio Contact: ${name}`,
            html:`
             <div style="font-size:16px; font-family: Arial, sans-serif;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                 <blockquote>${message}</blockquote>
            </div>` 
        };
        await transporter.sendMail(mailOptions);
        res.json({success:true,message:"Email sent successfully" });
    }catch(error){
        console.log(error);
        res.status(500).json({ success:false,message:"Email sending failed"})
    }

});
export default router;











