// Email Service Configuration
// Using EmailJS Service for Email Notifications

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_aaq_events";
const EMAILJS_TEMPLATE_ID_WELCOME = "template_welcome";
const EMAILJS_TEMPLATE_ID_PASSWORD_RESET = "template_password_reset";
const EMAILJS_TEMPLATE_ID_NOTIFICATION = "template_notification";
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY"; // Replace with your EmailJS public key

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

/**
 * Send Welcome Email to New User
 * @param {string} userEmail - User's email address
 * @param {string} userName - User's full name
 */
export async function sendWelcomeEmail(userEmail, userName) {
    try {
        const templateParams = {
            to_email: userEmail,
            user_name: userName,
            company_name: "A.A.Q Solutions & Outsourcing",
            website_url: window.location.origin
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID_WELCOME,
            templateParams
        );

        console.log("✅ Welcome email sent:", response);
        return true;
    } catch (error) {
        console.error("❌ Error sending welcome email:", error);
        return false;
    }
}

/**
 * Send Password Reset Email
 * @param {string} userEmail - User's email address
 * @param {string} resetToken - Password reset token
 * @param {string} resetLink - Complete reset link
 */
export async function sendPasswordResetEmail(userEmail, resetToken, resetLink) {
    try {
        const templateParams = {
            to_email: userEmail,
            reset_link: resetLink,
            reset_token: resetToken,
            company_name: "A.A.Q Solutions & Outsourcing",
            expiry_time: "24 hours"
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID_PASSWORD_RESET,
            templateParams
        );

        console.log("✅ Password reset email sent:", response);
        return true;
    } catch (error) {
        console.error("❌ Error sending password reset email:", error);
        return false;
    }
}

/**
 * Send Notification Email
 * @param {string} userEmail - User's email address
 * @param {string} subject - Email subject
 * @param {string} message - Email message
 * @param {string} actionUrl - Optional action URL
 */
export async function sendNotificationEmail(userEmail, subject, message, actionUrl = null) {
    try {
        const templateParams = {
            to_email: userEmail,
            subject: subject,
            message: message,
            action_url: actionUrl || "",
            company_name: "A.A.Q Solutions & Outsourcing",
            support_email: "support@aaq.com"
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID_NOTIFICATION,
            templateParams
        );

        console.log("✅ Notification email sent:", response);
        return true;
    } catch (error) {
        console.error("❌ Error sending notification email:", error);
        return false;
    }
}

/**
 * Send Event Assignment Notification
 * @param {string} staffEmail - Staff member's email
 * @param {string} staffName - Staff member's name
 * @param {string} eventName - Event name
 * @param {string} eventDate - Event date
 * @param {string} eventLocation - Event location
 */
export async function sendEventAssignmentEmail(staffEmail, staffName, eventName, eventDate, eventLocation) {
    try {
        const templateParams = {
            to_email: staffEmail,
            staff_name: staffName,
            event_name: eventName,
            event_date: eventDate,
            event_location: eventLocation,
            company_name: "A.A.Q Solutions & Outsourcing",
            subject: `New Event Assignment: ${eventName}`,
            message: `You have been assigned to event "${eventName}" on ${eventDate} at ${eventLocation}.`
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID_NOTIFICATION,
            templateParams
        );

        console.log("✅ Event assignment email sent:", response);
        return true;
    } catch (error) {
        console.error("❌ Error sending event assignment email:", error);
        return false;
    }
}

/**
 * Send Bulk Notification to Multiple Users
 * @param {array} emailList - Array of email addresses
 * @param {string} subject - Email subject
 * @param {string} message - Email message
 */
export async function sendBulkNotification(emailList, subject, message) {
    try {
        const promises = emailList.map(email =>
            sendNotificationEmail(email, subject, message)
        );

        const results = await Promise.all(promises);
        const successCount = results.filter(r => r).length;

        console.log(`✅ Bulk email sent: ${successCount}/${emailList.length}`);
        return {
            total: emailList.length,
            success: successCount,
            failed: emailList.length - successCount
        };
    } catch (error) {
        console.error("❌ Error sending bulk notification:", error);
        return null;
    }
}

/**
 * Generate password reset token
 * @returns {string} Reset token
 */
export function generateResetToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Generate reset link
 * @param {string} token - Reset token
 * @returns {string} Complete reset link
 */
export function generateResetLink(token) {
    const baseURL = window.location.origin;
    return `${baseURL}/reset-password.html?token=${token}`;
}

// Email Templates (to be configured in EmailJS Dashboard)
export const emailTemplates = {
    WELCOME: {
        name: "Welcome Email",
        description: "Sent when new user registers",
        variables: ["user_name", "company_name", "website_url"]
    },
    PASSWORD_RESET: {
        name: "Password Reset",
        description: "Sent when user requests password reset",
        variables: ["reset_link", "reset_token", "expiry_time"]
    },
    NOTIFICATION: {
        name: "General Notification",
        description: "Generic notification email",
        variables: ["subject", "message", "action_url"]
    },
    EVENT_ASSIGNMENT: {
        name: "Event Assignment",
        description: "Notification for event assignments",
        variables: ["staff_name", "event_name", "event_date", "event_location"]
    }
};

// EmailJS Setup Instructions
export const emailJSSetup = {
    instructions: [
        "1. Go to https://www.emailjs.com/",
        "2. Sign up / Login to your account",
        "3. Add a new Email Service (Gmail, Outlook, etc.)",
        "4. Create email templates for:",
        "   - Welcome Email (template_welcome)",
        "   - Password Reset (template_password_reset)",
        "   - Notifications (template_notification)",
        "5. Copy your Public Key and replace EMAILJS_PUBLIC_KEY",
        "6. Add EmailJS script: <script src='https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js'></script>"
    ],
    link: "https://www.emailjs.com/"
};

console.log("✅ Email service module loaded");
