import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonicModule], // IonicModule já inclui todos os componentes
})
export class FolderPage implements OnInit {
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
