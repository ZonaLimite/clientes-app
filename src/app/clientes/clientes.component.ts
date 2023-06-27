import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
       clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente):void{
    swal.fire({
      title: `Esta seguro de borrar este cliente? : ${cliente.nombre} ${cliente.apellido}`,
      text: "Ya no sera posible recuperarlo ¡",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          (response) => {
            this.clientes = this.clientes.filter( cli => cli !==cliente)
            swal.fire(
                `Cliente ${cliente.nombre} Eliminado!`,
                'Your file has been deleted.',
                'success')
          }
        )
      }
    })
  }

}
