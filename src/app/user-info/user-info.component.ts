import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserList } from '../user-list';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FormDialog } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DialogModule, FormDialog],
  template: `
    <tr class="table-item">
      <td class="table-item_overflow">
        <strong>
          {{userInfo.Nome}}
        </strong>
      </td>
      <td>{{userInfo.DataNascimento}}</td>
      <td class="table-item_controllers">
        <button (click)="openDialog()">
          <fa-icon [icon]="editIcon"></fa-icon>
        </button>
      </td>
    </tr>
  `,
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  @Input() userInfo!: UserList

  editIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(public dialog: Dialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(FormDialog, {
      panelClass: 'form-dialog',
      data: {userInfo: this.userInfo, edit: true}
    });
  }

}


