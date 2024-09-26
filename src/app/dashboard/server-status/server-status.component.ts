import {AfterViewInit, Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, AfterViewInit {
  currentStatus = signal<"offline" | "online" | "unknown">("offline");
  private destroyRef = inject(DestroyRef);
  // @ts-ignore
  // private interval?: NodeJS.Timeout;
  // private interval?: ReturnType<typeof setInterval>;

  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    });



  }
  ngOnInit() {
    console.log("NG ON INIT");
    const interval = setInterval(() => {
      const rnd = Math.random();

      if (rnd >= 0.5) {
        this.currentStatus.set('online');
      }else if (rnd >= 0.9) {
        this.currentStatus.set('offline');
      }else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    })
  }

  ngAfterViewInit() {
    console.log("AFTER VIEW INIT");
  }



  // ngOnDestroy() {
  //   console.log("NG ON DESTROY");
  //   clearTimeout(this.interval)
  // }
}
