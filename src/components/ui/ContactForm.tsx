'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  formType?: 'contact' | 'marine' | 'sykkel' | 'maintenance';
  prefilledModel?: string;
  heading?: string;
  subheading?: string;
}

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
    motorBrand: 'Suzuki',
    motorModel: '',
    motorYear: '',
    serviceType: 'Årsservice',
    preferredDate: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, formType }),
      });
      setStatus(res.ok ? 'success' : 'error');
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
      {(heading || subheading) && (
        <div className={styles.header}>
          <span className="label">Kontakt</span>
          {heading   && <h2>{heading}</h2>}
          {subheading && <p>{subheading}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>

        {/* Name + Email */}
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Namn *</span>
            <input type="text" value={fields.firstname} onChange={set('firstname')}
              required placeholder="Ola Nordmann" className={styles.input} />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>E-post *</span>
            <input type="email" value={fields.email} onChange={set('email')}
              required placeholder="ola@eksempel.no" className={styles.input} />
          </label>
        </div>

        {/* Phone */}
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Telefon</span>
          <input type="tel" value={fields.phone} onChange={set('phone')}
            placeholder="+47 000 00 000" className={styles.input} />
        </label>

        {/* Marine / sykkel: model field */}
        {(formType === 'marine' || formType === 'sykkel') && (
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Modell / interesse</span>
            <input type="text" value={fields.model} onChange={set('model')}
              placeholder={formType === 'marine' ? 'T.d. Silver Beaver BR' : 'T.d. NIU NQi Sport'}
              className={styles.input} />
          </label>
        )}

        {/* Maintenance-specific fields */}
        {formType === 'maintenance' && (
          <>
            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Motor merke</span>
                <select value={fields.motorBrand} onChange={set('motorBrand')} className={styles.input}>
                  <option>Suzuki</option>
                  <option>Yamaha</option>
                  <option>Mercury</option>
                  <option>Honda</option>
                  <option>Evinrude</option>
                  <option>Annan</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Motormodell</span>
                <input type="text" value={fields.motorModel} onChange={set('motorModel')}
                  placeholder="T.d. DF90" className={styles.input} />
              </label>
            </div>

            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Årsmodell</span>
                <input type="text" value={fields.motorYear} onChange={set('motorYear')}
                  placeholder="T.d. 2019" className={styles.input} />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Ønskt dato</span>
                <input type="date" value={fields.preferredDate} onChange={set('preferredDate')}
                  className={styles.input} />
              </label>
            </div>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Serviceomfang</span>
              <select value={fields.serviceType} onChange={set('serviceType')} className={styles.input}>
                <option>Årsservice</option>
                <option>Feil / problem</option>
                <option>Motoroverhaleing</option>
                <option>Vinterlagring</option>
                <option>Avrigging</option>
                <option>Annan service</option>
              </select>
            </label>
          </>
        )}

        {/* Message */}
        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            {formType === 'maintenance' ? 'Beskriving av problem / ønskjer' : 'Melding *'}
          </span>
          <textarea
            value={fields.message}
            onChange={set('message')}
            required={formType !== 'maintenance'}
            rows={5}
            placeholder={formType === 'maintenance'
              ? 'Beskriv problemet eller kva service du ønskjer…'
              : 'Skriv meldinga di her…'}
            className={styles.textarea}
          />
        </label>

        {status === 'error' && (
          <p className={styles.errorMsg}>
            Noko gjekk gale. Ring oss på{' '}
            <a href="tel:+4757676666">57 67 66 66</a> om problemet held fram.
          </p>
        )}

        <button type="submit" className="btn btn--primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sender…' : 'Send melding →'}
        </button>
      </form>
    </div>
  );
}
