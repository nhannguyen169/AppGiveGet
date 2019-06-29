import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
var routes = [
    {
        path: '',
        component: MenuPage,
        children: [
            {
                path: 'home', loadChildren: './home/home.module#HomePageModule'
            },
            {
                path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'
            },
            {
                path: 'about', loadChildren: './about/about.module#AboutPageModule'
            },
            {
                path: 'list-give', loadChildren: './list-give/list-give.module#ListGivePageModule'
            },
            {
                path: 'list-get', loadChildren: './list-get/list-get.module#ListGetPageModule'
            },
        ]
    }
];
var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenuPage]
        })
    ], MenuPageModule);
    return MenuPageModule;
}());
export { MenuPageModule };
//# sourceMappingURL=menu.module.js.map