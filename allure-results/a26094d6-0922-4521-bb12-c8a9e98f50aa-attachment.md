# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\spotify.oauth2.spec.ts >> get albums data test
- Location: tests\api\spotify.oauth2.spec.ts:29:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Test source

```ts
  1  | 
  2  | 
  3  | import { test, expect } from '@playwright/test';
  4  | 
  5  | let OAUTH_CONFIG = {
  6  |     tokenURL: 'https://accounts.spotify.com/api/token',
  7  |     clientId: process.env.OAUTH_CLIENT_ID!,
  8  |     clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  9  |     grantType: process.env.GRANT_TYPE!
  10 | }
  11 | 
  12 | let accessToken: string;
  13 | 
  14 | test.beforeEach('POST -- generate the access token', async ({ request }) => {
  15 |     let response = await request.post(OAUTH_CONFIG.tokenURL, {
  16 |         form: {
  17 |             grant_type: OAUTH_CONFIG.grantType,
  18 |             client_id: OAUTH_CONFIG.clientId,
  19 |             client_secret: OAUTH_CONFIG.clientSecret
  20 |         }
  21 |     });
> 22 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  23 |     let jsonResponse = await response.json();
  24 |     console.log('token api response: ', jsonResponse);
  25 |     accessToken = jsonResponse.access_token;
  26 |     console.log('access token: ', accessToken);
  27 | });
  28 | 
  29 | test('get albums data test', async ({ request }) => {
  30 |     //https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy
  31 |     let baseURL = 'https://api.spotify.com';
  32 |     let endPointURL = '/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';
  33 | 
  34 |     let albumResponse = await request.get(`${baseURL}${endPointURL}`, {
  35 |         headers: {
  36 |             Authorization: `Bearer ${accessToken}`
  37 |         }
  38 |     });
  39 | 
  40 |     expect(albumResponse.status()).toBe(200);
  41 |     console.log(await albumResponse.json());
  42 | 
  43 |     let jsonBody = await albumResponse.json();
  44 |     console.log(jsonBody.total_tracks);
  45 |     console.log(jsonBody.external_urls.spotify);
  46 |     console.log(jsonBody.images.length);
  47 |     expect(jsonBody.images.length).toBe(3);
  48 | })
  49 | 
  50 | 
```