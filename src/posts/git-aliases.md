---
title: "Git aliases - a step by step recipe (using Textmate)"
date: 2011-01-31
draft: false
tags: [git, textmate, tools, tutorial]
---

Want to set up aliases that make Git easier to use? Have Textmate? Awesome.

<strong>Step 1</strong> - launch Terminal (Applications/Utilities/Terminal). When the prompt loads, enter this command:

<code>cd $home</code>

It just returns you to the home folder in the event you aren't already.

<strong>Step 2</strong> - enter this command:

<code>mate .bash_profile</code>

This opens your <em>.bash_profile</em> document in Textmate.

<strong>Step 3</strong> - Once that document open, paste in the following chunk:

<pre>alias gs='git status '
alias ga='git add '
alias gb='git branch '
alias gc='git commit'
alias gca='git commit -a'
alias gd='git diff'
alias go='git checkout '
alias gk='gitk --all&'
alias gx='gitx --all'
alias gp='git pull'
alias push='git push'
alias gr='git rebase '
alias gm='git merge '

alias got='git '
alias get='git '</pre>

<strong>Step 4</strong> - Save and close the document. Back in the terminal, start a new tab, and the aliases should work. Now, instead of having to enter

<code>git commit -a </code>

You can simply enter

<code>gca</code>

Faster, no? Please note, this was based on information I found over <a href="https://gitimmersion.com/lab_11.html">at Git Immersion</a>, but I've distilled it for Mac OS X users, and added a few more aliases of my own.
