import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Your audience ID from Resend
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

export async function POST(request: Request) {
  try {
    // Parse request body
    const { email, firstName, lastName } = await request.json();

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!AUDIENCE_ID) {
      return NextResponse.json(
        { error: 'Audience ID is not configured' },
        { status: 500 }
      );
    }

    // Add contact to Resend audience with firstName and lastName
    const data = await resend.contacts.create({
      email,
      firstName,
      lastName,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        data 
      }
    );
  } catch (error) {
    // Handle errors
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to subscribe to newsletter',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}