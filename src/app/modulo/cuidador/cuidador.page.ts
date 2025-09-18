import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cuidador',
  templateUrl: './cuidador.page.html',
  styleUrls: ['./cuidador.page.scss'],
  imports: [IonicModule],
})
export class CuidadorPage implements OnInit {
  public cuidador!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.cuidador = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
