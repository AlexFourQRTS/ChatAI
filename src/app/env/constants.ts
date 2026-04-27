import { environment } from '../../environments/environment';

/** No trailing slash — paths are appended in ApiClient. */
export const API_URL = environment.apiUrl.replace(/\/$/, '');

export const API_KEY = environment.apiKey ?? '';
