
export const maskEmail = (email: string): string => {
    const [local, domain] = email.split('@');
    const maskedLocal = local.slice(0, 2) + '****' + local.slice(-2);
    return `${maskedLocal}@${domain}`;
};
