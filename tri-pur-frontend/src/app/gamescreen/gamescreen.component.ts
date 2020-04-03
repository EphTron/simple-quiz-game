import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-gamescreen',
    templateUrl: './gamescreen.component.html',
    styleUrls: ['./gamescreen.component.scss']
})
export class GamescreenComponent implements OnInit, OnDestroy {
    question = '';
    answer = '';
    private questionSub: Subscription = null;

    constructor(private questionService: QuestionService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        if (this.questionSub) {
            this.questionSub.unsubscribe();
        }
    }

    onGetQuestion(category: string) {
        this.questionSub = this.questionService.getQuestion(category).subscribe(
            (res) => {
              if (res.success) {
                console.log('sucesssssss', res);
                this.question = res.data.question;
                this.answer = res.data.answer;
              } else {
                console.log('fail');
              }
            },
            error => {
              console.log('error', error);
            }
        );
    }

}
