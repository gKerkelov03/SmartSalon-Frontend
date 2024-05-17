import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { UploadWidgetComponent } from './components/upload-widget/upload-widget.component';
import { AccessDeniedPageComponent } from './pages/access-denied-page/access-denied-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { OnlyFirstLetterCapitalPipe } from './pipes/only-first-letter-capital.pipe';
import { OnlyHourAndMinutesPipe } from './pipes/only-hour-and-minutes.pipe';

@NgModule({
    declarations: [
        ErrorMessageComponent,
        UploadWidgetComponent,
        AccessDeniedPageComponent,
        NotFoundPageComponent,
        OnlyFirstLetterCapitalPipe,
        OnlyHourAndMinutesPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
    ],
    exports: [
        OnlyFirstLetterCapitalPipe,
        OnlyHourAndMinutesPipe,
        ErrorMessageComponent,
        UploadWidgetComponent,
        AccessDeniedPageComponent,
        NotFoundPageComponent,
    ],
})
export class SharedModule {}
