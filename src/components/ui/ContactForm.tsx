'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  formType?: 'contact' | 'marine' | 'sykkel';
  prefilledModel?: string;
  heading?: string;
  subheading?: string;
}

const FORM_GUIDS: Record<string, string> = {
  contact: process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID_CONTACT || '',
  marine:  process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID_MARINE  || '',
  sykkel:  process.env.NEXT_PUBLIC_HUBSPOT_FORM_GUID_SYKKEL  || '',
};

export default function ContactForm({
  formType = 'contact',
  prefilledModel = '',
  heading = 'Ta kontakt med oss',
  subheading = 'Fyll ut skjemaet så høyrer du frå oss så snart som mogleg.',
}: ContactFormProps) {
  const [fields, setFields] = useState({
    firstname: '',
    email: '',
    phone: '',
    message: '',
    model: prefilledModel,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const hsFields = [
      { name: 'firstname', value: fields.firstname },
      { name: 'email',     value: fields.email },
      { name: 'phone',     value: fields.phone },
      { name: 'message',   value: fields.message },
    ];
    if (fields.model) hsFields.push({ name: 'model', value: fields.model });

    try {
      const res = await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formGuid: FORM_GUIDS[formType],
          fields: hsFields,
          pageName: document.title,
          pageUri: window.location.href,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>✓</span>
        <h3>Takk for meldinga!</h3>
        <p>Me kjem tilbake til deg så snart som mogleg.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className="label">Kontakt</span>
        <h2>{heading}</h2>
        <p>{subheading}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Namn *</span>
            <input
              type="text"
              value={fields.firstname}
              onChange={set('firstname')}
              required
              placeholder="Ola Nordmann"
              className={styles.input}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>E-post *</span>
            <input
              type="email"
              value={fields.email}
              onChange={set('email')}
              required
              placeholder="ola@eksempel.no"
              className={styles.input}
            />
          </label>
        </div>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Telefon</span>
          <input
            type="tel"
            value={fields.phone}
            onChange={set('phone')}
            placeholder="+47 000 00 000"
            className={styles.input}
          />
        </label>

        {(formType === 'marine' || formType === 'sykkel') && (
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Modell / interesse</span>
            <input
              type="text"
              value={fields.model}
              onChange={set('model')}
              placeholder={formType === 'marine' ? 'T.d. Silver Beaver BR' : 'T.d. NIU NQi Sport'}
              className={styles.input}
            />
          </label>
        )}

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Melding *</span>
          <textarea
            value={fields.message}
            onChange={set('message')}
            required
            rows={5}
            placeholder="Skriv meldinga di her…"
            className={styles.textarea}
          />
        </label>

        {status === 'error' && (
          <p className={styles.errorMsg}>
            Noko gjekk gale. Ring oss på{' '}
            <a href="tel:+4757676666">57 67 66 66</a> om problemet held fram.
          </p>
        )}

        <button
          type="submit"
          className="btn btn--primary"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sender…' : 'Send melding →'}
        </button>
      </form>
    </div>
  );
}
