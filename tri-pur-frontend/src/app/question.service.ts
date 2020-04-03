import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    constructor(private client: HttpClient) {

    }

    getQuestion(category: string): Observable<any> {
        const url = 'http://localhost:42001/get_question/' + category;
        return this.client.get(url).pipe(
            map((res: any) => {
                console.log('response from server', res);
                return res;
            }),
            catchError(err => throwError(err))
        );
    }
}
