export const quizQuestions = [
  {
    id: 1,
    category: 'Phishing',
    question: 'You receive an email from "Apple Support" asking you to click a link to verify your Apple ID because of suspicious purchases. What is the safest first action?',
    options: [
      'Click the link immediately to protect your funds.',
      'Reply to the email asking if it is real.',
      'Do not click the link; log into apple.com directly in your web browser to check your account status.',
      'Forward the email to your friends so they can check.'
    ],
    correctAnswer: 2,
    explanation: 'Never click links in unexpected security alert emails. Always navigate directly to the official website by typing the URL yourself.'
  },
  {
    id: 2,
    category: 'Password Security',
    question: 'Which of the following passwords is mathematically hardest for a hacker to crack via brute-force attack?',
    options: [
      'P@ssword123!',
      'purple-dragon-flying-over-clouds-42',
      'Tr0ub4dour&3',
      'Qx#9!mL2'
    ],
    correctAnswer: 1,
    explanation: 'Passphrases combining 4+ random words (like "purple-dragon-flying-over-clouds-42") have far higher character length/entropy, making them significantly harder to crack than short complex strings.'
  },
  {
    id: 3,
    category: 'Authentication',
    question: 'Why is Multi-Factor Authentication (MFA / 2FA) considered essential even with strong passwords?',
    options: [
      'It stops websites from tracking your IP address.',
      'Even if your password is stolen in a database breach, attackers cannot log in without the second factor (e.g. authenticator app code).',
      'It speeds up your internet connection speed.',
      'It encrypts your hard drive automatically.'
    ],
    correctAnswer: 1,
    explanation: 'MFA adds an essential second layer of defense. Stolen passwords alone are useless to hackers if they lack your physical security key or authenticator app token.'
  },
  {
    id: 4,
    category: 'Network Safety',
    question: 'You are at an airport cafe connected to "Free_Airport_WiFi". What should you avoid doing while on this network without a VPN?',
    options: [
      'Reading public news articles.',
      'Logging into your online bank account or typing credit card info.',
      'Checking the local weather forecast.',
      'Playing offline games on your phone.'
    ],
    correctAnswer: 1,
    explanation: 'Unencrypted public Wi-Fi networks allow attackers to perform Man-in-the-Middle (MITM) attacks and intercept sensitive data packets.'
  },
  {
    id: 5,
    category: 'Privacy',
    question: 'What is the "Principle of Least Privilege" when granting app permissions on your mobile device?',
    options: [
      'Giving apps all requested permissions so they run fast.',
      'Only granting apps access to data and hardware features strictly required for their function (e.g. denying location to a calculator app).',
      'Deleting all apps every week.',
      'Using public Wi-Fi for all app updates.'
    ],
    correctAnswer: 1,
    explanation: 'Least privilege means giving applications only the bare minimum permissions necessary to perform their intended function, protecting your private data.'
  },
  {
    id: 6,
    category: 'Malware Defense',
    question: 'You download a file named "Invoice_Tax2026.pdf.exe". What does the ".exe" extension at the end indicate?',
    options: [
      'It is a standard Adobe PDF document.',
      'It is an executable program file, which could hide malicious code or ransomware.',
      'It is an encrypted spreadsheet.',
      'It is a harmless text note.'
    ],
    correctAnswer: 1,
    explanation: 'Attackers use double extensions like ".pdf.exe" to trick users into thinking a file is a document when it is actually an executable script or malware.'
  }
];
