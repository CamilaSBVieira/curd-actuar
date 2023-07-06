import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core'
import { UserList } from '../user-list';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'form-dialog',
  template: `
    <h1>Register User</h1>
    <form class="dialog-form" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <label for="name">Nome</label>
      <input type="text" id="name" formControlName="name" >
      <div *ngIf="registerForm.get('name')?.hasError('required')">Name is required.</div>

      <label for="email">Email</label>
      <input type="email" id="email" formControlName="email">
      <div *ngIf="registerForm.get('email')?.hasError('required')">Email is required.</div>
      <div *ngIf="registerForm.get('email')?.hasError('email')">Invalid email.</div>

      <div class="dialog-form_inputGroup">
        <div class="fullWidth">
          <label for="birthdate">Data de Nascimento</label>
          <input type="text" id="birthdate" formControlName="birthdate" >
          <div *ngIf="registerForm.get('birthdate')?.hasError('required')">Birth date is required.</div>
        </div>
        <div>
          <label for="gender">Sexo</label>
          <select id="gender" formControlName="gender">
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
      </div>
      <div class="form-buttons">
        <input type="reset" class="form-buttons_clear" (click)="dialogRef.close()" value="Cancel">
        <input type="submit" class="form-buttons_save" value="Salvar">
      </div>
    </form>
  `,
  styleUrls: ['./form-dialog.component.css'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
})
export class FormDialog {
    
  constructor(@Inject(DIALOG_DATA) public data: any, public dialogRef: DialogRef, private formBuilder: FormBuilder, private userService: UsersService) {}

  registerForm: FormGroup = this.formBuilder.group({
    name: [this.data?.userInfo?.Nome || '', Validators.required],
    email: [this.data?.userInfo?.Email || '', [Validators.required, Validators.email]],
    birthdate: [this.data?.userInfo?.DataNascimento || '', Validators.required],
    gender: [this.data?.userInfo?.Sexo || 'F', Validators.required]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const nameValue = this.registerForm.get('name')!.value;
      const emailValue = this.registerForm.get('email')!.value;
      const birthdateValue = this.registerForm.get('birthdate')!.value;
      const genderValue = this.registerForm.get('gender')!.value;

      const user: UserList = {
        Nome: nameValue,
        Email: emailValue,
        DataNascimento: birthdateValue,
        Sexo: genderValue
      }
      if(this.data?.edit) {
        console.log('edit')
      } else {
        this.userService.addUser(user)
      }
      this.dialogRef.close()
    }
  }

}