import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, Portal } from "@angular/cdk/portal";
import {
	DestroyRef,
	Directive,
	HostListener,
	inject,
	Input,
	signal,
	TemplateRef,
} from "@angular/core";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { SidebarService } from "../services/sidebar.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter, take } from "rxjs";

@Directive({
	selector: "[sidebarTrigger]"
})
export class SidebarTriggerDirective {
	@Input() content!: TemplateRef<unknown>;
  private readonly destroyRef = inject(DestroyRef)
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

	@HostListener("click", ["$event.target"])
	onClick() {
		this.portal = new ComponentPortal(SidebarComponent);
		this.overlayRef = this.overlay.create({
			hasBackdrop: true,
			positionStrategy: this.overlay.position().global().right().right(),
			width: this.dimensions().width,
			height: this.dimensions().height
		});
		const componentRef = this.overlayRef.attach(this.portal);
		componentRef.instance.content = this.content;
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
