// 📦 Import Twilio
import twilio from 'twilio';




/**
 * 📤 Send WhatsApp Message
 * @param {string} msg - The message content to send
 * @param {string} number - The recipient's number in international format (e.g., +919876543210)
 */
export const sendWhatsAppMessage = async (msg, number) => {
  const accountSid = 'ACe74f8f40b0b8627fa19b76b826624d56';
  const authToken = '7fb8f54afe2ea9d45e56d053d4132e10';
  const client = twilio(accountSid, authToken);
  try {
    const response = await client.messages.create({
      from: 'whatsapp:+19342509197', // Twilio Sandbox number
      to: `whatsapp:${number}`,       // Recipient number
      body: msg
    });
    console.log('✅ Message sent. SID:', response.sid);
    return response;
  } catch (err) {
    console.error('❌ Failed to send message:', err.message);
    throw err;
  }
};
