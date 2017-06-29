var Discord = require('discord.js');
var challonge = require('challonge')
var request = require('request');

challonge.api_key = ""

function checkRole(message,rolename){
	var authorRoles = message.member.roles.array()
	var roleNames = []
	for (var i = authorRoles.length - 1; i >= 0; i--) {
		roleNames.push(authorRoles[i].name)
	}
	var manager = roleNames.indexOf(rolename) != -1;
	return manager
}

function sendPlayerMatch(tournament,tournament_name,participantActive,single){
	challonge.getMatchByPlayer(tournament_name,participantActive.participant.name.split("-")[0],function(match){
		challonge.getPlayerbyID(tournament,match.player1_id,function(player1){
			challonge.getPlayerbyID(tournament,match.player2_id,function(player2){
				var display = true
				if(single){
					if(match.state == complete){
						display = false
					}
				}
				if(display){
					var finalMessage = "Match " + match.suggested_play_order + " is " + "<@" + player1.participant.name.split("-")[1] + ">" + " vs " + "<@" + player2.participant.name.split("-")[1] + ">" + "!"
					client.fetchUser(String(participantActive.participant.name.split("-")[1])).then(user => 
						user.createDM().then(dm => {
								dm.sendMessage(finalMessage)
							}
						)
					)
				}
			})
		})
	})
}

var client = new Discord.Client();

//DARKBOT
// var token =''; 

//ACTUAL
var token = '';

client.login(token);

client.on('ready', () =>{
	var servers = client.guilds.array()
	for (var x = servers.length - 1; x >= 0; x--) {
		var customRole;
		var customChannel;
		var reboot = false;
		var serverroles = servers[x].roles.array()
		var serverchannels = servers[x].channels.array()
		var rolenames = []
		console.log("Connected to "+ servers[x].name)
		for (var i = serverroles.length - 1; i >= 0; i--) {
			rolenames.push(serverroles[i].name)
		};
		customRole = serverroles[rolenames.reverse().indexOf("Tournament Manager")]
		if(rolenames.indexOf("Tournament Manager") == -1){
			servers[x].defaultChannel.sendMessage("You will need to reinvite this bot as there was an error upon start-up")
			reboot = true;
		}
		var channelnames = []
		for (var y = serverchannels.length - 1; y >= 0; y--) {
			channelnames.push(serverchannels[y].name)
		};
		customChannel = serverchannels[channelnames.reverse().indexOf("tournament-commands")]
		if(channelnames.indexOf("tournament-commands") == -1){
			servers[x].defaultChannel.sendMessage("You will need to reinvite this bot as there was an error upon start-up")
			reboot = true
		}
		if(reboot){
			if(customChannel != undefined){
			customChannel.delete()
			}
			if(customRole != undefined){
			customRole.delete()
			}
			servers[x].leave();
		}
	};
})

client.on('guildCreate', guild => {
	console.log("Joined " + guild.name)
	guild.createRole({
		name:"Tournament Manager",
		color:"#FF7324",
		mentionable: true
	})
	guild.createChannel("tournament-commands","text")
	finalMessage = ""
	finalMessage += "Thank your for adding Challonge Discord Bot to your server! \n"
	finalMessage += "To create a tournament you must have the Tournament Manager role I have created. This will allow you access to the moderator specific commands. \n"
	finalMessage += "I have also created a #tournament-commands channel for this server's members to use my commands in. \n"
	finalMessage += "If you choose to remove this bot please remember to remove the role 'Tournament Manager' and the channel '#tournament-commands'. \n"
	finalMessage += "Type c!help to view all of the commands \n"
	guild.defaultChannel.sendMessage(finalMessage)
});

client.on('guildDelete', guild => {
	console.log("Left " + guild.name)
});

