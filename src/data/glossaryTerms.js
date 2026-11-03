export const glossaryTerms = [
  {
    id: 'phishing',
    term: 'Phishing',
    category: 'Social Engineering',
    definition: 'A fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in electronic communications.',
    tip: 'Always check the domain address carefully and never click links in unexpected security warnings.'
  },
  {
    id: 'spear-phishing',
    term: 'Spear Phishing',
    category: 'Social Engineering',
    definition: 'A targeted phishing attack directed at a specific individual or organization, using personal details gathered from social media to increase credibility.',
    tip: 'Be mindful of how much personal details (job title, travel plans) you publish publicly online.'
  },
  {
    id: 'ransomware',
    term: 'Ransomware',
    category: 'Malware',
    definition: 'Malicious software designed to block access to a computer system or encrypt user files until a sum of money (ransom) is paid to the attacker.',
    tip: 'Keep offline or cloud backups of crucial files and never open attachments from unknown senders.'
  },
  {
    id: 'mfa',
    term: 'Multi-Factor Authentication (MFA / 2FA)',
    category: 'Authentication',
    definition: 'An electronic authentication method in which a user is granted access to a website or application only after successfully presenting two or more pieces of evidence (factors).',
    tip: 'Enable TOTP authenticator apps (e.g. Google Authenticator, Bitwarden) over SMS codes whenever possible.'
  },
  {
    id: 'social-engineering',
    term: 'Social Engineering',
    category: 'Attack Tactics',
    definition: 'The psychological manipulation of people into performing actions or divulging confidential information rather than hacking technical systems directly.',
    tip: 'Verify identity through an alternative trusted channel if anyone asks for passwords or urgent wire transfers.'
  },
  {
    id: 'mitm',
    term: 'Man-in-the-Middle (MITM) Attack',
    category: 'Network',
    definition: 'An attack where the adversary secretly relays and possibly alters the communications between two parties who believe they are directly communicating with each other.',
    tip: 'Use a Virtual Private Network (VPN) on unencrypted public Wi-Fi networks.'
  },
  {
    id: 'zero-day',
    term: 'Zero-Day Vulnerability',
    category: 'Software Flaw',
    definition: 'A computer-software vulnerability that is unknown to those who should be interested in mitigating the vulnerability, including the software vendor, with no patch yet released.',
    tip: 'Keep automatic operating system and browser updates enabled at all times.'
  },
  {
    id: 'passkey',
    term: 'Passkey',
    category: 'Authentication',
    definition: 'A digital credential bound to a cryptographic key pair that allows users to log into websites without typing passwords, leveraging biometric authentication (FaceID, fingerprint).',
    tip: 'Passkeys are naturally immune to phishing because credentials are tied strictly to the website domain.'
  },
  {
    id: 'vpn',
    term: 'Virtual Private Network (VPN)',
    category: 'Network',
    definition: 'A tool that creates a encrypted tunnel for your network data, hiding your IP address and protecting your activity on public Wi-Fi networks.',
    tip: 'Choose trustworthy, non-logging VPN providers when connecting on shared networks.'
  },
  {
    id: 'entropy',
    term: 'Password Entropy',
    category: 'Password Security',
    definition: 'A mathematical measure (in bits) of the randomness and unpredictability of a password.',
    tip: 'Length increases entropy much faster than simply swapping letters for numbers.'
  }
];
