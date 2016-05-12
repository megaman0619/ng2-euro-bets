import {Component, Input, ApplicationRef} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';

import {MATERIAL_DIRECTIVES, Media, SidenavService} from 'ng2-material/all';

import {Auth} from '../../services/firebase/auth.service';
import {Page, PageTitle} from '../../services/page-title/index';
import {UefaEuroLogoCmp} from '../uefa-euro-logo/uefa-euro-logo.component';
import {UserAvatar} from '../user-avatar/user-avatar.component';
import {SidenavItem} from './sidenav-item.model';

@Component({
  selector: 'bets-sidenav-layout',
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES, UserAvatar, UefaEuroLogoCmp],
  providers: [SidenavService],
  template: require('./sidenav-layout.html'),
  styles: [require('./sidenav-layout.scss')],
  host: {
    '[class.push-menu]': 'fullPage'
  }
})
export class SidenavLayoutCmp {

  @Input()
  private fullPage = this.media.hasMedia('gt-md');

  private mainItems:Array<SidenavItem> = [
    {pathStart: 'bets', linkParams: ['Bets'], title: 'Bets'},
    {pathStart: 'table', linkParams: ['Table'], title: 'Table'},
    {pathStart: 'leagues', linkParams:['Leagues'], title: 'Leagues'}
  ];

  private page:Page;

  constructor(private auth:Auth, private router:Router,
              public appRef:ApplicationRef,
              public pageTitle:PageTitle,
              public media:Media, public sidenav:SidenavService) {

  }

  navigate(linkParams:any) {
    return this.router.navigate(linkParams)
      .then(() => {
        this.hideMenuIfNotFullPage();
      });
  }

  hideMenuIfNotFullPage() {
    if (!this.fullPage) {
      this.sidenav.hide('menu');
    }
  }

  logout() {
    this.auth.logout();
  }

  hasMedia(breakSize:string):boolean {
    return this.media.hasMedia(breakSize);
  }

  open(name:string) {
    this.sidenav.show(name);
  }

  close(name:string) {
    this.sidenav.hide(name);
  }

  showMenu(event?) {
    this.sidenav.show('menu');
  }

  ngOnInit() {
    let query = Media.getQuery('gt-md');
    this.media.listen(query).onMatched.subscribe((mql:MediaQueryList) => {
      this.fullPage = mql.matches;
      this.appRef.tick();

      console.log('sidenav @ media listen', this.fullPage);
    });

    this.pageTitle.subscribe((page) => {
      this.page = page;
      this.appRef.tick();

      console.log('sidenav @ change page', page);
    });
  }

}
