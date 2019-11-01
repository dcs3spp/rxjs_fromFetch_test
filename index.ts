import {APIService, HttpError } from './service';
import { Observable } from 'rxjs';

const service: APIService<string> = new APIService<string>();
const courses: Observable<string[] | HttpError> = service.all('https://localhost:3000');

courses.subscribe(
  courses => {
    console.log(`retrieved response ${JSON.stringify(courses)}`);
  },
  error => {
    console.error(`Test encountered error ${JSON.stringify(error)}`);
  },
  () => {},
);

 
