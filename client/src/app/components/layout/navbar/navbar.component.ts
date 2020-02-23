import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../../interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild('loginModal', { static: true }) public loginModal;
  @ViewChild('registerModal', { static: true }) public registerModal;
  @ViewChild('event', { static: true }) public eventModal;

  eventForm: FormGroup;

  login: string = '';
  password: string = '';
  passwordRepeat: string = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      name: new FormControl(''),
      bio: new FormControl(''),
      date: new FormControl(''),
      region: new FormControl(''),
    });
  }

  links = [
    { label: 'Головна', path: '/main', active: true },
    { label: 'Хардкод ивент', path: '/event', active: false }
  ]

  onLinkClicked(link) {
    this.links.forEach(l => l.active = false);
    link.active = true;
  }

  onEventCreatingClicked() {
    this.eventModal.show();
    this.loginModal.hide();
    this.registerModal.hide();
  }

  onEventSubmit() {
    console.log(this.eventForm.value);
    this.eventModal.hide();
  }

  onRegisterClicked() {
    this.registerModal.show();
    this.loginModal.hide();
    this.eventModal.hide();
    this.clearInputs();
  }

  onLoginClicked() {
    this.loginModal.show();
    this.registerModal.hide();
    this.eventModal.hide();
    this.clearInputs();
  }

  onRegisterConfirm() {
    if (this.password !== this.passwordRepeat) {
      alert('passwords dot match');
      return;
    }
    this.authService.register(this.login, this.password).subscribe(user => {
      this.registerModal.hide();
      alert('Ви успішно зареєструвалися');
      console.log(user);
      this.clearInputs();
    }, (err) => console.log(err));
  }

  onLoginConfirm() {
    this.authService.login({ login: this.login, password: this.password }).subscribe(user => {
      console.log(user);
      this.clearInputs();
      this.loginModal.hide();
      alert('Ви успішно увійшли');
    }, err => {
      console.log(err);
      if (err.status === 400) {
        alert('Невірний пароль або користувач з таким логіном не інсує');
      }
    });
  }

  clearInputs() {
    this.login = '';
    this.password = '';
    this.passwordRepeat = '';
  }

}
