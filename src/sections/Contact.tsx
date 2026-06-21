import { useLanguage } from '@/utils/LanguageContext';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Button from '../components/Button';

const Contact = () => {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null as string | null,
  });

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const containerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  const itemVariants = {
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2 } }),
    hidden: { opacity: 0, y: 30 },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = () => {
    if (formRef.current && !status.submitting) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_name: 'Andres Bonilla',
        },
      );

      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      const errorMessage = error.text || t.contact.error;
      setStatus({
        submitting: false,
        submitted: false,
        error: errorMessage,
      });
    }
  };

  return (
    <motion.div
      className="contact"
      id="contact"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 className="contact-title" variants={itemVariants} custom={0}>
        {t.contact.title}
      </motion.h2>
      <motion.h2 className="contact-sub-title" variants={itemVariants} custom={1}>
        {t.contact.subtitle}
      </motion.h2>
      <motion.p className="contact-text" variants={itemVariants} custom={2}>
        {t.contact.text}
      </motion.p>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="contact-form"
        variants={itemVariants}
        custom={3}
      >
        <div className="form-group">
          <motion.input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.contact.namePlaceholder}
            required
            className="form-input"
            whileFocus={{ scale: 1.05 }}
          />
        </div>

        <div className="form-group">
          <motion.input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.contact.emailPlaceholder}
            required
            className="form-input"
            whileFocus={{ scale: 1.05 }}
          />
        </div>

        <div className="form-group">
          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.contact.messagePlaceholder}
            required
            className="form-textarea"
            whileFocus={{ scale: 1.05 }}
          />
        </div>

        <motion.div className="contact-cta" variants={itemVariants} custom={4}>
          <Button
            text={status.submitting ? t.contact.sending : t.contact.sendMessage}
            link="#"
            variant="primary"
            size="lg"
            className={`send-message-btn ${status.submitting ? 'disabled' : ''}`}
            onClick={status.submitting ? undefined : handleSubmitForm}
          />
        </motion.div>

        {status.submitted && (
          <motion.div className="success-message" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            {t.contact.success}
          </motion.div>
        )}

        {status.error && (
          <motion.div className="error-message" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            {status.error}
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Contact;
