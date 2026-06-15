# AAQ Solutions & Outsourcing - Modern ERP Website

Complete professional event management system with modern design, email notifications, and image upload functionality.

## 🎯 Project Features

✅ **Modern Corporate Design** - Teal & Gray Professional Theme
✅ **Firebase Integration** - Real-time database & storage
✅ **Email Notifications** - Welcome, Password Reset, Event Assignments
✅ **Image Upload** - Staff profiles & event images to Firebase Storage
✅ **Admin Dashboard** - Complete staff & event management
✅ **Staff Portal** - Dashboard and event assignments
✅ **Responsive Design** - Works on all devices
✅ **Secure Authentication** - Email & password-based login

## 📁 Project Structure

```
aaq-event-website/
├── css/
│   └── style.css                 # Modern design system (Teal & Gray)
├── js/
│   ├── firebase-config.js        # Firebase initialization
│   ├── email.js                  # Email notification service
│   └── image-upload.js           # Image upload to Firebase Storage
├── pages/
│   ├── login.html                # Professional login page
│   ├── admin.html                # Admin dashboard
│   ├── staff-dashboard.html      # Staff portal
│   ├── staff-management.html     # Manage staff members
│   ├── attendance-management.html # Track attendance
│   ├── events-management.html    # Manage events
│   ├── id-card-management.html   # ID card tracking
│   ├── reports-management.html   # Generate reports
│   └── settings.html             # Admin settings
├── assets/
│   └── logo.png                  # AAQ company logo
├── index.html                    # Home page
└── README.md                     # This file
```

## 🚀 Quick Start

### Prerequisites
- Firebase Account (Already Setup: aaq-event-erp)
- EmailJS Account
- Modern Web Browser
- Node.js (optional, for local testing)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/aaqsolutioninfoteam-cmd/aaq-event-website.git
cd aaq-event-website
```

2. **Setup EmailJS**
   - Go to [EmailJS](https://www.emailjs.com/)
   - Create account and add email service
   - Create 3 email templates:
     - `template_welcome` - Welcome email
     - `template_password_reset` - Password reset
     - `template_notification` - General notifications
   - Copy your Public Key and update `js/email.js`

3. **Enable Firebase Storage**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select `aaq-event-erp` project
   - Enable Storage (Cloud Storage)
   - Set storage rules for authenticated users

4. **Update Configuration**
   - Edit `js/email.js` line 12:
   ```javascript
   const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE";
   ```

5. **Deploy**
   - Deploy to Firebase Hosting OR
   - Use any static hosting service

## 🔐 User Roles

### Admin
- Email: `aaqsolutioninfoteam@gmail.com` or `admin@aaq.com`
- Full access to all features
- Can add/edit/delete staff members
- Can create and manage events
- Can generate reports

### Staff
- Added by admin
- Own dashboard with assigned events
- Can upload profile photo
- Can view attendance
- Can check event assignments

## 📧 Email System

### Setup EmailJS Templates

**Template 1: Welcome Email**
```
Subject: Welcome to AAQ ERP System
Body: Hi {{user_name}}, Welcome to AAQ Solutions & Outsourcing
```

**Template 2: Password Reset**
```
Subject: Reset Your Password
Body: Click here to reset: {{reset_link}}
```

**Template 3: Notifications**
```
Subject: {{subject}}
Body: {{message}}
```

### Email Functions

```javascript
// Send welcome email
sendWelcomeEmail(email, name);

// Send password reset
sendPasswordResetEmail(email, token, resetLink);

// Send notification
sendNotificationEmail(email, subject, message);

// Send event assignment
sendEventAssignmentEmail(staffEmail, name, eventName, date, location);

// Bulk notifications
sendBulkNotification(emailArray, subject, message);
```

## 🖼️ Image Upload

Images are stored in Firebase Storage in organized folders:

- `staff-profiles/` - Staff member photos
- `event-images/` - Event pictures
- `id-cards/` - ID card images
- `reports/` - Report attachments

**Max file size:** 5MB
**Allowed formats:** JPG, PNG, WebP, GIF

### Usage

```javascript
import { uploadImage, deleteImage } from './js/image-upload.js';

// Upload image
const result = await uploadImage(
    file,
    'staff-profiles',
    (progress) => console.log(`${progress.progress}% uploaded`)
);

// Delete image
await deleteImage('staff-profiles/filename.jpg');
```

## 🎨 Design Colors

### Primary (Teal)
- Dark: `#0f766e`
- Light: `#14b8a6`
- Background: `#ccfbf1`

### Secondary (Gray)
- Dark: `#1e293b`
- Light: `#475569`
- Background: `#f1f5f9`

### Status Colors
- Success: `#10b981`
- Warning: `#f59e0b`
- Danger: `#ef4444`

## 🔑 Key Features

### Login System
- Email & password authentication
- Remember me functionality
- Admin & Staff roles
- Firebase integration

### Admin Dashboard
- Staff management (Add, Edit, Delete)
- Attendance tracking
- Event management
- ID card tracking
- Reports generation
- System settings

### Staff Portal
- Personal dashboard
- Event assignments
- Attendance history
- Profile management
- Photo upload

## 📱 Responsive Design

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (480px - 768px)
- ✅ Small Mobile (<480px)

## 🛡️ Security

- Firebase authentication
- Secure storage rules
- Email verification
- Password reset tokens
- Admin-only access controls

## 🔄 Firebase Database Structure

### Collections

**staffs**
```
{
  staffId: string
  staffName: string
  email: string
  password: string (hashed recommended)
  phone: string
  photoURL: string
  role: string
  createdAt: timestamp
  status: string (active/inactive)
}
```

**events**
```
{
  eventId: string
  eventName: string
  eventDate: date
  eventLocation: string
  description: string
  assignedStaff: array
  images: array
  createdAt: timestamp
}
```

**attendance**
```
{
  attendanceId: string
  staffId: string
  eventId: string
  date: date
  status: string (present/absent)
  checkInTime: timestamp
}
```

## 📊 API Endpoints (Firebase Functions)

Ready to add Cloud Functions for:
- Email sending
- Report generation
- Bulk operations
- Data validation

## 🐛 Troubleshooting

### Images not uploading
- Check Firebase Storage rules
- Verify file size < 5MB
- Check file format (JPG, PNG, WebP, GIF)

### Emails not sending
- Verify EmailJS configuration
- Check email templates exist
- Verify Public Key in code

### Login issues
- Clear browser cache
- Check Firebase database
- Verify user exists in 'staffs' collection

## 📞 Support

Contact: **support@aaq.com**
WhatsApp: **+91 7600263704**

## 📄 License

Proprietary - AAQ Solutions & Outsourcing

## 👥 Team

**AAQ Solutions & Outsourcing**
- Professional Event Management
- Volunteer Management
- Staffing Solutions
- Corporate Events
- Live Streaming Services

---

**Last Updated:** June 15, 2026
**Version:** 2.0 - Modern Redesign
