import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudAction } from '../../../../core/enums/crud-action';
import { Category } from '../../models/category.model';
import { Currency } from '../../models/currency.model';
import { JobTitle } from '../../models/job-title.model';
import { Section } from '../../models/section.model';
import { Service } from '../../models/service.model';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { DeleteSectionDialogComponent } from '../delete-section-dialog/delete-section-dialog.component';
import { DeleteServiceDialogComponent } from '../delete-service-dialog/delete-service-dialog.component';
import { SectionDialogComponent } from '../section-dialog/section-dialog.component';
import { ServiceDialogComponent } from '../service-dialog/service-dialog.component';

@Component({
    selector: 'app-salon-sections',
    templateUrl: './salon-sections.component.html',
    styleUrl: './salon-sections.component.scss',
})
export class SalonSectionsComponent {
    @Input()
    salonId!: string;

    @Input()
    canEdit: boolean = false;

    @Input()
    mainCurrency!: Currency;

    @Input()
    sections!: Section[];

    @Input()
    jobTitles!: JobTitle[];

    CrudAction = CrudAction;

    selectedSectionIndex: number = 0;
    selectedCategoryIndex: number = 0;

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {}

    sectionIndexChanged(newIndex: number) {
        this.selectedSectionIndex = newIndex;
    }

    categoryIndexChanged(newIndex: number) {
        this.selectedCategoryIndex = newIndex;
    }

    createServiceClicked(category: Category) {
        if (!this.jobTitles.length) {
            this.snackBar.open(
                'You have to add some job titles to the salon before creating a service',
                'Close',
            );

            return;
        }

        this.openServiceDialog(CrudAction.Create, category);
    }

    openSectionDialog(action: CrudAction, section?: Section): void {
        const dialogRef = this.dialog.open(SectionDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                action,
                section,
                salonId: this.salonId,
                canDelete: this.sections.length > 1,
            },
            enterAnimationDuration: '300ms',
        });

        const observer = {
            next: (result: { section: Section; action: CrudAction }) => {
                if (result.action === CrudAction.Update) {
                    const section = this.sections.find(
                        (section) => section.id === result.section.id,
                    );

                    section!.name = result.section.name;
                    section!.pictureUrl = result.section.pictureUrl;
                } else if (result.action === CrudAction.Create) {
                    this.sections.push(result.section);
                } else if (result.action === CrudAction.Delete) {
                    const confirmDeletionDialogRef = this.dialog.open(
                        DeleteSectionDialogComponent,
                        {
                            width: '40vw',
                            autoFocus: false,
                            panelClass: 'round-without-padding',
                            data: {
                                section: result.section,
                                salonId: this.salonId,
                            },
                            enterAnimationDuration: '300ms',
                        },
                    );

                    confirmDeletionDialogRef
                        .afterClosed()
                        .subscribe((result) => {
                            if (result) {
                                console.log(this.sections);
                                this.sections.splice(
                                    this.selectedSectionIndex,
                                    1,
                                );

                                console.log(this.sections);
                            }
                        });
                }
            },
        };

        dialogRef.afterClosed().subscribe(observer);
    }

    openCategoryDialog(
        action: CrudAction,
        section: Section,
        category?: Category,
    ): void {
        const dialogRef = this.dialog.open(CategoryDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                action,
                sectionId: section.id,
                salonId: this.salonId,
                category,
            },
            enterAnimationDuration: '300ms',
        });

        const observer = {
            next: (result: { category: Category; action: CrudAction }) => {
                const section = this.sections.find(
                    (section) =>
                        section.id ===
                        this.sections[this.selectedSectionIndex].id,
                )!;

                if (result.action === CrudAction.Update) {
                    const category = section.categories.find(
                        (section) => section.id === result.category.id,
                    );

                    category!.name = result.category.name;
                } else if (result.action === CrudAction.Create) {
                    section.categories.push(result.category);
                } else if (result.action === CrudAction.Delete) {
                    const confirmDeletionDialogRef = this.dialog.open(
                        DeleteCategoryDialogComponent,
                        {
                            width: '40vw',
                            autoFocus: false,
                            panelClass: 'round-without-padding',
                            data: {
                                category: result.category,
                                salonId: this.salonId,
                            },
                            enterAnimationDuration: '300ms',
                        },
                    );

                    confirmDeletionDialogRef
                        .afterClosed()
                        .subscribe((result) => {
                            if (result) {
                                this.sections[
                                    this.selectedSectionIndex
                                ].categories.splice(
                                    this.selectedCategoryIndex,
                                    1,
                                );
                            }
                        });
                }
            },
        };

        dialogRef.afterClosed().subscribe(observer);
    }

    openServiceDialog(
        action: CrudAction,
        category: Category,
        service?: Service,
    ): void {
        const dialogRef = this.dialog.open(ServiceDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                action,
                salonId: this.salonId,
                category,
                service,
                jobTitles: this.jobTitles,
            },
            enterAnimationDuration: '300ms',
        });

        const observer = {
            next: (result: { service: Service; action: CrudAction }) => {
                const category =
                    this.sections[this.selectedSectionIndex].categories[
                        this.selectedCategoryIndex
                    ];

                if (result.action === CrudAction.Update) {
                    const service = category.services.find(
                        (service) => service.id === result.service.id,
                    )!;

                    for (let key in service) {
                        service[key] = result.service[key];
                    }
                } else if (result.action === CrudAction.Create) {
                    category.services.push(result.service);
                    console.log(result.service);
                } else if (result.action === CrudAction.Delete) {
                    const confirmDeletionDialogRef = this.dialog.open(
                        DeleteServiceDialogComponent,
                        {
                            width: '40vw',
                            autoFocus: false,
                            panelClass: 'round-without-padding',
                            data: {
                                service: result.service,
                                salonId: this.salonId,
                            },
                            enterAnimationDuration: '300ms',
                        },
                    );

                    confirmDeletionDialogRef
                        .afterClosed()
                        .subscribe((result) => {
                            if (result) {
                                const services =
                                    this.sections[this.selectedSectionIndex]
                                        .categories[this.selectedCategoryIndex]
                                        .services;

                                const index = services.indexOf(result.service);

                                services.splice(index, 1);
                            }
                        });
                }
            },
        };

        dialogRef.afterClosed().subscribe(observer);
    }

    serviceClicked(service: Service, category: Category) {
        if (this.canEdit) {
            this.openServiceDialog(CrudAction.Update, category, service);
        }
    }
}
