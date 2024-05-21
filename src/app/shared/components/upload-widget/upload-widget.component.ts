import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CloudinaryUploadResult } from '../../models/cloudinary-upload-result.model';

const cloudName = environment.cloudinary.cloudName,
    uploadPreset = environment.cloudinary.uploadPreset;

@Component({
    selector: 'app-upload-widget',
    templateUrl: './upload-widget.component.html',
    styleUrls: ['./upload-widget.component.scss'],
})
export class UploadWidgetComponent {
    @Input() buttonText: string = 'Upload';
    @Output() newPictureUploaded = new EventEmitter<string>();

    //@ts-ignore
    widget = cloudinary.createUploadWidget(
        {
            cloudName,
            uploadPreset,
        },
        (error: Error, uploadResult: CloudinaryUploadResult) => {
            if (error || !uploadResult || uploadResult.event !== 'success') {
                return;
            }

            const pictureUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${uploadResult.info.path}`;

            this.newPictureUploaded.emit(pictureUrl);
        },
    );

    showWidget(): void {
        this.widget.open();
    }
}
