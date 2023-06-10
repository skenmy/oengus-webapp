import { Component, HostBinding, Input } from '@angular/core';
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/services/user.service';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-widget-signin-picker',
  templateUrl: './widget-signin-picker.component.html',
  styleUrls: ['./widget-signin-picker.component.scss'],
})
export class WidgetSigninPickerComponent {
  @Input() type: 'DROPDOWN' | 'NAVBAR' = 'DROPDOWN';
  @Input() isRight = false;

  @HostBinding('class.navbar-item') get navbar() { return this.type === 'NAVBAR'; }

  iconDiscord = faDiscord;
  iconTwitch = faTwitch;
  iconLoginNew = faRightToBracket;

  constructor(public userService: UserService, private translate: TranslateService, private router: Router) { }

  get dropdownItemClass(): string {
    return /^navbar$/i.test(this.type) ? 'navbar-item' : 'dropdown-item';
  }

  async storeCurrentPage(twitter: boolean = false): Promise<boolean> {
    if (twitter) {
      const words = await firstValueFrom(this.translate.get('announcements.twitterRemoval'));
      alert(words);
    }

    localStorage.setItem('prev_loc', this.router.url);
    return true;
  }

}