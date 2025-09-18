import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.page.html',
  styleUrls: ['./modulo.page.scss'],
  standalone: true,
  imports: [IonicModule], // IonicModule já inclui todos os componentes
})
export class ModuloPage implements OnInit {
  public modulo!: string;
  public pagina!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    // Pega os parâmetros da URL
    this.modulo = this.activatedRoute.snapshot.paramMap.get('modulo') as string;
    this.pagina = this.activatedRoute.snapshot.paramMap.get('pagina') as string;
  }

  // Opcional: um getter para mostrar algo bonito
  get displayName(): string {
    return `${this.modulo} / ${this.pagina}`;
  }
}
