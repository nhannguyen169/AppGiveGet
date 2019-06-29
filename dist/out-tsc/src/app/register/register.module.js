import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
var routes = [
    {
        path: '',
        component: RegisterPage
    }
];
var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [RegisterPage]
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());
export { RegisterPageModule };
//# sourceMappingURL=register.module.js.map