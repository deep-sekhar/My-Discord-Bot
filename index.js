// EXPRESS AS WEB SERVER 
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// CONFIGURE ENV FILES FOR OFFLINE WORK
require('dotenv').config({ path: './config.env' })

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

  //STATUS
  client.user.setActivity('$$help', { type: 'PLAYING' });

  let scheduledMessage = new cron.CronJob('00 30 08 * * *', () => {
    // This runs every day at 1AM, you can do anything you want
    // Specifing your guild (server) and your channel
    const guild = client.guilds.cache.get('856472795738800138');
    const channel = guild.channels.cache.get('856472796187197482');
    channel.send('Gd morning boys!');
    const guild2 = client.guilds.cache.get('760917131390091266');
    const channel2 = guild2.channels.cache.get('789432643280044092');
    channel2.send('Gd morning boys!');
  }, undefined, true, "Asia/Kolkata");

  let scheduledMessage2 = new cron.CronJob('00 25 00 * * *', () => {
    // This runs every day at 1AM, you can do anything you want
    // Specifing your guild (server) and your channel
    const guild = client.guilds.cache.get('856472795738800138');
    const channel = guild.channels.cache.get('856472796187197482');
    channel.send('Gd n8 boys!');
    const guild2 = client.guilds.cache.get('760917131390091266');
    const channel2 = guild2.channels.cache.get('789432643280044092');
    channel2.send('Gdn8 boys!');
  }, undefined, true, "Asia/Kolkata");

  let scheduledMessage3 = new cron.CronJob('00 09 20 * * *', () => {
    const guild2 = client.guilds.cache.get('760917131390091266');
    const channel2 = guild2.channels.cache.get('789432643280044092');
    channel2.send('Game Time boys!');
  }, undefined, true, "Asia/Kolkata");

  // When you want to start it, use:
  scheduledMessage2.start()
  scheduledMessage.start()
  scheduledMessage3.start()
});

// NORMAL COMMANDS 
client.on('message', msg => {
  // check if the message is from our own bot and ignore it if it is
  if (msg.author.bot) return;

  if(msg.content == "gd n8") return(msg.channel.send('gd n8'));

  // if bot is mentioned
  const mentionedMembersCollection = msg.mentions.members;
  // deep id - 854910698727407656
  if(mentionedMembersCollection){
  if (mentionedMembersCollection.has('878180887953551401')) {
    msg.channel.send("",{files: ["./commands/images/dog.png"]});
    return (msg.channel.send('Who pong ?'));
  }}

  // message starts with the prefix we defined earlier and return if it doesn’t
  if(msg.content === "clr") return(msg.channel.send(">clear 50"));
  if (!msg.content.startsWith(symb)) return;

  // DEBUG PURPOSE 
  // msg.content = msg.content.slice(2).toLowerCase();
  // console.info(`Called command: ${msg.content}`);
  // console.info(client.commands)
  // console.info(`Called command: ${command}`);

  const command = msg.content.slice(2).toLowerCase().trim();
  const args = msg.content.slice(2).toLowerCase().trim();

  if(command === "help"){
    let st ="COMMAND -- DESCRIPTION\n";
    client.commands.forEach(ele=>{
      st+= ele.name;
      st+= " --> ";
      st+= ele.description;
      st+= "\n";
    })
    st+="CREATE -- WORK --INSPIRE!";
    return (msg.channel.send(st));
  }

  if (!client.commands.has(command)) {
    return (msg.reply("More commands will be added soon!"));
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