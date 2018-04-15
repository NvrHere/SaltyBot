var Discord = require('discord.js');
var auth = require('./auth.json');
// Initialize Discord Bot
var bot = new Discord.Client({
   disableEveryone: true
});

bot.on("ready", async () => {
	//Some CMD Logging/Prints That Bot Is Ready And Its Username
	console.log(`Bot Is Ready ${bot.user.username}`);
	//For Inviting Bot To Server
	bot.generateInvite(["ADMINISTRATOR"]).then(link => {
		//Display Invite Link
		console.log(link);
	}).catch(err => {
		//Print Out Error
		console.log(err.stack);
	});
	
	//To Execute Something After Invited
	//await bot.generateInvite(["ADMINISTRATOR"]);
});

LyQuotes = ["Suck My Dick \n -Ly", "OMG I\'m the Prettiest \"Girl\" In The Whole Universe", "Durian Durian Durian Girl", "Best Thresh SG", 
"WO HAO GAO AH", "Changi Airport Children's Slide Mascot", "God Thresh SG"];
//Message Stuff
bot.on('message', async message => {
	//Prevent Bot From Replying To Bot
	if (message.author.bot) return;
	
	//Check If Direct Message
	if(message.channel.type == "dm" && !message.author.bot) {
		
		return message.channel.send("Please don't dm me, it's not like I dislike it or anything!")
	}
	
	const cmdPrefix = "!";
	//Execute Command With "!"
	if(message.content.startsWith(cmdPrefix)) {
		var args = message.content.substring(1).split(' ');
		//Contains The Command Split From The "!"
		var cmd = args[0];
		args = args.slice(1);
		switch(cmd) {
			case 'pizza':
				return message.channel.send("Pizza Is Great!");
			break;
			case 'SocialMedia':
				return message.channel.send("Here is my Social Media: \n https://twitch.tv/saltytissues \n https://twitter.com/TheSaltyTissue?lang=en");
			break;
			case 'ReaperPlays':
				return message.channel.send("https://clips.twitch.tv/ReliableHandsomeHerdUnSane");
			break;
			case 'LiuYan':
			case 'LY':
			case 'Ly':
			case 'Raina':
				var lyString = LyQuotes[Math.floor(Math.random() * LyQuotes.length)];
				return message.channel.send(lyString);
				
			break;
		}
	}
});

//Welcome Stuff
bot.on('guildMemberAdd', member => {
	//Direct Message User Welcome Message
	//member.send("Welcome to SaltyClub $(member) Enjoy your stay!");
	
	var defaultChannel = "welcome"; //Change this value to whatever is your welcome channel
	//Send To Channel Called general
	bot.channels.find("name",defaultChannel).send("Welcome "+ member +" to the SaltyClub, Enjoy your Stay");
});

var stopmsg = 0;
bot.on('presenceUpdate', (oldStatus, newStatus) => {
	if (newStatus.presence.game != null) {
		if (newStatus.presence.game.url != null) { 
			if(newStatus.presence.game.streaming != null && newStatus.presence.game.streaming == true) {
				if (stopmsg == 0) {
				stopmsg += 1;
				bot.channels.find("name","going_live").send(""+ newStatus.user.username +" is now streaming " + newStatus.presence.game.name + " at " + newStatus.presence.game.url + " , Come and enjoy the stream!");
				}else {
					stopmsg = 0;
				}
			}
		}
	}
});

bot.login(process.env.BOT_TOKEN);
