const fetch = require("node-fetch");

module.exports =[{
    name: 'ping',
    description: 'My 1st ever command',
    execute(msg, args) {
      msg.reply('pong');
      // msg.channel.send('pong');
    }
  },
  {
    name: 'pepk',
    description: 'pepking emoji',
    execute(msg, args) {
      msg.channel.send('<:PepeKingLove:834691690396385290>');
    }
  },
  {
    name: 'about',
    description: 'about me',
    execute(msg, args) {
      msg.channel.send("",{files: ["./commands/images/dog.png"]});
      msg.reply('I ..am a result of all 4 who came before me :-)');
    }
  },
  {
    name: 'spam',
    description: 'spam time!',
    execute(msg, args) {
      for(let i =0; i<10; i++)
      msg.channel.send(args);
    }
  },
  {
    name: 'wao',
    description: 'wao emoji',
    execute(msg, args) {
      msg.channel.send("",{files: ["./commands/images/1.png"]});
    }
  },
  {
    name: 'avengers assemble',
    description: 'call everyone',
    execute(msg, args) {
      msg.channel.send(`<@854910698727407656>--<@760915500745359400>--<@787377550917238784>--<@784423230525014036>--<@778992537229983754>    assemble`);
    }
  },
  {
    name: 'dog',
    description: 'dog pics!',
   execute (msg, args) {
    imm = async()=>{
      try{
        res = await fetch("https://dog.ceo/api/breeds/image/random");
        console.info(res.status)
        if(res.status>=200 || res.status<300)
        {
        json = await res.json();
        linker = json.message;
        // console.info(linker);
        msg.channel.send("", {files: [linker]});
        }
        else throw new Error(res.status) 
      }
      catch(e){
      msg.channel.send("error occured2 "+e);
      }
      }
    imm();
  }
  },
  {
    name: 'cat',
    description: 'cat pics!',
   execute (msg, args) {
    imm = async()=>{
      try{
        res = await fetch("https://api.thecatapi.com/v1/images/search");
        console.info(res.status)
        if(res.status>=200 || res.status<300)
        {
        json = await res.json();
        linker = json[0].url;
        // console.info(linker);
        msg.channel.send("", {files: [linker]});
        }
        else throw new Error(res.status) 
      }
      catch(e){
      msg.channel.send("error occured2 "+e);
      }
      }
    imm();
  }
  },
  {
    name: 'dare',
    description: 'want a dare?',
   execute (msg, args) {
    task = async()=>{
      try{
        res = await fetch("https://www.boredapi.com/api/activity");
        console.info(res.status)
        if(res.status>=200 || res.status<300)
        {
        json = await res.json();
        job = json.activity;
        msg.reply(job);
        }
        else throw new Error(res.status) 
      }
      catch(e){
      msg.channel.send("error occured. DETAILS: "+e);
      }
      }
    task();
  }
  },
  {
    name: 'joke',
    description: 'a random joke!',
   execute (msg, args) {
    joke = async()=>{
      try{
        res = await fetch("https://official-joke-api.appspot.com/random_joke");
        console.info(res.status)
        if(res.status>=200 || res.status<300)
        {
        json = await res.json();
        linker1 = json.setup;
        linker2= json.punchline;
        msg.channel.send(linker1);
        setTimeout(() => {
        msg.reply(linker2);
        },6000 );
        }
        else {
          console.log("RESPONSE STATUS:"+res.status)
          throw new Error(res.status) 
        }
      }
      catch(e){
      msg.channel.send("error occured.\nDETAILS: "+e);
      }
      }
    joke();
  }
  }
  ];