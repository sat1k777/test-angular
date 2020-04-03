import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import UserData from '../../models/user-data.model';

@Component({
  selector: 'app-modal-personal-information',
  templateUrl: './modal-personal-information.component.html',
  styleUrls: ['./modal-personal-information.component.scss']
})
export class ModalPersonalInformationComponent implements OnInit {
  @Output() userDataFormStatusChanged = new EventEmitter<{
    isValid: boolean;
    userData?: UserData;
  }>();

  userDataForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.userDataFormInit();
    this.userDataForm.statusChanges.subscribe(status => {
      if (status === 'INVALID') {
        this.userDataFormStatusChanged.emit({ isValid: false });
      } else {
        this.userDataFormStatusChanged.emit({
          isValid: true,
          userData: this.userDataForm.value
        });
      }
    });
  }

  userDataFormInit() {
    this.userDataForm = new FormGroup({
      fullname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^\\d+$')
      ]),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern('^\\d+$')
      ])
    });
  }
}
