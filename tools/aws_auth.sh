#!/bin/bash

# Tool to automate the AWS MFA auth process for AWS-CLI

command -v jq >/dev/null 2>&1 || { echo >&2 "The program 'jq' is required, but is not installed. Try running: sudo apt install jq"; exit 1; }

if [ "$AWS_MFA_ARN``" == "" ]; then
  echo "Missing environment variable [AWS_MFA_ARN]";
  read -a AWS_MFA_ARN -e -p "Enter AWS MFA Device ARN: ";
fi

read -a TOKEN_CODE -e -p "Enter MFA token code (e.g. Google Authenticator): "
OUTFILE=~/.aws/get-session-token-response.json

# Clear out environment variables that may have been previously set
# AWS command fails if these are present, but inactive
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_SESSION_TOKEN

aws sts get-session-token --serial-number $AWS_MFA_ARN --token-code $TOKEN_CODE > $OUTFILE

# If the command failed...
if [ $? -ne 0 ]; then
  rm $OUTFILE
  echo
  echo "Failed to authenticate. See error above. Check your MFA token code and/or try again."
  exit 1
fi

# If we don't have an output file
if [ ! -e $OUTFILE ]; then
  echo "Something went wrong: output file ($OUTFILE) does not exist.";
  exit 1;
fi

echo

# Use jq to parse the response JSON
echo "Token code is valid. Parsing response...";
AWS_ACCESS_KEY_ID=`cat $OUTFILE | jq -r '.Credentials.AccessKeyId'`
AWS_SECRET_ACCESS_KEY=`cat $OUTFILE | jq -r '.Credentials.SecretAccessKey'`
AWS_SESSION_TOKEN=`cat $OUTFILE | jq -r '.Credentials.SessionToken'`

echo "Creating ~/.bashrc.backup..."
mv ~/.bashrc ~/.bashrc.backup
echo "Stripping and re-adding AWS Environment Variables to ~/.bashrc"
grep -v "export AWS_" ~/.bashrc.backup > ~/.bashrc

echo
echo "NOTE: This will be available in you next shell session."
echo "To make available immediately, copy and paste the exports below:"
echo

COMMAND="export AWS_MFA_ARN=$AWS_MFA_ARN"
echo $COMMAND >> ~/.bashrc

COMMAND="export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" >> ~/.bashrc
echo $COMMAND && echo $COMMAND >> ~/.bashrc

COMMAND="export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" >> ~/.bashrc
echo $COMMAND && echo $COMMAND >> ~/.bashrc

COMMAND="export AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN" >> ~/.bashrc
echo $COMMAND && echo $COMMAND >> ~/.bashrc

echo
echo "Alternatively, you may run: "
echo "   source ~/.bashrc"
echo "OR"
echo "   . ~/.bashrc"
echo ""

echo "Cleanup: Deleting $OUTFILE"
rm $OUTFILE

exit 0;
