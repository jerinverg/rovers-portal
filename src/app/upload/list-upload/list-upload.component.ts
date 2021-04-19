import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UploadFileService } from '../upload-file.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  showFile = false
  fileUploads: Observable<string[]>
  private image: any;
  private readonly imageType: string = 'data:image/JPG;base64,';
  constructor(private uploadService: UploadFileService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    
  }

  showFiles(enable: boolean) {
    this.showFile = enable
    let strs;
    if (enable) {

      this.fileUploads = this.uploadService.getFiles();
    
    }
  }
}
