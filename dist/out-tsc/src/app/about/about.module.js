import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AboutPage } from './about.page';
var routes = [
    {
        path: '',
        component: AboutPage
    }
];
var AboutPageModule = /** @class */ (function () {
    function AboutPageModule() {
    }
    AboutPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AboutPage]
        })
    ], AboutPageModule);
    return AboutPageModule;
}());
export { AboutPageModule };
//# sourceMappingURL=about.module.js.map