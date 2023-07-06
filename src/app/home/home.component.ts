import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UsersService } from '../users.service'
import { UserList } from '../user-list';
import { Dialog } from '@angular/cdk/dialog';
import { FormDialog } from '../form-dialog/form-dialog.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserInfoComponent, FontAwesomeModule, ReactiveFormsModule],
  template: `
    <section>
      <form (submit)="filterUserList(filter.value)">
      <div class="home-searchbar">
        <input type="text" placeholder="Search" [formControl]="query" value="query.value" #filter>
        <button class="home-searchbar_clearButton" >
          <fa-icon [icon]="clearIcon" size="lg" (click)="clearSearch()"></fa-icon>
        </button>
        <button class="home-searchbar_searchButton" type="submit" (click)="filterUserList(filter.value)">
          <fa-icon [icon]="searchIcon" size="lg"></fa-icon>
        </button>
      </div>
      </form>
      <div class="home-table_controllers">
        <button class="home-table_controllers_addButton" (click)="openDialog()">
          <fa-icon [icon]="addIcon"></fa-icon>
          Add
        </button>
      </div>
      <table class="home-table">
        <app-user-info *ngFor="let user of filteredUserList" [userInfo]="user"></app-user-info>
      </table>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchIcon = faSearch
  clearIcon = faX
  addIcon = faPlus
  query = new FormControl('')

  userList: UserList[] = []
  filteredUserList: UserList[] = []

  constructor(private userService: UsersService, public dialog: Dialog ) {}

    ngOnInit(): void {
      this.userService.userList$.subscribe((userList) => {
        this.userList = userList;
        this.filteredUserList = userList
      })
    }

  openDialog() {
    const dialogRef = this.dialog.open(FormDialog, {
      panelClass: 'form-dialog',
    });

  }

  filterUserList(text: string) {
    event?.preventDefault()
    this.filteredUserList = this.userList.filter(user => user?.Nome.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
  }

  clearSearch() {
    this.query.reset()
    this.filteredUserList = this.userList
  }

}
