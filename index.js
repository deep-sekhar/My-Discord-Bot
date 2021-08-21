// EXPRESS AS WEB SERVER 
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// CONFIGURE ENV FILES FOR OFFLINE WORK
require('dotenv').config({path:'./config.env'})

// -------------------------------------------------------------------
// DISCORD API 
const Discord = require('discord.js');
const client = new Discord.Client();
const symb = process.env.prefix;
// mapping commands 
client.commands = new Discord.Collection();
const botCommands = require('./commands/botcom');
botCommands.map(com => {
  client.commands.set(com.name, com);
});
// for auto msgs 
const cron = require('cron');

// CLIENT ACTIONS
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  let scheduledMessage = new cron.CronJob('00 00 01 * * *', () => {
    // This runs every day at 1AM, you can do anything you want
    // Specifing your guild (server) and your channel
       const guild = client.guilds.cache.get('856472795738800138');
       const channel = guild.channels.cache.get('856472796187197482');
       channel.send('Gd n8 boys!');
       const guild2 = client.guilds.cache.get('760917131390091266');
       const channel2 = guild2.channels.cache.get('789432643280044092');
       channel2.send('Gd n8 boys!');
      });
          
    // When you want to start it, use:
    scheduledMessage.start()

  let scheduledMessage2 = new cron.CronJob('00 30 08 * * *', () => {
    // This runs every day at 1AM, you can do anything you want
    // Specifing your guild (server) and your channel
       const guild = client.guilds.cache.get('856472795738800138');
       const channel = guild.channels.cache.get('856472796187197482');
       channel.send('Gd morning boys!');
       const guild2 = client.guilds.cache.get('760917131390091266');
       const channel2 = guild2.channels.cache.get('789432643280044092');
       channel2.send('Gd morning boys!');
      });
          
    // When you want to start it, use:
    scheduledMessage2.start()
  });

// NORMAL COMMANDS 
client.on('message', msg => {
  // check if the message is from our own bot and ignore it if it is
  if (msg.author.bot) return;

  // if it is me 
  const mentionedMembersCollection = msg.mentions.members;
  // console.info(mentionedMembersCollection)
  if(mentionedMembersCollection.has('854910698727407656')) {
    return(msg.channel.send('Who pong ?'));
  }

  // message starts with the prefix we defined earlier and return if it doesn’t
  if (!msg.content.startsWith(symb)) return;

  // DEBUG PURPOSE 
  // msg.content = msg.content.slice(2).toLowerCase();
  // console.info(`Called command: ${msg.content}`);
  // console.info(client.commands)
  // console.info(`Called command: ${command}`);

  const command = msg.content.slice(2).toLowerCase().trim();
  const args = ""

  if (!client.commands.has(command)) {
    return(msg.reply("Pardon Sir?"));
  }
  // mentionedMembersCollection.has(bot.user.id)
  console.info(client.user.id)

  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('More commands will be added soon!');
  }

});

client.login(process.env.DISCORD_TOKEN);