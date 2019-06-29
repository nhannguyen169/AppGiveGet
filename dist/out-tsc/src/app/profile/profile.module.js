import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
var routes = [
    {
        path: '',
        component: ProfilePage
    }
];
var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ProfilePage]
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());
export { ProfilePageModule };
//# sourceMappingURL=profile.module.js.map