import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, Portal } from "@angular/cdk/portal";
import {
	DestroyRef,
	Directive,
	HostListener,
	inject,
	InjectionToken,
	Injector,
	Input,
	signal,
	TemplateRef,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter } from "rxjs";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { SidebarService } from "../../services/sidebar.service";


@Directive({
	selector: "[sidebarTrigger]"
})
export class SidebarTriggerDirective {
	@Input({required: true}) content!: TemplateRef<unknown>;
  private readonly destroyRef = inject(DestroyRef);
  private readonly dimensions = signal({ width: '336px', height: '100%' });

	private overlayRef!: OverlayRef;
	private portal!: ComponentPortal<SidebarComponent>;

	constructor(private readonly overlay: Overlay, private readonly sidebarService: SidebarService) {
		this.sidebarService.getState().pipe(
      filter(({open}) => !open),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      if (this.overlayRef?.hasAttached())
      this.detach();
		});
	}

	@HostListener("click", ["$event"])
	onClick(event: MouseEvent) {
    event.preventDefault()
    const injector = Injector.create({
      providers: [
        { provide: 'SIDEBAR_CONTENT', useValue: this.content}
      ]
    });

		this.portal = new ComponentPortal(SidebarComponent, null, injector);
		this.overlayRef = this.overlay.create({
			hasBackdrop: true,
			positionStrategy: this.overlay.position().global().right().right(),
			width: this.dimensions().width,
			height: this.dimensions().height
		});

		this.overlayRef.attach(this.portal);

		this.sidebarService.setState({ open: true });
		this.overlayRef.backdropClick().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
			this.sidebarService.setState({ open: false });
		});
	}

	private detach() {
		this.overlayRef.detach();
	}
}
