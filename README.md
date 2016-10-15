# gitlab-greaseboard
Greasemonkey/Tampermonkey Enhancements for Gitlab's Issue Boards

Make Gitlab's issue boards perform a bit more like trello
+ double click a board to create a new issue, pre-populating the Label with board name (if it exists)
+ slight styling improvements
+ uses localStorage to poll for auto-refreshes once new issues are added

Instructions:
1. Load script into Greasemonkey or Tampermonkey
2. Edit YOUR_GITLAB_URL to reflect your group's gitlab installation
3. Activate script
4. Visit YOUR_GITLAB_URL/*/boards
