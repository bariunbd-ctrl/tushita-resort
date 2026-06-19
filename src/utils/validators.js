// Form & data validators

export function isValidEmail(email) {
  if (!email) return true; // email optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  if (!phone) return false;
  // allow digits, spaces, +, -, ()
  return /^[+\d][\d\s\-()]{5,}$/.test(phone.trim());
}

export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}

// Validate contact form. Returns { valid, errors: {field: msgKey} }
export function validateInquiry(data, language = 'mn') {
  const errors = {};
  if (!isRequired(data.name)) {
    errors.name = language === 'mn' ? 'Нэрээ оруулна уу' : 'Please enter your name';
  }
  if (!isRequired(data.phone)) {
    errors.phone = language === 'mn' ? 'Утсаа оруулна уу' : 'Please enter your phone';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = language === 'mn' ? 'Утасны дугаар буруу байна' : 'Invalid phone number';
  }
  if (data.email && !isValidEmail(data.email)) {
    errors.email = language === 'mn' ? 'Имэйл хаяг буруу байна' : 'Invalid email';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
