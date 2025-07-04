import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage
{
  tarefaCollection : any[] = [];

  constructor
  (
    private alertCtrl : AlertController,
    private tarefaService : TarefaService,
    private actionSheetCtrl : ActionSheetController
  ) {}

  ionViewDidEnter()
  {
    this.listarTarefa();
  }

  listarTarefa()
  {
    this.tarefaCollection = this.tarefaService.listar();
  }

  isOpeningAdd : boolean = false;
  async showAdd(){
    if(this.isOpeningAdd) return;
    this.isOpeningAdd = true;

    const alert = await this.alertCtrl.create({

      header: 'informe a tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Descreva sua tarefa'
        },
      ],
      buttons: [
         {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          },
        },
        {
          text: 'Salvar',
          handler: (tarefa) => {
            console.log("teste");

            this.tarefaService.salvar(tarefa, ()=>{
              this.listarTarefa();
            });
          },
        }
      ]
    });

    await alert.present();

    await alert.onDidDismiss();
    this.isOpeningAdd = false;
  }

  excluirTarefa(item : object)
  {
    this.tarefaService.excluirTarefa(item, ()=>{
      this.listarTarefa();
    })
  }

  isOpeningActionSheet = false;
  async openActions(tarefa: any) {
    if (this.isOpeningActionSheet) return;
    this.isOpeningActionSheet = true;

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O QUE DESEJA FAZER?',
      buttons: [
        {
          text: tarefa.feito ? 'Desmarcar como realizado' : 'Marcar como realizado',
          icon: tarefa.feito ? 'close-circle': 'checkmark-circle',
          handler: () => {
            tarefa.feito = !tarefa.feito;

            this.tarefaService.atualizar(tarefa, () => {
              this.listarTarefa();
            })
          },
        },
        {
          text : 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ],
    });

    await actionSheet.present();

    await actionSheet.onDidDismiss();
    this.isOpeningActionSheet = false;
  }
}
