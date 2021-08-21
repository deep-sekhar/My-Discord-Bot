module.exports =[{
    name: 'ping',
    description: 'Ping!',
    execute(msg, args) {
      msg.reply('pong');
      // msg.channel.send('pong');
    }
  },
  {
    name: 'hemlo',
    description: 'hii!',
    execute(msg, args) {
      msg.reply('hi!');
      // msg.channel.send('pong');
    }
  },
  {
    name: 'spam',
    description: 'spam!',
    execute(msg, args) {
      for(let i =0; i<10; i++)
      // msg.reply('server spammed!');
      msg.channel.send('server spammed!');
    }
  }
  ];