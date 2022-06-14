---
title: 'How to get rid of the "You have mail" message in your terminal'
date: 2017-09-05
draft: false
tags: [terminal, Tools]
---

Have you ever opened up your terminal in OS X and seen this message in your prompt?

    Last login: Tue Sep  5 13:52:44 on ttys008
    You have mail.

## What mail? Where?

Your computer has a simple mail system that it has set up that can, on occasion, try to send you messages. This can happen when you try to set up a development site with a tool such as MAMP, or you try setting up a chron job, among other things.

The point is that somewhere along the way something in your system wanted to notify you about … something. Now, this isn't an email, per se. So, don't think this was sent to an email address or something.

## Solution one: delete all messages via command line mail

You can get rid of this message by deleting all of your mail. You can do that by entering the `mail` command line app. Enter:

    mail

And you should see a series of messages, something like:

    Mail version 8.1 6/6/93.  Type ? for help.
    "/var/mail/chip": 1 message 1 new
    >N  1 chip@\****.loc  Tue Sep  5 16:00  21/707   "Cron <chip@\***"

Enter the delete all command:

    d *

Then, and this is the part you don't often see, _to make your changes stick_, enter the quit command:

    q

That should clear up that message.

## Solution two: empty your mail log file

You can also either wipe out or delete the mail log file, which is found in the `/var/mail` folder.

    sudo rm /var/mail/[user]

## Other useful commands

To open a particular message, simply enter the corresponding number:

    1

To re-list all of the messages again:

    h
