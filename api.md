## LucidHaus API (api)
Repo: *https://github.com/inclusiveguide/api*

## Overview
This LucidHaus API is a Javascript (node.js) application written using Express JS.
The API communicates with an instance of MongoDB's Atlas Database using
**Mongoose** as the interface to interact with the database. All Media uploads (photo, video, large files)
are handled via Amazon's AWS SDK and stored in a s3 endpoint.


## Key Dependencies
There are several important npm packages that compose this app. This is a non-exhaustive list of all the packages
used, however, those listed below are critical to the app.

**Express**: https://expressjs.com/
<br />
**Twilio Sendgrid** - https://www.npmjs.com/package/@sendgrid/mail
<br />
**AWS SDK** - https://www.npmjs.com/package/aws-sdk
<br />
**Mongoose** - https://www.npmjs.com/package/mongoose

## Structure (api)
**features** - This coorelates directly to the features directory defined in the LucidHaus (app) front end application.
Each child directory contains the **controllers**, **routes**, & **models** for each feature in the application.
<br />
___
**node_modules** - This directory contains all installed npm packages as defined in package.json.
<br />
___
**utils** - This directory includes .js files with functions used universally throughout the application.
<br />
___
**app.js** - This is the entry point into the application. The API routes are connected to the API and middleware defined.
<br />


## Structure (features)
**place** - This directory contains the controllers, models, and routes specific to the Index model.
<br />
___
**shop** - This directory contains the controllers, models, and routes specific to the Shop model.
<br />
___
**site**- This directory contains the controllers and routes specific to the Site model.
<br />
___
**user**- This directory contains the controllers, models, and routes specific to the User model.
