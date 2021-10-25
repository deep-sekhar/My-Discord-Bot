// EXPRESS AS WEB SERVER 
const express = require('express');
const app = express();
const port = 3000;
const fetch = require("node-fetch");

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

// ------------------------------------------------
// GREETING SCHEDULED MESSAGES NOT USED NOW 

  // let scheduledMessage = new cron.CronJob('00 30 08 * * *', () => {
  //   // This runs every day at 1AM, you can do anything you want
  //   // Specifing your guild (server) and your channel
  //   const guild = client.guilds.cache.get('856472795738800138');
  //   const channel = guild.channels.cache.get('856472796187197482');
  //   channel.send('Gd morning boys!');
  //   const guild2 = client.guilds.cache.get('760917131390091266');
  //   const channel2 = guild2.channels.cache.get('789432643280044092');
  //   channel2.send('Gd morning boys!');
  // }, undefined, true, "Asia/Kolkata");

  // When you want to start it, use:
  // scheduledMessage.start()
  // ------------------------------------------------

  let scheduledMessage = new cron.CronJob('00 45 08 * * *', () => {
  const guild = client.guilds.cache.get('760917131390091266');
  const channel = guild.channels.cache.get('865675535270281226');
  channel.send('Bored doing classes, Here enjoy reading some headlines of the day:!');
      let lnw = async()=>{
        try{
          let akey = process.env.GKEY;
          let res = await fetch(`https://gnews.io/api/v4/top-headlines?token=${akey}&lang=en&country=in`);
          console.log(res.status);
          if(res.status!=200)
          {
          return(channel.send(res.status));
          throw new Error("failed");
          }
          let json = await res.json();
          let articles = json.articles;
          Array.from(articles).forEach((ele,id)=>{
              let nz = ""; 
              nz +=`TOP HEADLINES:: `+ele.title+"\n";
              nz += ele.url+"\n\n";
              // return(msg.channel.send(nz));
              setTimeout(()=>{ return(channel.send(nz)); }, 20000*id);
          });
        }catch(e)
        {
          return(channel.send('I got fucked'));
        }
      }
      lnw();
  }, undefined, true, "Asia/Kolkata");
  scheduledMessage.start()
});

// NORMAL COMMANDS 
client.on('message', msg => {
  // check if the message is from our own bot and ignore it if it is
  if (msg.author.bot) return;

  if(msg.content == "gd n8") return(msg.channel.send('gd n8'));

  // if bot is mentioned
  const mentionedMembersCollection = msg.mentions.members;
  if(mentionedMembersCollection){
  if (mentionedMembersCollection.has('878180887953551401')) {
    msg.channel.send("",{files: ["./commands/images/dog.png"]});
    return (msg.channel.send('Who pong ?'));
  }}

  // message starts with the prefix we defined earlier and return if it doesn’t
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
  console.info(client.user.id)

  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('More commands will be added soon!');
  }

});

client.login(process.env.DISCORD_TOKEN);