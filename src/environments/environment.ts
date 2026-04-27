// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /** Console traces for theme / segment (filter: `[PicTalk:Theme]`). Off in prod. */
  themeDebugLogs: true,
  /**
   * Same as `Exsample/src/constant.js` → `API_URL` (no trailing slash).
   * Override locally if you use another backend.
   */
  apiUrl: 'https://brahmadzen.space/api/api',
  /** Sent as `x-api-key` when set (empty = header omitted by client if you prefer). */
  apiKey: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
