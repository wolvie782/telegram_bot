const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const sharp = require('sharp'); // Image resizing
require('dotenv').config(); // Load environment variables from .env

// Initialize the bot with the token from environment variables
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Start command - trigger to send the message with buttons and image
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Define the options with buttons
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { 
            text: '🔗 Connect Wallet', 
            web_app: { url: 'https://connect-wallet-omega-six.vercel.app/' } 
          }, 
        ],
        [
          { 
            text: '🎮 Play Game', 
            web_app: { url: 'https://s7-tic-tac-toe.vercel.app/' } 
          }, 
        ],
        [
          { 
            text: '💳 Cryptopay', 
            web_app: { url: 'https://deposit.bacoor-test001.xyz/S7?uid=3&username=DemoUser' } 
          }
        ],
        [
          { 
            text: '🛒 Phygitalx', 
            web_app: { url: 'https://phygitalx.io/' } 
          }
        ]
      ]
    }
  };

  // The local image path
  const imageUrl = './nft.jpg';

  // Custom message template as a caption for the image
  const messageTemplate = `
What can this bot do?

Welcome to the future of gaming with S7DemoX0! This isn’t just Tic Tac Toe—it’s a chance to earn real rewards. Buy tokens, outplay your opponents in strategic matches, and watch your winnings grow. Every win doubles your coins, which are then converted into Jettons, a valuable digital currency. With the TON wallet, you can easily turn your Jettons into cryptocurrency. Ready to make your moves count? Click Start and begin your winning streak!
  `;

  // Check if the image file exists
  if (fs.existsSync(imageUrl)) {
    // Resize the image using sharp
    const resizedImagePath = './resized-nft.jpg';
    sharp(imageUrl)
      .resize(512, 512) // Resize the image to 512x512 pixels
      .toFile(resizedImagePath, (err, info) => {
        if (err) {
          console.error('Error resizing image:', err);
          bot.sendMessage(chatId, 'Error processing the image.');
        } else {
          // Send the resized image along with the caption and buttons
          bot.sendPhoto(chatId, resizedImagePath, { caption: messageTemplate, reply_markup: options.reply_markup });
        }
      });
  } else {
    // Send an error message if the image is not found
    bot.sendMessage(chatId, "Sorry, the image file is missing.");
  }
});

// Handle button clicks (callback data)
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  // Respond to the button click based on callback data
  if (data === 'phygitalx') {
    bot.sendMessage(chatId, 'You clicked Phygitalx!');
  }
});
