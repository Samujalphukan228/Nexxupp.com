import priceModel from "../models/pricing.model.js";
import queryModel from "../models/queryModel.js";
import { mailer } from "../configs/mail.config.js";

/**
 * Generate admin notification email HTML
 */
const getAdminEmailHTML = (email, priceCard, message) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; padding: 40px 20px;">
<div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: #000000; padding: 40px;">
        <h1 style="color: #ffffff; font-size: 26px; font-weight: 600; text-align: center; margin: 0;"> 📩 New Pricing Query </h1>
    </div>
    <div style="padding: 40px;">
        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0;">
            <span style="font-weight: 600; color: #000000; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">User Email</span>
            <div style="color: #333333; font-size: 15px; margin-top: 8px;">${email}</div>
        </div>
        <div style="margin-bottom: 20px;">
            <span style="font-weight: 600; color: #000000; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Message</span>
            <div style="margin-top: 12px; padding: 20px; background: #f8f8f8; border-radius: 12px; color: #333333; font-size: 15px; line-height: 1.6; border-left: 3px solid #000000;">
                ${message}
            </div>
        </div>
        <div style="margin-top: 30px;">
            <span style="font-weight: 600; color: #000000; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Selected Plan</span>
            <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); border-radius: 16px; padding: 30px; margin-top: 15px;">
                <p style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 15px 0;">${priceCard.category}</p>
                <div style="color: #ffffff; margin-bottom: 25px;">
                    <span style="font-size: 40px; font-weight: 700;">$${priceCard.price}</span>
                    <span style="font-size: 16px; opacity: 0.7;">/month</span>
                </div>
                <p style="color: #ffffff; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; opacity: 0.9;">Features</p>
                <ul style="list-style: none; margin: 0; padding: 0;">
                    ${priceCard.features.map(feature => `
                        <li style="color: #ffffff; font-size: 15px; margin-bottom: 12px; padding-left: 28px; position: relative;">
                            <span style="position: absolute; left: 0; font-weight: 700;">✓</span> ${feature}
                        </li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
    <div style="background: #000000; padding: 25px; text-align: center;">
        <p style="color: #999999; font-size: 13px; margin: 0;">
            <strong style="color: #ffffff;">Nexupp</strong> © 2025. All rights reserved.
        </p>
    </div>
</div>
</body>
</html>
`;

/**
 * Generate user auto-reply email HTML
 */
const getUserEmailHTML = (email, priceCard, message) => {
    const userName = email.split("@")[0];
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; padding: 40px 20px;">
<div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: #000000; padding: 40px;">
        <h1 style="color: #ffffff; font-size: 26px; font-weight: 600; text-align: center; margin: 0;"> Thanks for Your Interest! </h1>
    </div>
    <div style="padding: 40px;">
        <h2 style="color: #000000; font-size: 22px; font-weight: 600; margin: 0 0 20px 0;">Hi ${userName}!</h2>
        <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for your interest in our <strong>${priceCard.category}</strong> plan. We've received your query and our team will get back to you shortly.
        </p>
        <div style="margin: 30px 0;">
            <span style="font-weight: 600; color: #000000; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Your Message</span>
            <div style="margin-top: 12px; padding: 20px; background: #f8f8f8; border-radius: 12px; color: #333333; font-size: 15px; line-height: 1.6; border-left: 3px solid #000000;">
                ${message}
            </div>
        </div>
        <div style="margin-top: 30px;">
            <span style="font-weight: 600; color: #000000; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Your Selected Plan</span>
            <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); border-radius: 16px; padding: 30px; margin-top: 15px;">
                <p style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 15px 0;">${priceCard.category}</p>
                <div style="color: #ffffff; margin-bottom: 25px;">
                    <span style="font-size: 40px; font-weight: 700;">$${priceCard.price}</span>
                    <span style="font-size: 16px; opacity: 0.7;">/month</span>
                </div>
                <p style="color: #ffffff; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; opacity: 0.9;">Features</p>
                <ul style="list-style: none; margin: 0; padding: 0;">
                    ${priceCard.features.map(feature => `
                        <li style="color: #ffffff; font-size: 15px; margin-bottom: 12px; padding-left: 28px; position: relative;">
                            <span style="position: absolute; left: 0; font-weight: 700;">✓</span> ${feature}
                        </li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
    <div style="background: #000000; padding: 25px; text-align: center;">
        <p style="color: #999999; font-size: 13px; margin: 0;">
            <strong style="color: #ffffff;">Nexupp</strong> © 2025. All rights reserved.
        </p>
    </div>
</div>
</body>
</html>
`;
};

/**
 * Add a new pricing query
 */
export const addQuery = async (req, res) => {
    try {
        const { email, priceCardId, message } = req.body;

        if (!email || !priceCardId || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const priceCard = await priceModel.findById(priceCardId);
        if (!priceCard) {
            return res.status(404).json({ success: false, message: "Invalid plan ID." });
        }

        const newQuery = new queryModel({ email, priceCardId, message });
        await newQuery.save();

        // Send to admin
        try {
            await mailer.sendMail({
                from: `"Nexupp" <${process.env.ADMIN_EMAIL}>`,
                to: process.env.ADMIN_EMAIL,
                replyTo: email,
                subject: `New Pricing Query — ${priceCard.category}`,
                html: getAdminEmailHTML(email, priceCard, message),
            });
        } catch (err) {
            console.error("❌ Admin email failed:", err);
        }

        // Send auto-reply to user
        try {
            await mailer.sendMail({
                from: `"Nexupp" <${process.env.ADMIN_EMAIL}>`,
                to: email,
                replyTo: process.env.ADMIN_EMAIL,
                subject: "Thanks for Your Interest!",
                html: getUserEmailHTML(email, priceCard, message),
            });
        } catch (err) {
            console.error("❌ Auto-reply to user failed:", err);
        }

        res.json({ success: true, message: "Query saved. Emails attempted." });

    } catch (error) {
        console.error("❌ Email sending failed:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Get all queries with plan details
 */
export const getAllQueries = async (req, res) => {
    try {
        const queries = await queryModel
            .find({})
            .populate("priceCardId", "category price features");
        res.json({ success: true, queries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const removeQueies = async (req, res) => {
    try {
        const { id } = req.query; // get ID from query parameters
        if (!id) return res.status(400).json({ success: false, message: "Query ID is required" });

        const deleted = await queryModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: "Query not found" });

        res.json({ success: true, message: "Query removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
