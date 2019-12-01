#!/bin/bash

SESSION_NAME="blog"

if tmux has-session -t $SESSION_NAME 2> /dev/null; then
	tmux attach -t $SESSION_NAME
	exit
fi

# Open Vim
tmux new-session -d -s $SESSION_NAME -n vim
tmux send-keys -t $SESSION_NAME:vim "vim" C-m

# Open up a tab for git
tmux new-window -n git -t $SESSION_NAME
tmux send-keys -t $SESSION_NAME:git "git hista" C-m

# Start npm server
tmux new-window -n server -t $SESSION_NAME
tmux send-keys -t $SESSION_NAME:server "cd .." C-m
tmux send-keys -t $SESSION_NAME:server "python3 -m http.server --cgi 8000" C-m

tmux select-window -t $SESSION_NAME:2
tmux select-window -t $SESSION_NAME:1

tmux attach -t $SESSION_NAME