client.on('message', message => {
	if(message.channel.name == "tournament-commands"){
		var input = message.content.split(" ")
		if(input[0].split("!")[0] == "c"){
			message.channel.startTyping();
		}
		if(input[0] == "c!help" && input.length == 1){
			finalMessage = ""
			finalMessage += "__Challonge Discord Bot by Darkspine77#1365__ \n \n"
			finalMessage += "**c!create** \n"
			finalMessage += "```"
			finalMessage += "Function: Creates a challonge tournament \n"
			finalMessage += "Usage: c!create (Name) (Game) (Year-Month-Day-Hour-Minute) (Participant Amount) \n"
			finalMessage += "Example_1: c!create Brawlhalla_Tourney Brawlhalla 2017-03-17-12-30 limit-16 \n"
			finalMessage += "Example_2: c!create Brawlhalla_Tourney Brawlhalla 2017-03-17-12-30 free \n"
			finalMessage += "``` \n"
			finalMessage += "**c!start** \n"
			finalMessage += "``` "
			finalMessage += "Function: Starts a challonge tournament \n"
			finalMessage += "Usage: c!start (Tournament_Name) \n"
			finalMessage += "Example: c!start BrawlhallaTourney \n"
			finalMessage += "``` \n"
			finalMessage += "**c!delete** \n"
			finalMessage += "``` "
			finalMessage += "Function: Deletes a challonge tournament \n"
			finalMessage += "Usage: c!delete (Tournament_Name) \n"
			finalMessage += "Example: c!delete BrawlhallaTourney \n"
			finalMessage += "``` \n"
			finalMessage += "**c!join** \n"
			finalMessage += "``` "
			finalMessage += "Function: Join a challonge tournament \n"
			finalMessage += "Usage: c!join (Tournament_Name) \n"
			finalMessage += "Example: c!join BrawlhallaTourney \n"
			finalMessage += "``` \n"
			finalMessage += "**c!leave** \n"
			finalMessage += "``` "
			finalMessage += "Function: Leave a challonge tournament \n"
			finalMessage += "Usage: c!leave (Tournament_Name) \n"
			finalMessage += "Example: c!leave BrawlhallaTourney \n"
			finalMessage += "``` \n"
			finalMessage += "**c!edit** \n"
			finalMessage += "``` "
			finalMessage += "Function: Edit tournament info \n"
			finalMessage += "Usage: c!edit (Tournament_Name) (Attribute) (New Value)\n"
			finalMessage += "Example: c!edit BrawlhallaTourney name PokemonTournament! \n"
			finalMessage += "Attributes: name / game / date / limit \n"
			finalMessage += "``` \n"
			finalMessage += "**c!info** \n"
			finalMessage += "``` "
			finalMessage += "Function: See tournament info \n"
			finalMessage += "Usage: c!info (Tournament_Name) \n"
			finalMessage += "Example: c!info BrawlhallaTourney \n"
			finalMessage += "``` \n"
			finalMessage += "**c!report** \n"
			finalMessage += "``` "
			finalMessage += "Function: Report match results \n"
			finalMessage += "Usage: c!report (Tournament_Name) (Match Number) (Match Result) (Final Match?) \n"
			finalMessage += "Example_1: c!report BrawlhallaTourney 1 0-1 false\n"
			finalMessage += "Example_2: c!report BrawlhallaTourney 1 0-2 true *This finalizes a mathces score* can only be used by Owner of the tournament*\n"
			finalMessage += "``` \n"
			finalMessage += "**c!match** \n"
			finalMessage += "``` "
			finalMessage += "Function: See match status \n"
			finalMessage += "Usage_1: c!match (Tournament_Name) *Will show match of command invoker* \n"
			finalMessage += "Usage_2: c!match (Tournament_Name) (Match Number) \n"
			finalMessage += "Example_1: c!match BrawlhallaTourney \n"
			finalMessage += "Example_2: c!match BrawlhallaTourney 1 \n"
			finalMessage += "``` \n"
			message.channel.sendMessage(finalMessage)
		}

		if(input[0] == "c!create" && input.length == 5 && checkRole(message,"Tournament Manager")){
			challonge.createTournament(input[1],input[2],input[3],input[4],function(tournament){
				message.channel.sendMessage(input[1] + " was created!")
				message.guild.createRole({
					name:"Participant - " + tournament.name,
					color:"#FF7324",
					mentionable: true
				})
				message.guild.createRole({
					name:"Owner - " + tournament.name,
					color:"#FF7324",
					mentionable: true
				}).then(role => message.member.addRole(role))
			})
		}

		if(input[0] == "c!start" && input.length == 2 && checkRole(message,"Owner - " + input[1].replace(/_/g," "))){
			challonge.getTournament(input[1],function(tournament){
				challonge.startTournament(tournament,function(){
					message.channel.sendMessage(input[1] + " was started!")
					var guildroles = message.guild.roles.array()
					for (var i = guildroles.length - 1; i >= 0; i--) {
						if(guildroles[i].name == "Participant - " + tournament.name ){
							message.channel.sendMessage(guildroles[i].toString())
						}
					}
					challonge.listParticipants(tournament,function(participants){
						for (var i = participants.length - 1; i >= 0; i--) {
							sendPlayerMatch(tournament,input[1],participants[i],true)
						}
					})
				})
			})
		}

		if(input[0] == "c!delete" && input.length == 2 && checkRole(message,"Owner - " + input[1].replace(/_/g," "))){
			challonge.deleteTournament(input[1],function(tournament){
				message.channel.sendMessage(input[1] + " was deleted!")
				var guildroles = message.guild.roles.array()
					for (var i = guildroles.length - 1; i >= 0; i--) {
						if(guildroles[i].name == "Owner - " + tournament.name || guildroles[i].name == "Participant - " + tournament.name ){
							guildroles[i].delete();
						}
					}
				})
		}

		if(input[0] == "c!edit" && input.length == 4 && checkRole(message,"Owner - " + input[1])){
			challonge.updateTournament(input[1],input[2],input[3],function(){
				message.channel.sendMessage(input[1] + " was edited!")
				if(input[2] == "name"){
					var guildroles = message.guild.roles.array()
						for (var i = guildroles.length - 1; i >= 0; i--) {
							if(guildroles[i].name == "Owner - " + input[1]){
								guildroles[i].setName("Owner - " + input[3]);
							}
							if(guildroles[i].name == "Participant - " + input[1]){
								guildroles[i].setName("Participant - " + input[3]);
							}
						}
				}
			})
		}

		if(input[0] == "c!join" && input.length == 2){
			challonge.getTournament(input[1],function(tournament){
				challonge.listParticipants(tournament,function(participants){
					var participantList = []
					for (var i = participants.length - 1; i >= 0; i--) {
						participantList.push(participants[i].participant.name)
					}
					if(participantList.indexOf(message.author.username + "-" + message.author.id) != -1){
						message.channel.sendMessage(message.author.username + " has already entered in this tournament!")
					} else {
						challonge.addPlayer(tournament,message.author.username,message.author.id,function(){
							message.channel.sendMessage(message.author.username + " is now entered in " + tournament.name + "!")
							var guildroles = message.guild.roles.array()
							for (var i = guildroles.length - 1; i >= 0; i--) {
								if(guildroles[i].name == "Participant - " + tournament.name){
									message.member.addRole(guildroles[i])
								}
							}
						})
					}
				})
			})
		}

		if(input[0] == "c!leave" && input.length == 2){
			challonge.getTournament(input[1],function(tournament){
				challonge.listParticipants(tournament,function(participants){
					var participantList = []
					for (var i = participants.length - 1; i >= 0; i--) {
						participantList.push(participants[i].participant.name)
					}
					if(participantList.indexOf(message.author.username + "-" + message.author.id) == -1){
						message.channel.sendMessage(message.author.username + " is not entered in this tournament!")
					} else {
						challonge.removePlayer(tournament,message.author.username,function(){
							message.channel.sendMessage(message.author.username + " is no longer entered in " + tournament.name + "!")
							var guildroles = message.member.roles.array()
							for (var i = guildroles.length - 1; i >= 0; i--) {
								if(guildroles[i].name == "Participant - " + tournament.name){
									message.member.removeRole(guildroles[i])
								}
							}
						})
					}
				})
			})
		}
		if(input[0] == "c!info" && input.length == 2){
				challonge.getTournament(input[1],function(tournament){
					finalMessage = ""
					finalMessage += "**" + tournament.name + "** \n"
					finalMessage += "```"
					var dateCreated = new Date(tournament.created_at) 
					finalMessage += "Created: " + dateCreated.toLocaleString() + " \n" 
					finalMessage += "Max Participants: " + tournament.signup_cap + " \n"
					finalMessage += "Participants: " + tournament.participants_count + " \n"
					finalMessage += "Game: " + tournament.game_name + " \n"
					var dateStarted = new Date(tournament.start_at) 
					finalMessage += "Start Time: " + dateStarted.toLocaleString() + " EDT \n"
					finalMessage += "Status: " + tournament.state + " \n"
					finalMessage += "Completion: " + tournament.progress_meter + "% \n"
					finalMessage += "```"
					message.channel.sendMessage(finalMessage)
				})	
		}
		if(input[0] == "c!report" && input.length == 5){
			challonge.getTournament(input[1],function(tournament){
				challonge.getMatch(tournament,input[2],function(match){
						challonge.getPlayerbyID(tournament,match.player1_id,function(player1){
								challonge.getPlayerbyID(tournament,match.player2_id,function(player2){
							if(checkRole(message,"Owner - " + tournament.name)){
									challonge.updateMatch(tournament,input[2],input[3],input[4],function(){
									message.channel.sendMessage(message.author.username + " has updated the score of match " + match.suggested_play_order + "!")
										challonge.getMatch(tournament,input[2],function(match){
											challonge.getPlayerbyID(tournament,match.winner_id,function(winner){
											message.channel.sendMessage(winner.participant.name.split("-")[0] + " has won match " + match.suggested_play_order + "!")
												challonge.getTournament(input[1],function(tournament){
												if(tournament.progress_meter == 100){				
													var members = message.guild.members.array()
													for (var i = members.length - 1; i >= 0; i--) {
														if(members[i].user.id == winner.participant.name.split("-")[1]){
															var member = members[i]
															message.guild.createRole({
																name:"Winner - " + tournament.name,
																color:"#FF7324",
																mentionable: true
															}).then(role => member.addRole(role))	
															challonge.deleteTournament(input[1],function(){
																message.channel.sendMessage("<@" + winner.participant.name.split("-")[1] + ">" + " has won " + tournament.name + "!")
																var guildroles = message.guild.roles.array()
																for (var i = guildroles.length - 1; i >= 0; i--) {
																	if(guildroles[i].name == "Owner - " + tournament.name || guildroles[i].name == "Participant - " + tournament.name ){
																		guildroles[i].delete();
																	}
																}
															})															
														}
													}
												} else {
													sendPlayerMatch(tournament,input[1],player1,true)
													sendPlayerMatch(tournament,input[1],player2,true)
												}
											})
										})
									})
								})
							} else {
									message.channel.sendMessage("Currently, only the owner of a tournament can report scores")
							}
						})
					})
				})
			})
		}
		if(input[0] == "c!matches"){
			if (input.length == 2) {
				challonge.getTournament(input[1],function(tournament){
					challonge.getMatchByPlayer(input[1],message.author.username,function(match){
						challonge.getPlayerbyID(tournament,match.player1_id,function(player1){
							challonge.getPlayerbyID(tournament,match.player2_id,function(player2){
								console.log(match)
								var finalMessage = "Match " + match.suggested_play_order + " is " 
								if(player1 != null){
									finalMessage += player1.participant.name.split("-")[0] + " vs " 
								} else {
									finalMessage += "Pending Participant" + " vs "
								} 
								if(player2 != null){
									finalMessage += player2.participant.name.split("-")[0] + "!"
								} else {
									finalMessage += "Pending Participant"
								}
								if(match.scores_csv != ""){									
									finalMessage += "\n"
									finalMessage += "The score is currently " + match.scores_csv + "."
								} else {
									finalMessage += "\n"
									finalMessage += "No scores have been reported."
								}
								message.channel.sendMessage(finalMessage)
							})
						})
					})
				})
			}
		}
		if(input[0] == "c!match"){
			if (input.length == 2) {
				challonge.getTournament(input[1],function(tournament){
					challonge.getMatchByPlayer(input[1],message.author.username,function(match){
						challonge.getPlayerbyID(tournament,match.player1_id,function(player1){
							challonge.getPlayerbyID(tournament,match.player2_id,function(player2){
								var finalMessage = "Match " + match.suggested_play_order + " is " 
								if(player1 != null){
									finalMessage += player1.participant.name.split("-")[0] + " vs " 
								} else {
									finalMessage += "Pending Participant" + " vs "
								} 
								if(player2 != null){
									finalMessage += player2.participant.name.split("-")[0] + "!"
								} else {
									finalMessage += "Pending Participant"
								}
								if(match.scores_csv != ""){									
									finalMessage += "\n"
									finalMessage += "The score is currently " + match.scores_csv + "."
								} else {
									finalMessage += "\n"
									finalMessage += "No scores have been reported."
								}
								if(match.state != "complete"){
									message.channel.sendMessage(finalMessage)
								}
							})
						})
					})
				})
			}
			if (input.length == 3) {
				challonge.getTournament(input[1],function(tournament){
					challonge.getMatch(tournament,input[2],function(match){
						challonge.getPlayerbyID(tournament,match.player1_id,function(player1){
							challonge.getPlayerbyID(tournament,match.player2_id,function(player2){
								var finalMessage = "Match " + match.suggested_play_order + " is "
								if(player1 != null){
									finalMessage += "<@" + player1.participant.name.split("-")[1] + ">" + " vs " 
								} else {
									finalMessage += "Pending Participant" + " vs "
								} 
								if(player2 != null){
									finalMessage += "<@" + player2.participant.name.split("-")[1] + ">" + "!"
								} else {
									finalMessage += "Pending Participant"
								}
								if(match.scores_csv != ""){									
									finalMessage += "\n"
									finalMessage += "The score is currently " + match.scores_csv + "."
								} else {
									finalMessage += "\n"
									finalMessage += "No scores have been reported."
								}
								message.channel.sendMessage(finalMessage)
							})
						})
					})
				})
			}
		}
		message.channel.stopTyping();
	}
});

process.on("unhandledRejection", err => {
	console.error("Uncaught Promise Error: \n" + err.stack);
});	
