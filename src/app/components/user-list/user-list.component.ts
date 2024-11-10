import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  editing: any = {};

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  onRowEditInit(user: any): void {
    this.editing[user.id] = { ...user };
  }

  onRowEditSave(user: any): void {
    if (user.name && user.email) {
      this.userService.updateUser(user).subscribe(
        () => {
          delete this.editing[user.id];
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
    else {
      alert('User name and email are required.');
    }
  }

  onRowEditCancel(user: any, index: number): void {
    this.users[index] = this.editing[user.id];
    delete this.editing[user.id];
  }

  onDelete(user: any): void {
    this.userService.deleteUser(user.id).subscribe(
      () => {
        this.users = this.users.filter(u => u.id !== user.id);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
