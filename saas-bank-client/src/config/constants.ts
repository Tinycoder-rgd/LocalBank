// API URL based on environment
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Payment types
export const PAYMENT_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  TRANSFER: 'transfer',
  BILL_PAYMENT: 'bill_payment',
};

// Transaction status
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Support contact
export const SUPPORT_EMAIL = 'support@localbank.com';
export const SUPPORT_PHONE = '+1 (555) 123-4567';