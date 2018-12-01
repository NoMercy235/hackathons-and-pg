Exploore
==================================

Problem to solve:
A user wants to travel to a particular location in a particular period of time. We will show all the events that happen in that location that may be of interest to them based on the interests they have.

The user will have to login using some social media sites which will allow us to get past events they attended and people they are friends with.

We did not manage to integrate the above functionality, so we have relied on some data sets that were taken from [kaggle](https://www.kaggle.com/c/event-recommendation-engine-challenge/data).

Using those data sets, we have extracted various informations about events and people and have used them to create a similarity matrix of the events. This way, for each event, we know which other events are similar to it and can recommend them to someone.
