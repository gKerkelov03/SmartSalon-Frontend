import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSalonsPageComponent } from './search-salons-page.component';

describe('SearchSalonsPageComponent', () => {
    let component: SearchSalonsPageComponent;
    let fixture: ComponentFixture<SearchSalonsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SearchSalonsPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchSalonsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
