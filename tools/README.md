# Tools
Scripts and helpers for development.

## aws_auth.sh
This script simplifies the MFA process for AWS CLI. As long as AWS CLI has been installed for the Linux-compatible environment, simply run aws_auth.sh

`./aws_auth.sh`

Unless it has already been set in your environment (as AWS_MFA_ARN), the script will prompt you for an AWS_MFA_ARN value which is the ARN (Amazon Resource Name) of the MFA device you have registered to your AWS account.

```
Missing environment variable [AWS_MFA_ARN]
Enter AWS MFA Device ARN:
```

Next the script will prompt for an MFA token code.

```
Enter MFA token code (e.g. Google Authenticator): 222333
```

After entering the code, if the code was valid, the script will parse the response from AWS and create export statements for the needed environment variables. It then outputs those export statements and also appends them to your ~/.bashrc file so that your next shell session will have the values available.

*Example Output (values scrubbed):*

```
Token code is valid. Parsing response...
Creating ~/.bashrc.backup...
Stripping and re-adding AWS Environment Variables to ~/.bashrc

NOTE: This will be available in you next shell session.
To make available immediately, copy and paste the exports below:

export AWS_ACCESS_KEY_ID=ASIDIFQYCE90LN44BFHOQ
export AWS_SECRET_ACCESS_KEY=2csZX+X4Ey4WAX/7e2efrpCGYevVcPqg2xb/4B3f
export AWS_SESSION_TOKEN=FRoDYMdzEe3//////////wEaDBdqeYER4bJATR7pyzKwAe7K4N23idQow3cjpzXo2p+HRWEQ+Hz5F22FPLqgUEF+tXuKWy8rgg/Re6O8tZ3lXJVgW5lL6OdH8I2eTSeiHh9UJkdaWK/k4eq2xfZMqY1B6zYtlM2Lkzi27xvEp9C/WZa7dwmZeNJCBZbV99sdaTRFp+iox3EF+gwKTWAOKeaAo4fhu/wrdDhgvKWRnj9Lnc2e98FNX2UY7r46r0eW0nNmXfisov9QI1dxWTYnLKXeKOz9rtYF

Alternatively, you may run:
   source ~/.bashrc
OR
   . ~/.bashrc

Cleanup: Deleting /home/kgwynn/.aws/get-session-token-response.json
```
