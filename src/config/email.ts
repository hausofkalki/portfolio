export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_k6tlqfh',
  TEMPLATE_ID: 'template_6atvzsb',
  PUBLIC_KEY: 'Nlck6JtN1PYxiH7YZ',
} as const;

// Template parameters for type safety
export type EmailTemplateParams = {
  from_name: string;
  reply_to: string;
  phone: string;
  message: string;
}; 