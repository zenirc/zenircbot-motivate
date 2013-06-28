var ZenIRCBot = require('zenircbot-api').ZenIRCBot
var zen = new ZenIRCBot()

zen.register_commands(
  "motivate.js",
  [{
    name: "!m <target>",
    description: "Motivates the target."
  }, {
    name: "!dm <target>",
    description: "Demotivates the target."
  }]
)

var filtered = zen.filter({version: 1, type: 'directed_privmsg'})
filtered.on('data', function(msg){
  var motivate = /^m(.*)/i.exec(msg.data.message)
  var demotivate = /^dm(.*)/i.exec(msg.data.message)
  var validOne = (motivate || demotivate)
  if (validOne) {
    var target = validOne[1].trim() || msg.data.channel
    if (motivate) {
      zen.send_privmsg(msg.data.channel,
                       "You're doing great work " +
                       target + "!");
    } else if (demotivate) {
      zen.send_privmsg(msg.data.channel,
                       "You're doing horrible work " +
                       target + "!");
    }
  }
})
