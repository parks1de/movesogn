import { NextRequest, NextResponse } from 'next/server';

const API = 'https://api.brevo.com/v3';

export async function POST(req: NextRequest) {
  const { name, email, phone, message, model, formType } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const key = process.env.BREVO_SECRET_KEY;
  if (!key) {
    console.error('[brevo] BREVO_SECRET_KEY not set');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const headers = { 'api-key': key, 'Content-Type': 'application/json' };

  const subject = model
    ? `Ny melding frå ${name} — ${model}`
    : `Ny melding frå ${name} (${formType ?? 'contact'})`;

  const html = `
    <h2>Ny melding frå MOVE Sogn nettsida</h2>
    <table cellpadding="6">
      <tr><td><strong>Namn</strong></td><td>${name}</td></tr>
      <tr><td><strong>E-post</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
      ${phone ? `<tr><td><strong>Telefon</strong></td><td>${phone}</td></tr>` : ''}
      ${model ? `<tr><td><strong>Modell</strong></td><td>${model}</td></tr>` : ''}
      <tr><td><strong>Melding</strong></td><td>${message.replace(/\n/g, '<br>')}</td></tr>
    </table>
    <p style="color:#888;font-size:12px;margin-top:24px">Skjema: ${formType ?? 'contact'}</p>
  `;

  try {
    // Send notification email to MOVE Sogn
    const emailRes = await fetch(`${API}/smtp/email`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sender: { name: 'MOVE Sogn Nettside', email: 'noreply@movesogn.no' },
        to: [{ email: 'post@movesogn.no', name: 'MOVE Sogn' }],
        replyTo: { email, name },
        subject,
        htmlContent: html,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error('[brevo] email failed:', err);
      return NextResponse.json({ error: 'Email failed' }, { status: 500 });
    }

    // Save sender as Brevo contact
    await fetch(`${API}/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name.split(' ')[0], LASTNAME: name.split(' ').slice(1).join(' '), SMS: phone ?? '' },
        listIds: [2],
        updateEnabled: true,
      }),
    }).catch((e) => console.warn('[brevo] contact save failed:', e));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[brevo]', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
