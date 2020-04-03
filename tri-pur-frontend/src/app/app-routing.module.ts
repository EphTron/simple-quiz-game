import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GamescreenComponent} from './gamescreen/gamescreen.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'game'
    },
    {
        path: 'game',
        component: GamescreenComponent
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
