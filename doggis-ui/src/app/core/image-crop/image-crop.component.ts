import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss']
})
export class ImageCropComponent implements OnInit {

  @Input()
  corteCircular: boolean = true

  @Input()
  imagem: string

  @Output()
  imagemChange = new EventEmitter<any>()

  @Output()
  onCancelar = new EventEmitter<any>()

  @Output()
  onConcluir = new EventEmitter<any>()
  

  @ViewChild('imagemModal')
  private modalTemplate: TemplateRef<any>
  private modal: any

  public imagemCarregada: any

  constructor(
    private mensagem: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  abrir() {
    this.modal = this.modalService.open(this.modalTemplate, { size: 'xl', centered: true })
  }

  selecionar(event: any) {
    this.imagemCarregada = event
  }

  cortar(event: ImageCroppedEvent) {
    this.imagem = event.base64
    this.imagemChange.emit(this.imagem)
    this.onConcluir.emit(this.imagem)
  }

  carregar(event: any) {
    console.log("Imagem carregada");
  }

  finalizar() {
    this.imagemChange.emit(this.imagem)
    this.onConcluir.emit(this.imagem)
  }

  carregarImagemFalha() {
    this.mensagem.warning(`Tipo de imagem inválida!\n Extensōes aceitas: png, jpg, gif`)
    this.onCancelar.emit()
  }

  cancelar() {
    this.imagemCarregada = ''
    this.imagem = ''
    this.onCancelar.emit(this.imagem)
    this.modal.close()
  }
}
