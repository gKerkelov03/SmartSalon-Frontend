import { Component, Input } from '@angular/core';
import { CurrentUserService } from '../../../core/services/current-user.service';

@Component({
	selector: 'app-side-item',
	templateUrl: './side-item.component.html',
	styleUrls: ['./side-item.component.scss'],
})
export class SideItemComponent {
	@Input() title!: string;
	@Input() isOpen!: boolean;
	@Input() icon!: string;
	@Input() path!: string;

	constructor(public currentUserService: CurrentUserService) {}
}
