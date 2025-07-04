import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { AlertController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    private swUpdate: SwUpdate
  ) {}

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(async () => {
          const alert = await this.alertCtrl.create({
            header: 'Atualização disponível',
            message: 'Uma nova versão do app está disponível. Deseja atualizar agora?',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
              },
              {
                text: 'Atualizar',
                handler: () => {
                  this.swUpdate.activateUpdate().then(() => {
                    window.location.reload();
                  });
                },
              },
            ],
          });

          await alert.present();
        });
    }
  }
}
