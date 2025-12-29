# Contact Form Setup Instructions

Your contact form is now functional and will send emails to **kaushalambaliya69199@gmail.com**!

## 🚀 Setup Steps

### 1. Get a Resend API Key (FREE)

1. Go to [resend.com](https://resend.com) and sign up for a free account
2. After signing in, go to **API Keys** in the dashboard
3. Click **Create API Key**
4. Copy the API key (it starts with `re_`)
5. Open the file `/workspaces/portfolio/.env.local`
6. Replace `your_resend_api_key_here` with your actual API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

### 2. Verify Your Domain (Optional but Recommended)

**For the free tier**, Resend allows you to send emails from `onboarding@resend.dev`. This works immediately but shows "via resend.dev" in the recipient's inbox.

**To send from your own domain** (e.g., contact@yourdomain.com):

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. You'll get DNS records to add to your domain provider

#### If your domain is on Namecheap:

1. Log in to [Namecheap](https://namecheap.com)
2. Go to **Domain List** → Click **Manage** next to your domain
3. Go to **Advanced DNS** tab
4. Add the DNS records provided by Resend:
   - **SPF Record** (TXT record)
   - **DKIM Record** (TXT record)
   - **DMARC Record** (TXT record)

5. Wait 15-30 minutes for DNS propagation
6. Go back to Resend and click **Verify Domain**

7. Once verified, update the email in `/workspaces/portfolio/src/app/api/contact/route.ts`:
   ```typescript
   from: 'Portfolio Contact <contact@yourdomain.com>',
   ```

### 3. Test the Form

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to the Contact section on your portfolio
3. Fill out the form and click "Send Message"
4. Check **kaushalambaliya69199@gmail.com** for the email!

## 🎨 What's Enhanced

### UI Improvements:
- ✨ **Animated input fields** with scale effects on focus
- 🎯 **Placeholder text** in all fields with helpful examples
- 🔄 **Loading state** with spinner animation
- ✅ **Success message** with checkmark icon
- ❌ **Error handling** with detailed error messages
- 🚀 **Send icon** on the submit button
- 📱 **Staggered animations** for each form element
- 🎨 **Better visual feedback** for all states

### Functionality:
- 📧 Sends real emails to your Gmail
- ⏳ Shows loading state while sending
- ✅ Displays success message with auto-dismiss
- ❌ Shows error messages if something fails
- 🔒 Server-side email sending (secure)
- 🛡️ Input validation on both client and server
- 📱 Fully responsive and accessible

## 💰 Pricing (Resend)

- **Free Tier**: 100 emails/day, 3,000 emails/month
- Perfect for a portfolio website!
- If you need more, paid plans start at $20/month for 50K emails

## 🔧 Troubleshooting

**If emails aren't sending:**
1. Check that `.env.local` has your correct API key
2. Make sure you restarted the dev server after adding the API key
3. Check the browser console and terminal for error messages
4. Verify the API key is valid in your Resend dashboard

**If emails go to spam:**
- This is normal with the `onboarding@resend.dev` sender
- Once you verify your own domain, this should be resolved

## 🎯 Alternative: Using a Different Email Service

If you prefer not to use Resend, you can easily switch to:
- **SendGrid**: Similar setup, 100 emails/day free
- **Nodemailer with Gmail**: Use your Gmail account directly
- **EmailJS**: Client-side solution (easier but less secure)

Let me know if you need help setting up any of these alternatives!
