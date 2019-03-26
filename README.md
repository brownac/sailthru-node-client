# Node JS SDK for Sailthru (new and improved!)

### Getting started

This project uses [yarn](https://yarnpkg.com/en/) for dependency management.

```
yarn install && yarn run build
```

will install the dependencies and build the static files using Babel.

### Development

To test, give [npm link](https://docs.npmjs.com/cli/link.html) a try. It's magical!

Initializing the client would look something like this:

```
import SailthruClient from 'sailthru-client';

const client = new SailthruClient(yourApiKey, yourApiSecret);
```

Right now, the SDK only supports GET calls:

```
client.apiGet(endpoint, data)
```

### TODO's for the future

- Support the rest of the API
- More robust typing using TypeScript
- Setup unit testing using Jest
- Find a way to make the SDK more modular