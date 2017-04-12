# Rogerbot

Rogerbot is an ominiscient and omnipotent robot that talks and acts just like Roger!
Just kidding!

Rogerbot is a conversational bot that learns how to recognize the user's speech and categorizes into different intents (what the user wants to do) and entities (certain keywords) and finds the appropriate response.

The recognization of user speech is powered by a machine learning cloud service created by Microsoft called LUIS (Language Understanding Intelligent Service) and it is trained to understand phrases by giving it utterances and assigning them to the correct intent. The response part is done with Javascript by parsing the JSON object returned by the cloud service and finding the corresponding answer.

Credits to the Microsoft LUIS cloud service where you can train it to understand natural language. It can take up to 80 intents and it's free for up to 10,000 hits/month: http://luis.ai

Also check out my Javascript on Github if you want to learn more about it! The user interface is hosted on my undergrad school server http://www.student.cs.uwaterloo.ca/~rgeng/

* The index.html page is only added here as a reference, for the up-to-date version, refer to my uwaterloo website
* RogerBot does not collect any personal information

Update Mar 22 2017: Rogerbot just got a new home on Github! Previously hosted on the uwaterloo server space.
