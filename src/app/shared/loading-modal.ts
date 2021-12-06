import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({providedIn: 'root'})
export class LoadingModal {

  showLoadingIndicator(text: string = "Cargando...") {
    Swal.fire({
      width: 300,
      allowEscapeKey: false,
      allowOutsideClick: false,
      text,
      color: "white",
      background: "rgb(0 0 0 / 60%)",
    });
    Swal.showLoading();
  }

  showErrorMessage(text: string = 'Transacción no procesada') {
    Swal.fire({
      width: 300,
      text,
      color: "white",
      background: 'rgb(0 0 0 / 60%);',
      confirmButtonText: 'OK',
      confirmButtonColor: 'rgb(0 0 0 / 70%);',
    });
  }

  closeLoadingIndicator() {
    Swal.close();
  }
}
