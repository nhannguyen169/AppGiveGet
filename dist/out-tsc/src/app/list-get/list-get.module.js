import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListGetPage } from './list-get.page';
var routes = [
    {
        path: '',
        component: ListGetPage
    }
];
var ListGetPageModule = /** @class */ (function () {
    function ListGetPageModule() {
    }
    ListGetPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListGetPage]
        })
    ], ListGetPageModule);
    return ListGetPageModule;
}());
export { ListGetPageModule };
//# sourceMappingURL=list-get.module.js.map