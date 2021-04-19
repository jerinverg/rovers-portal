import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  result: any

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  onSubmit(roverInfo) {
    this.uploadService.sendDataToBack(roverInfo).subscribe(event => {
      if (event instanceof HttpResponse) {
        this.result = event.body;
        console.log('File is completely uploaded!', event.body);
      }
    })
  }
  resetForm(roverInfo) {
    roverInfo.reset();
  }

  selectFile(event) {
    const file = event.target.files.item(0)

    if (file.type.match('text/plain.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadService.pushFileToBack(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!', event.body);
        this.result = event.body;
      }
    })

    this.selectedFiles = undefined
  }


}
