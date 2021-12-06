import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FetchDataService } from './fetch-data.service';

describe('FetchDataServiceService', () => {
  let service: FetchDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchDataService]
    });
    service = TestBed.inject(FetchDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getAllCharacters method', () => {
    service.getAllCharacters().subscribe(
      data => {
        expect(data).toBeDefined();
      }
    );

    const req = httpTestingController.expectOne(request => {
      return request.url.includes(service.API_FETCH_CHARACTERS);
    });

    req.flush({data: ''});
  });

  it('should test getAllEpisodes method', () => {
    service.getAllEpisodes().subscribe(
      data => {
        expect(data).toBeDefined();
      }
    );

    const req = httpTestingController.expectOne(request => {
      return request.url.includes(service.API_FETCH_EPISODES);
    });

    req.flush({data: ''});
  });

  it('should test getAllLocations method', () => {
    service.getAllLocations().subscribe(
      data => {
        expect(data).toBeDefined();
      }
    );

    const req = httpTestingController.expectOne(request => {
      return request.url.includes(service.API_FETCH_LOCATIONS);
    });

    req.flush({data: ''});
  });

  it('should test getObjectFromPage page #2', () => {
    service.getAllLocations(2).subscribe(
      data => {
        expect(data).toBeDefined();
      }
    );

    const req = httpTestingController.expectOne(request => {
      return request.url.includes(service.API_FETCH_LOCATIONS +'?page=2');
    });

    req.flush({data: ''});
  });
});
