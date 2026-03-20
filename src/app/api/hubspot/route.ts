/**
 * /api/hubspot/route.ts
 * Proxies form submissions to HubSpot Forms API v3.
 * Keeps portal ID + form GUIDs server-side only for security.
 */

import { NextRequest, NextResponse } from 'next/server';

const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

interface FormPayload {
  formGuid: string;
  fields: { name: string; value: string }[];
  pageName?: string;
  pageUri?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FormPayload = await request.json();
    const { formGuid, fields, pageName, pageUri } = body;

    if (!PORTAL_ID || !formGuid) {
      return NextResponse.json(
        { error: 'HubSpot configuration missing' },
        { status: 500 }
      );
    }

    const payload = {
      fields,
      context: {
        pageUri: pageUri || '',
        pageName: pageName || '',
      },
    };

    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${formGuid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!hsRes.ok) {
      const err = await hsRes.text();
      console.error('[hubspot]', err);
      return NextResponse.json({ error: 'HubSpot submission failed' }, { status: hsRes.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[hubspot]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
