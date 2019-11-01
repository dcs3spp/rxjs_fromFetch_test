import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';


export type HttpError = {
  code?: string;
  message: string;
  stack?: string;
};

export class APIService<Model> {
  private fetch: (
    input: string | Request,
    init?: RequestInit,
  ) => Observable<Response>;

  /**
   * Constructor
   * To facilitate testing allow dependency injection of fetchFrom
   * @param fetch
   */
  constructor(
    fetchDependency: (
      input: string | Request,
      init?: RequestInit,
    ) => Observable<Response> = fromFetch,
  ) {
    this.fetch = fetchDependency;
  }

  all(url: string): Observable<Model[] | HttpError> {
    return this.fetch(url).pipe(
      /**
       * fetch does not trigger catchError for http error status codes returned by the server
       * fetch triggers a catchError when errors occur client side
       */
      tap(response => {
        console.log(`Fetch response is ${response}`);
      }),
      switchMap(response => {
        if (response.ok) {
          return response.json() as Promise<Model[]>;
        } else {
          return of({
            message: `Error ${response.statusText}`,
            code: `Error ${response.status}`,
          });
        }
      }),
      tap(data =>
        console.log(`APIService data => ${JSON.stringify(data, null, 2)}`),
      ),
      catchError(err => {
        // Errors such as network connection errors, timeout etc caught here
        console.error(err);
        return of({ message: err.message });
      }),
    );
  }
}


 
