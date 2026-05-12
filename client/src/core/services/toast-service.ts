import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',  // ← Creates ONE shared instance across the entire app
})
export class ToastService {
  constructor() {
    this.createToastContainer();  // ← Run once when service is created
  }

  private createToastContainer() {
    if(!document.getElementById('toast-container')) {  // ← Only create if it doesn't exist yet
      const container = document.createElement('div');
      container.id = 'toast-container';  // ← Unique ID so we can find it later
      container.className = 'toast toast-end toast-bottom';  // ← DaisyUI positioning classes
      document.body.appendChild(container);  // ← Add to bottom of page
    }
  }

  private createToastElement(message: string, alertClass: string, duration = 5000){
    const toastContainer = document.getElementById('toast-container');
    if(!toastContainer) return;  // ← Bail out if container doesn't exist

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');  // ← Style the toast (color from alertClass)
    toast.innerHTML = `
      <span>${message}</span>
      <button class= "btn ml-4 btn-sm btn-ghost">x</button>
      `;
    toast.querySelector('button')?.addEventListener('click', ()=> {  // ← Manual close
      toastContainer.removeChild(toast);
    })

    toastContainer.appendChild(toast);  // ← Show the toast

    setTimeout(() => {  // ← Auto-dismiss after duration
      if(toastContainer.contains(toast)){  // ← Check if still visible
        toastContainer.removeChild(toast);  // ← Remove it
      }
    }, duration);
  }

  // ← PUBLIC methods to use from other components
  success(message: string, duration?: number) {
    this.createToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, 'alert-error', duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info', duration);
  }
}
