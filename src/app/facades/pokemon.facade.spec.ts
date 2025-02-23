import { TestBed } from '@angular/core/testing';

import { PokemonFacade } from './pokemon.facade';

describe('PokemonService', () => {
  let service: PokemonFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
