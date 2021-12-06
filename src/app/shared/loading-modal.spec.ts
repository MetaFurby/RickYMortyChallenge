import { TestBed } from "@angular/core/testing";
import Swal from "sweetalert2";
import { LoadingModal } from "./loading-modal";

describe('LoadingModal', () => {
  let service: LoadingModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingModal]
    })

    service = TestBed.inject(LoadingModal);
  });

  beforeEach(() => {
    spyOn(Swal, 'fire');
    spyOn(Swal, 'showLoading');
    spyOn(Swal, 'close');
  });

  it('should test a ModalService instance', () => {
    expect(service).toBeDefined();
  });

  it('should test showLoadingIndicator method', () => {
    service.showLoadingIndicator();
    expect(Swal.fire).toHaveBeenCalled();
    expect(Swal.showLoading).toHaveBeenCalled();
  });

  it('should test showErrorMessage method', () => {
    service.showErrorMessage();
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should test closeLoadingIndicator method', () => {
    service.closeLoadingIndicator();
    expect(Swal.close).toHaveBeenCalled();
  });
});
