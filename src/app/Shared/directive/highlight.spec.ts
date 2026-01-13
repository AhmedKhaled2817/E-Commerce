import { ElementRef} from '@angular/core';
import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const directive = new Highlight(new ElementRef(null), null as any);
    expect(directive).toBeTruthy();
  });
});
