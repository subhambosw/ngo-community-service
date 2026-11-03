export const phishingEmails = [
  {
    id: 'paypal',
    title: 'PayPal Account Alert',
    senderName: 'PayPal Security Team',
    senderEmail: 'security@paypal-support-verify92.com',
    date: 'Today, 10:42 AM',
    subject: 'URGENT: Suspicious activity detected on your PayPal account',
    previewText: 'Your account has been temporarily restricted due to multiple failed login attempts.',
    bodyIntro: 'We detected unauthorized login attempts to your PayPal account from an unrecognized IP address (Moscow, RU).',
    bodyWarning: 'For your security, we have temporarily restricted your access. You must verify your account information within 24 hours to prevent permanent account suspension.',
    actionButtonText: 'Verify Account Identity Now',
    hoverUrl: 'http://login.paypal.secure-update-592.com/auth/verify?id=9201',
    flags: [
      {
        id: 'sender',
        targetText: 'security@paypal-support-verify92.com',
        label: 'Suspicious Sender Domain',
        explanation: 'Official PayPal emails come from @paypal.com. Scammers use lookalike domains like paypal-support-verify92.com.'
      },
      {
        id: 'urgency',
        targetText: 'URGENT: Suspicious activity detected',
        label: 'Artificial Urgency',
        explanation: 'Attackers use urgent deadlines ("within 24 hours") to panic victims into acting without thinking.'
      },
      {
        id: 'link',
        targetText: 'http://login.paypal.secure-update-592.com/auth/verify?id=9201',
        label: 'Deceptive Link URL',
        explanation: 'Hovering over the link reveals it leads to secure-update-592.com, NOT paypal.com. Notice it also uses HTTP instead of HTTPS.'
      }
    ]
  },
  {
    id: 'corporate_it',
    title: 'Corporate IT Password Reset',
    senderName: 'Helpdesk IT Support',
    senderEmail: 'helpdesk@corp-it-services-portal.net',
    date: 'Today, 02:15 PM',
    subject: 'Action Required: Mandatory Employee Password Expiration',
    previewText: 'Your corporate network password will expire in 3 hours. Reset it immediately.',
    bodyIntro: 'All company credentials are undergoing mandatory security updates as per IT policy.',
    bodyWarning: 'Your office 365, VPN, and internal tool access will be blocked at 5:00 PM today unless updated.',
    actionButtonText: 'Reset Corporate Password',
    hoverUrl: 'https://corporate.it-service-desk-reset.org/login',
    flags: [
      {
        id: 'sender',
        targetText: 'helpdesk@corp-it-services-portal.net',
        label: 'External Email Domain',
        explanation: 'The sender address ends in .net and is hosted externally rather than your internal company email domain.'
      },
      {
        id: 'urgency',
        targetText: 'Your corporate network password will expire in 3 hours',
        label: 'Strict Time Constraint',
        explanation: 'Scammers frequently create fake IT notifications to harvest corporate employee credentials.'
      },
      {
        id: 'link',
        targetText: 'https://corporate.it-service-desk-reset.org/login',
        label: 'Fake Portal Link',
        explanation: 'Always navigate directly to your company intranet portal or bookmark instead of clicking email reset links.'
      }
    ]
  },
  {
    id: 'package_tracking',
    title: 'Express Delivery Failure',
    senderName: 'Global Courier Dispatch',
    senderEmail: 'no-reply@express-delivery-tracker-alert.info',
    date: 'Yesterday, 04:30 PM',
    subject: 'Package Delivery Failed: Address Confirmation Required',
    previewText: 'We attempted to deliver parcel #US-88491-X but your address was incomplete.',
    bodyIntro: 'Your package is currently being held at our local distribution depot and incurring a $1.99 daily storage fee.',
    bodyWarning: 'Please confirm your home address and re-pay the nominal redelivery fee to release the parcel.',
    actionButtonText: 'Confirm Address & Reschedule',
    hoverUrl: 'http://track-parcel-redelivery-portal.info/pay',
    flags: [
      {
        id: 'sender',
        targetText: 'no-reply@express-delivery-tracker-alert.info',
        label: 'Generic Logistics Sender',
        explanation: 'Legitimate carriers (FedEx, UPS, DHL) identify themselves clearly and do not send from generic .info domains.'
      },
      {
        id: 'urgency',
        targetText: 'incurring a $1.99 daily storage fee',
        label: 'Small Fee Trap',
        explanation: 'Asking for tiny payments ($1-$3) is a classic tactic to steal credit card details for recurring fraud.'
      },
      {
        id: 'link',
        targetText: 'http://track-parcel-redelivery-portal.info/pay',
        label: 'Unencrypted Payment Link',
        explanation: 'Never enter credit card information on an HTTP site or unverified delivery domain.'
      }
    ]
  }
];
