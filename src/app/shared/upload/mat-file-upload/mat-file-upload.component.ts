import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, 
         HttpEventType, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap } from 'rxjs/operators';
import { LancamentoService } from "src/app/lancamentos/lancamento.service";

@Component({
    selector: 'app-mat-file-upload',
    templateUrl: './mat-file-upload.component.html',
    styleUrls: ['./mat-file-upload.component.css'],
      animations: [
            trigger('fadeInOut', [
                  state('in', style({ opacity: 100 })),
                  transition('* => void', [
                        animate(300, style({ opacity: 0 }))
                  ])
            ])
      ]
})
export class MatFileUploadComponent implements OnInit {
    
      @Output() onUpload = new EventEmitter<string>();
    
      @Input() text = 'Upload';
      /** Name used in form which will be sent in HTTP request. */
      @Input() param = 'anexo';
      /** Target URL for file uploading. */
      //@Input() target = 'https://file.io';
      //@Input() target = 'http://localhost:8080/lancamentos/anexo';
      @Input() target = this.lancamentoService.urlUploadAnexo();
      /** File extension that accepted, same as 'accept' of <input type="file" />. 
          By the default, it's set to 'image/*'. */
      @Input() accept = 'image/*';
      
      /** Allow you to add handler after its completion. Bubble up response text from remote. */
      @Output() complete = new EventEmitter<string>();

      public anexos: Array<FileUploadModel> = [];

      constructor(
              private lancamentoService: LancamentoService,
              private _http: HttpClient,
      ) { }

      ngOnInit() {
      }
      
      onClick() {
            const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
            fileUpload.onchange = () => {
                  for (let index = 0; index < fileUpload.files.length; index++) {
                        const anexo = fileUpload.files[index];
                        this.anexos.push({ data: anexo, state: 'in', 
                          inProgress: false, progress: 0, canRetry: false, canCancel: true });
                  }
                  this.uploadFiles();
            };
            fileUpload.click();
      }

      cancelFile(anexo: FileUploadModel) {
            anexo.sub.unsubscribe();
            this.removeFileFromArray(anexo);
      }

      retryFile(anexo: FileUploadModel) {
            this.uploadFile(anexo);
            anexo.canRetry = false;
      }

      private uploadFile(anexo: FileUploadModel) {
            const fd = new FormData();
            fd.append(this.param, anexo.data);
            
            const req = new HttpRequest('POST', this.target, fd, {
                  reportProgress: true
            });
            
            anexo.inProgress = true;
            anexo.sub = this._http.request(req).pipe(
                  map(event => {
                        switch (event.type) {
                              case HttpEventType.UploadProgress:
                                    anexo.progress = Math.round(event.loaded * 100 / event.total);
                                    break;
                              case HttpEventType.Response:
                                    return event;
                        }
                  }),
                  tap(message => { }),
                  last(),
                  catchError((error: HttpErrorResponse) => {
                        anexo.inProgress = false;
                        anexo.canRetry = true;
                        return of(`${anexo.data.name} upload failed.`);
                  })
            ).subscribe(
                  (event: any) => {
                        if (typeof (event) === 'object') {
                              this.removeFileFromArray(anexo);
                              this.complete.emit(event.body);
                        }
                  }
            );
      }

      private uploadFiles() {
            const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
            fileUpload.value = '';

            this.anexos.forEach(anexo => {
                  this.uploadFile(anexo);
            });
      }

      private removeFileFromArray(anexo: FileUploadModel) {
            const index = this.anexos.indexOf(anexo);
            if (index > -1) {
                  this.anexos.splice(index, 1);
            }
      }
      
      public onUploadEvent() {
          this.onUpload.emit(event.body);
      }

}

export class FileUploadModel {
      data: File;
      state: string;
      inProgress: boolean;
      progress: number;
      canRetry: boolean;
      canCancel: boolean;
      sub?: Subscription;
}