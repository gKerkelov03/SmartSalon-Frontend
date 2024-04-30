import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loggedInGuard } from './core/guards/logged-in.guard';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'public',
        pathMatch: 'full',
    },
    {
        path: 'public',
        loadChildren: () =>
            import('./public/public.module').then(
                (publicModule) => publicModule.PublicModule
            ),
    },
    {
        path: 'main',
        canLoad: [loggedInGuard],
        loadChildren: () =>
            import('./main/main.module').then(
                (mainModule) => mainModule.MainModule
            ),
    },
    {
        path: '**',
        component: NotFoundPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
