import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { Owner } from '../../../users/models/owner.model';
import { OwnersService } from '../../../users/services/owners.service';
import { Salon } from '../../models/salon.model';
import { SalonsService } from '../../services/salons.service';

@Component({
    selector: 'app-my-salons-page',
    templateUrl: './my-salons-page.component.html',
    styleUrl: './my-salons-page.component.scss',
})
export class MySalonsPageComponent {
    salons!: Salon[];

    constructor(
        private salonsService: SalonsService,
        private ownersService: OwnersService,
        private currentUser: CurrentUserService,
    ) {}

    ngOnInit(): void {
        this.fetchSalons();
    }

    fetchSalons(): void {
        this.ownersService
            .getById(this.currentUser.currentUser!.id)
            .pipe(
                switchMap((owner: Owner) => {
                    return this.salonsService.getMany(owner.salons);
                }),
            )
            .subscribe((salons: Salon[]) => {
                this.salons = salons;
            });
    }
}
