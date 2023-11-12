import {
  BrowserCacheLocation,
  Configuration,
  LogLevel,
} from '@azure/msal-browser';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_signupsignin',
    editProfile: 'B2C_1_edit_profile',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://seaside2023.b2clogin.com/seaside2023.onmicrosoft.com/B2C_1_signupsignin',
    },
    editProfile: {
      authority:
        'https://seaside2023.b2clogin.com/seaside2023.onmicrosoft.com/B2C_1_edit_profile',
    },
  },
  authorityDomain: 'seaside2023.b2clogin.com',
};

export const msalConfig: Configuration = {
  auth: {
    clientId: '493ec5ad-14ee-4bc4-b788-24b63cfafb83', // This is the ONLY mandatory field that you need to supply.
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    redirectUri: 'http://localhost:4200', // Points to window.location.origin by default. You must register this URI on Azure portal/App Registration.
    knownAuthorities: [b2cPolicies.authorityDomain],
    postLogoutRedirectUri: 'http://localhost:4200', // Points to window.location.origin by default.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge. Remove this line to use Angular Universal
  },
  system: {
    /**
     * Below you can configure MSAL.js logs. For more information, visit:
     * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
     */
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
};

export const loginRequest = {
  scopes: [
    'https://seaside2023.onmicrosoft.com/todos-api/todos.read',
    'https://seaside2023.onmicrosoft.com/todos-api/todos.write',
  ],
};

export const protectedResources = {
  todoListApi: {
    endpoint: 'https://localhost:7261/Todo',
    scopes: {
      read: ['https://seaside2023.onmicrosoft.com/todos-api/todos.read'],
      write: ['https://seaside2023.onmicrosoft.com/todos-api/todos.write'],
    },
  },
};
