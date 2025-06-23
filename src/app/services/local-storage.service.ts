import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  saveItem(key: string, value: string): void {
    localStorage.setItem(key, value);

  }

  getItem(key: string): string | null {
    const value = localStorage.getItem(key);
    return value;

  }

  updateItem(key: string, value: string): void {
    const isExisting = this.hasItem(key);

    if (!isExisting) return;

    this.removeItem(key);
    this.saveItem(key, value)

  }

  removeItem(key: string): void {
    localStorage.removeItem(key);

  }

  clearAll(): void {
    localStorage.clear();

  }

  hasItem(key: string): boolean {
    return !!localStorage.getItem(key);

  }


}
