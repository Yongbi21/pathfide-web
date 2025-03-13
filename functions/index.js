    const {onDocumentCreated} = require("firebase-functions/v2/firestore");
    const {onRequest} = require("firebase-functions/v2/https");
    const logger = require("firebase-functions/logger");
    const admin = require("firebase-admin");

    // Initialize Firebase Admin SDK
    admin.initializeApp();

exports.sendChatNotification = onDocumentCreated("Chats/{chatId}/messages/{messageId}", async (event) => {
  const message = event.data.data();
  logger.info("New message detected", {messageId: event.params.messageId, chatId: event.params.chatId, message});

  const receiverId = message.receiverId;
  const senderId = message.senderId;

  if (!receiverId || !senderId) {
    logger.error("Missing receiver or sender ID", {message});
    return null;
  }

  try {
    const receiverDoc = await admin.firestore().collection("users").doc(receiverId).get();
    if (!receiverDoc.exists) {
      logger.error("Receiver document not found", {receiverId});
      return null;
    }

    const receiverData = receiverDoc.data();
    const fcmToken = receiverData?.fcmToken;
    if (!fcmToken) {
      logger.error("No FCM token found for user", {receiverId});
      return null;
    }

    const senderDoc = await admin.firestore().collection("users").doc(senderId).get();
    if (!senderDoc.exists) {
      logger.error("Sender document not found", {senderId});
      return null;
    }

    const senderData = senderDoc.data();
    const senderName = `${senderData.firstName} ${senderData.lastName}`;

    const payload = {
      token: fcmToken,
      data: {
        title: senderName,
        body: message.content,
        senderId: senderId,
        senderName: senderName,
        chatId: event.params.chatId
      },
      notification: {
        title: senderName,
        body: message.content.substring(0, 100)
      }
    };

    logger.info("Sending notification to:", {fcmToken, payload});
    const response = await admin.messaging().send(payload);
    logger.info("Notification sent successfully", {response});

    return {success: true, messageId: response};

  } catch (error) {
    logger.error("Error sending notification", {error: error.message});
    return {success: false, error: error.message};
  }
});
