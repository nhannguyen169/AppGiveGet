import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListGivePage } from './list-give.page';
var routes = [
    {
        path: '',
        component: ListGivePage
    }
];
var ListGivePageModule = /** @class */ (function () {
    function ListGivePageModule() {
    }
    ListGivePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListGivePage]
        })
    ], ListGivePageModule);
    return ListGivePageModule;
}());
export { ListGivePageModule };
//# sourceMappingURL=list-give.module.js.map