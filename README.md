![N|Solid](https://github.com/Darkspine77/Challonge-Bot/blob/master/challongebot.png)

# Challonge-Bot by Darkspine77 (v 0.1)
A discord bot that allows you to manage challonge tournaments

Powered by [Challonge Official API](https://api.challonge.com/v1) and [Discord.JS](https://discord.js.org/#/)

#Install:

[Click Here To Add To Your Discord Server](https://discordapp.com/oauth2/authorize?&client_id=290328152637702144&scope=bot&permissions=12659727)

#Setup

Upon joining your server Challonge Discord Bot will do two things:
- Create a role called "Tournament Manager"
- Create a channel called "#tournament-commands"

Challonge Discord Bot will only respond to commands put in #tournament-commands
c!create can only be used by users who have the Tournament Manager Role

Once a tournament is created, the creator of the tournament will have access to a few other commands for moderation purposes

#Commands:
 
c!create 

Function: Creates a challonge tournament 
- Usage: c!create (Name) (Game) (Year-Month-Day-Hour-Minute) (Participant Amount) 
- Example_1: c!create BrawlhallaTourney Brawlhalla 2017-03-17-12-30 limit-16 
- Example_2: c!create BrawlhallaTourney Brawlhalla 2017-03-17-12-30 free 
 
c!start 
- Function: Starts a challonge tournament 
- Usage: c!start (Tournament_Name) 
- Example: c!start BrawlhallaTourney 
 
c!delete 
- Function: Deletes a challonge tournament 
- Usage: c!delete (Tournament_Name) 
- Example: c!delete BrawlhallaTourney 
 
c!join 
- Function: Join a challonge tournament 
- Usage: c!join (Tournament_Name) 
- Example: c!join BrawlhallaTourney 
 
c!leave 
- Function: Leave a challonge tournament 
- Usage: c!leave (Tournament_Name) 
- Example: c!leave BrawlhallaTourney 
 
c!edit 
- Function: Edit tournament info 
- Usage: c!edit (Tournament_Name) (Attribute) (New Value)
- Example: c!edit BrawlhallaTourney name PokemonTournament! 
- Attributes: name / game / date / limit 
 
c!info 
- Function: See tournament info 
- Usage: c!info (Tournament_Name) 
- Example: c!info BrawlhallaTourney 
 
c!report 
- Function: Report match results 
- Usage: c!report (Tournament_Name) (Match Number) (Match Result) (Final Match?) 
- Example_1: c!report BrawlhallaTourney 1 0-1 false
- Example_2: c!report BrawlhallaTourney 1 0-2 true
 
c!match 
- Function: See match status 
- Usage_1: c!match (Tournament_Name) *Will show match of command invoker* 
- Usage_2: c!match (Tournament_Name) (Match Number) 
- Example_1: c!match BrawlhallaTourney 
- Example_2: c!match BrawlhallaTourney 1 


