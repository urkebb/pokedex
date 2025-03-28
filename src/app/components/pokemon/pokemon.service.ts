import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  isLoading = signal(true);

  setLoading(isLoading: boolean) {
    this.isLoading.set(isLoading);
  }

}
