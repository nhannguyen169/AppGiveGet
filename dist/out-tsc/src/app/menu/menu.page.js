import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var MenuPage = /** @class */ (function () {
    function MenuPage(router) {
        var _this = this;
        this.router = router;
        this.pages = [
            {
                title: 'Trang chủ',
                url: '/home/home'
            },
            {
                title: 'Thông tin cá nhân',
                url: '/profile/profile'
            },
            {
                title: 'Danh sách Give',
                url: '/list-give/list-give'
            },
            {
                title: 'Danh sách Get',
                url: '/list-get/list-get'
            },
            {
                title: 'About',
                url: '/about/about'
            },
        ];
        this.seletedPath = '';
        this.router.events.subscribe(function (event) {
            _this.seletedPath = event.url;
        });
    }
    MenuPage.prototype.ngOnInit = function () {
    };
    MenuPage = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.page.html',
            styleUrls: ['./menu.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.page.js.map