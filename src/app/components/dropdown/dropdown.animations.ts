import { animate, AnimationTriggerMetadata, style, transition, trigger } from "@angular/animations";

export const DROPDOWN_ANIMATIONS: AnimationTriggerMetadata[] = [
    trigger('animation', [
      transition(':enter', [
        style({
          maxHeight: 0,
          overflow: 'hidden',
        }),
        animate('0.3s ease-in-out',
          style({
            maxHeight: '500px'
          })
        )
      ])
    ])
  ]
