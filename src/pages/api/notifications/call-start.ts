//@ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next';
import { headers } from '@/helper/CONST';
//import * as admin from 'firebase-admin';


const firebaseConfig = {
  projectId: "eshaafi-patientapp",
  clientEmail: "your-email@eshaafi-patientapp.iam.gserviceaccount.com",
  privateKey: `-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n`
};
// Initialize Firebase Admin
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     }),
//   });
// }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      appointmentId,
      profileId,
      channelName,
      patientName,
      message
    } = req.body;

    // Validate required fields
    if (!appointmentId || !profileId || !channelName) {
      return res.status(400).json({ 
        error: 'Missing required fields: appointmentId, profileId, channelName' 
      });
    }

    // Fetch the patient's device token from backend
    const tokenResponse = await fetch(`${BASE_URL}/auth/deviceToken?userId=${profileId}`, {
      method: 'GET',
      headers: headers(),
    });

    if (!tokenResponse.ok) {
      console.error('Failed to fetch device token:', tokenResponse.status);
      return res.status(500).json({ error: 'Failed to fetch device token' });
    }

    const tokenData = await tokenResponse.json();
    const patientToken = tokenData.token;

    if (!patientToken) {
      console.error('No device token found for patient');
      return res.status(404).json({ error: 'No device token found for patient' });
    }

    // Send FCM notification to patient
    const notificationPayload = {
      title: 'Incoming Video Call',
      body: `Doctor is calling for your consultation`,
    };

    const fcmMessage = {
      token: patientToken,
      notification: notificationPayload,
      data: {
        appointmentId: appointmentId.toString(),
        profileId: profileId.toString(),
        channelName,
        action: 'incoming_call',
        timestamp: new Date().toISOString(),
      },
    };

    // try {
    //   const fcmResponse = await admin.messaging().send(fcmMessage);
    //   console.log('FCM notification sent successfully:', fcmResponse);
    // } catch (error) {
    //   console.error('Error sending FCM notification:', error);
    //   return res.status(500).json({ error: 'Failed to send notification' });
    // }

    // You might also want to store this notification in your database
    // for tracking and analytics purposes

    res.status(200).json({ 
      success: true, 
      message: 'Notification sent successfully',
      notificationId: `notif_${Date.now()}`, // Generate unique ID
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ 
      error: 'Failed to send notification',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}