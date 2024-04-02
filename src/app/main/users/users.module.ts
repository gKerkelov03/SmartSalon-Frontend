import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    declarations: [ProfilePageComponent],
    imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
