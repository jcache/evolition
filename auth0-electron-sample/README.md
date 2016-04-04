# Auth0 - Electron

This sample shows you how to add authentication to your Electron app using Auth0.

## Installation

Clone the repo, then:

```bash
npm install
```

## Set Your Credentials

Set `AUTH0_CLIENT_ID` and `AUTH0_DOMAIN` in the `Auth0Lock` instance to your own.

```js
// index.html

...

var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

...
```

You will also need to configure your **Allowed Callback URLs** in your Auth0 dashboard. Set the following values there:

```
https://{your-auth0-domain-name}.auth0.com/mobile, file:///
```

## Run the App

```bash
npm start
```

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.
