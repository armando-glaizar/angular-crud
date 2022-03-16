import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  roles: Array<any> = [];

  userId: string = '';
  usuario: string = '';
  rolId: string = '';

  constructor(private firestore: AngularFirestore, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.usuario = params['usuario'];
      this.rolId = params['rolId'];
    });

    this.userForm = this.formBuilder.group({
      usuario: [ this.usuario, Validators.required ],
      rol: [ this.rolId, Validators.required ],
    });
  }

  ngOnInit(): void {
    this.firestore.collection('roles').snapshotChanges().subscribe((value) => {
      this.roles = value;
    });
  }

  createUser(): void {
    if(this.userForm.valid) {
      if(this.userId == null) {
        this.firestore.collection('usuarios').add({ usuario: this.userForm.value.usuario, rol: this.userForm.value.rol });
      }
      else {
        this.firestore.collection('usuarios').doc(this.userId).update({ usuario: this.userForm.value.usuario, rol: this.userForm.value.rol });
      }
      
      this.router.navigate(['/usuarios']);
    }
  }
}
