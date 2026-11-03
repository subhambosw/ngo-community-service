/**
 * Evaluates password strength, entropy, estimated crack time, and patterns.
 * Optimized for Black Glossy Monochrome theme.
 */
export const evaluatePassword = (pass) => {
  if (!pass) {
    return {
      score: 0,
      entropyBits: 0,
      crackTimeText: 'Instant',
      label: 'Empty',
      color: 'bg-zinc-800',
      textColor: 'text-zinc-500',
      checks: {
        length: false,
        uppercase: false,
        numbers: false,
        symbols: false,
      }
    };
  }

  let poolSize = 0;
  const hasLower = /[a-z]/.test(pass);
  const hasUpper = /[A-Z]/.test(pass);
  const hasNum = /[0-9]/.test(pass);
  const hasSym = /[^a-zA-Z0-9]/.test(pass);

  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNum) poolSize += 10;
  if (hasSym) poolSize += 33;

  // Calculate Shannon Entropy: log2(poolSize^length) = length * log2(poolSize)
  const entropyBits = Math.round(pass.length * (Math.log2(poolSize || 1)));

  // Crack time calculations based on 100 billion guesses per second (GPU cluster)
  const combinations = Math.pow(poolSize || 1, pass.length);
  const guessesPerSec = 100000000000; // 100 Billion/sec
  const seconds = combinations / guessesPerSec;

  let crackTimeText = 'Instant (< 1 sec)';
  if (seconds >= 3153600000000) { // 100,000 years
    crackTimeText = 'Centuries / Billions of years';
  } else if (seconds >= 31536000) {
    const years = Math.round(seconds / 31536000);
    crackTimeText = `${years.toLocaleString()} year${years > 1 ? 's' : ''}`;
  } else if (seconds >= 86400) {
    const days = Math.round(seconds / 86400);
    crackTimeText = `${days} day${days > 1 ? 's' : ''}`;
  } else if (seconds >= 3600) {
    const hours = Math.round(seconds / 3600);
    crackTimeText = `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (seconds >= 60) {
    const mins = Math.round(seconds / 60);
    crackTimeText = `${mins} minute${mins > 1 ? 's' : ''}`;
  } else if (seconds > 1) {
    crackTimeText = `${Math.round(seconds)} seconds`;
  }

  let score = Math.min(100, Math.round((entropyBits / 90) * 100));

  let label = 'Very Weak';
  let color = 'bg-zinc-700';
  let textColor = 'text-zinc-500';

  if (entropyBits >= 80) {
    label = 'Military Grade / Uncrackable';
    color = 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)]';
    textColor = 'text-white';
  } else if (entropyBits >= 60) {
    label = 'Strong';
    color = 'bg-zinc-300';
    textColor = 'text-zinc-200';
  } else if (entropyBits >= 40) {
    label = 'Moderate';
    color = 'bg-zinc-500';
    textColor = 'text-zinc-400';
  } else if (entropyBits >= 20) {
    label = 'Weak';
    color = 'bg-zinc-600';
    textColor = 'text-zinc-400';
  }

  return {
    score,
    entropyBits,
    crackTimeText,
    label,
    color,
    textColor,
    checks: {
      length: pass.length >= 12,
      uppercase: hasUpper,
      numbers: hasNum,
      symbols: hasSym,
    }
  };
};

export const generateSecurePassword = (length = 16) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let result = '';
  const cryptoObj = window.crypto || window.msCrypto;
  if (cryptoObj) {
    const values = new Uint32Array(length);
    cryptoObj.getRandomValues(values);
    for (let i = 0; i < length; i++) {
      result += chars[values[i] % chars.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  return result;
};
