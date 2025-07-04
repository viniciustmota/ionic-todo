import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  tarefaCollection : any[] = [];
  key = 'tarefaCollection';
  constructor() { }

  salvar(tarefa: any, callback: (() => void) | null = null) {
  tarefa.feito = false;
  tarefa.codigoTarefa = uuidv4();

  let value = localStorage.getItem(this.key);
  let collection: any[] = value ? JSON.parse(value) : [];

  collection.push(tarefa);
  localStorage.setItem(this.key, JSON.stringify(collection));

  if (callback) {
    callback();
  }
}


  listar()
  {
    // Obter do localStorage
    let value = localStorage.getItem(this.key);
    if(value == null || value == undefined)
    {
      return [];
    }

    let collection : any[] = JSON.parse(value);
    return collection;
  }

  excluirTarefa(tarefa : any, callback: (() => void) | null = null)
  {
    // Obter do localStorage
    let value = localStorage.getItem(this.key);
    if(value == null || value == undefined)
    {
      return;
    }

    let collection : any[] = JSON.parse(value);

    let resultCollection = collection.filter(item => {return item.codigoTarefa !== tarefa.codigoTarefa});
    localStorage.setItem(this.key, JSON.stringify(resultCollection));

    if(callback!=null)
    {
      callback();
    }
  }

  atualizar(tarefaAtualizada: any, callback: (() => void) | null = null) {
  let value = localStorage.getItem(this.key);
  if (!value) return;

  let collection: any[] = JSON.parse(value);

  const index = collection.findIndex(item => item.codigoTarefa === tarefaAtualizada.codigoTarefa);

  if (index !== -1) {
    collection[index] = tarefaAtualizada;
    localStorage.setItem(this.key, JSON.stringify(collection));

    if (callback) {
      callback();
    }
  }
}

}
