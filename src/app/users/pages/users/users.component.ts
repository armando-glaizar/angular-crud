import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<any> = [];
  searchValue: string = '';
  
  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.firestore.collection('usuarios').snapshotChanges().subscribe((usuarios) => {
      this.users = usuarios;
    });
  }

  deleteUser(path: string): void {
    this.firestore.collection('usuarios').doc(path).delete();
  }
}
