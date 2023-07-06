import { Injectable } from '@angular/core';
import { UserList } from './user-list';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'https://6467a872e99f0ba0a814b5ff.mockapi.io/api/Pessoas'
  private storage: Storage

  private userListSubject: BehaviorSubject<UserList[]> = new BehaviorSubject<UserList[]>([]);
  userList$ = this.userListSubject.asObservable();


  constructor() {
    this.storage = window.localStorage
    console.log('hey')
    if (!this.storage.getItem('userList')) {
      this.fetchUserAPI()
    } else {
      this.userListSubject.next(JSON.parse(this.storage.getItem('userList')!))
    }
  }

  async fetchUserAPI(): Promise<void> {
    const data = await fetch(this.url)
    const userList = await data.json() ?? []
    this.userListSubject.next(userList)
    this.storage.setItem('userList', JSON.stringify(userList))
  }

  addUser(user: UserList): void {
    const currentList = this.userListSubject.getValue();
    const updatedList = [...currentList, user];
    this.userListSubject.next(updatedList);
    this.storage.setItem('userList', JSON.stringify(updatedList))
  }

  deleteUser(user: UserList): void {
    const currentList = this.userListSubject.getValue();
    const updatedList = currentList.filter(u => u.Nome !== user.Nome && u.Email !== user.Email)
    this.userListSubject.next(updatedList)
    localStorage.setItem('userList', JSON.stringify(updatedList))
  }

}
