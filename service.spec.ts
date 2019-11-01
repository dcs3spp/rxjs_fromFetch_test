import { APIService } from './service';

import { Observable } from 'rxjs';

describe('course services', () => {
  test('generic course service', () => {
    console.log('generic course service spec');
    const api: APIService<string> = new APIService<string>();
    api.all('https://localhost:3000').subscribe(
      data => {
        console.log(`Test all data => ${JSON.stringify(data, null, 2)}`);
      },
      err => {
        console.error(`Test all err => ${JSON.stringify(err, null, 2)}`);
      },
    );
  });
});
