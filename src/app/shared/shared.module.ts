import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormsSocialsComponent } from './components/forms-socials/forms-socials.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { UploadWidgetComponent } from './components/upload-widget/upload-widget.component';
import { AccessDeniedPageComponent } from './pages/access-denied-page/access-denied-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { OnlyFirstLetterCapitalPipe } from './pipes/only-first-letter-capital.pipe';
import { OnlyHourAndMinutesPipe } from './pipes/only-hour-and-minutes.pipe';
import { RatingPipe } from './pipes/rating.pipe';

@NgModule({
    declarations: [
        ErrorMessageComponent,
        UploadWidgetComponent,
        RegisterFormComponent,
        AccessDeniedPageComponent,
        NotFoundPageComponent,
        OnlyFirstLetterCapitalPipe,
        RatingPipe,
        FormsSocialsComponent,
        OnlyHourAndMinutesPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
    ],
    exports: [
        OnlyFirstLetterCapitalPipe,
        OnlyHourAndMinutesPipe,
        RatingPipe,
        FormsSocialsComponent,
        RegisterFormComponent,
        ErrorMessageComponent,
        UploadWidgetComponent,
        AccessDeniedPageComponent,
        NotFoundPageComponent,
    ],
})
export class SharedModule {}
