const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env

// Initialize the bot with the token from environment variables
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Start command - trigger to send the message with buttons and image
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  console.log(chatId, 'chat id')

  // Define the options with buttons
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { 
            text: '💳 Buy Game Token Now', 
            web_app: { url: 'https://deposit.bacoor-test001.xyz/S7?uid=3&username=DemoUser' } 
          }
        ],
        [
          { 
            text: '🎮 Check your current token amount', 
            web_app: { url: '#' } 
            // web_app: { url: 'https://s7-tic-tac-toe.vercel.app/' } 
          }, 
        ],
        [
          { 
            text: '🔗 Connect Wallet', 
            web_app: { url: 'https://connect-wallet.rajatpatel.xyz/' } 
          }, 
        ],
        // [
        //   { 
        //     text: '🛒 BCM Trade Cente', 
        //     web_app: { url: 'https://phygitalx.io/' } 
        //   }
        // ]
      ]
    }
  };

  // The absolute path to the image
  const imageUrl = './resized-nft.jpg'; 
  // Custom message template as a caption for the image
  const messageTemplate = `
Game Token Store BOT � �

Welcome to the Game Token Store BOT!
You can easily buy game coins to join matches and win rewards.

� How it works:

1. Coins: Purchase game coins with a 4% service fee.
2. let Connect: If you haven't connected your wallet yet, please do so to proceed.
Get your game coins now and jump into the action!

Type /buy to start your purchase! `;

  // Check if the image file exists
  fs.access(imageUrl, fs.constants.F_OK, (err) => {
    if (err) {
      // Send an error message if the image is not found
      bot.sendMessage(chatId, "Sorry, the image file is missing.");
    } else {
      // Send the image along with the caption and buttons
      bot.sendPhoto(chatId, imageUrl, { caption: messageTemplate, reply_markup: options.reply_markup });
    }
  });
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
