import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { of, throwError } from 'rxjs';
import { MainLayoutComponent } from './main-layout.component';
import { LoadingModal } from 'src/app/shared/loading-modal';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(() => {
    const fetchDataServiceStub = () => ({
      getAllCharacters: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getAllLocations: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getAllEpisodes: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
  });

  const loadingModalServiceStub = () => ({
    showLoadingIndicator: () => ({}),
    closeLoadingIndicator:  () => ({})

});

  TestBed.configureTestingModule({
    declarations: [MainLayoutComponent],
    providers: [
      { provide: FetchDataService, useFactory: fetchDataServiceStub },
      { provide: LoadingModal, useFactory: loadingModalServiceStub }
    ]
  });
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'subscribeGetCharacters').and.callThrough();
      spyOn(component, 'subscribeGetLocations').and.callThrough();
      spyOn(component, 'subscribeGetEpisodes').and.callThrough();
      component.ngOnInit();
      expect(component.subscribeGetCharacters).toHaveBeenCalled();
      expect(component.subscribeGetLocations).toHaveBeenCalled();
      expect(component.subscribeGetEpisodes).toHaveBeenCalled();
    });
  });

  describe('subscribeGetCharacters', () => {
    it('makes expected calls', () => {
      const fetchDataServiceStub: FetchDataService = fixture.debugElement.injector.get(
        FetchDataService
      );
      const auxResponse = {
        "info": {
          "count": 826,
          "pages": 42,
          "next": null,
          "prev": "https://rickandmortyapi.com/api/character?page=41"
        },
        "results": [
          {
            "id": 821,
            "name": "Gotron",
            "status": "unknown",
            "species": "Robot",
            "type": "Ferret Robot",
            "gender": "Genderless",
            "origin": {
              "name": "Earth (Replacement Dimension)",
              "url": "https://rickandmortyapi.com/api/location/20"
            },
            "location": {
              "name": "Earth (Replacement Dimension)",
              "url": "https://rickandmortyapi.com/api/location/20"
            },
            "image": "https://rickandmortyapi.com/api/character/avatar/821.jpeg",
            "episode": [
              "https://rickandmortyapi.com/api/episode/48"
            ],
            "url": "https://rickandmortyapi.com/api/character/821",
            "created": "2021-11-02T17:15:24.788Z"
          },
          {
            "id": 822,
            "name": "Young Jerry",
            "status": "unknown",
            "species": "Human",
            "type": "",
            "gender": "Male",
            "origin": {
              "name": "Earth (Unknown dimension)",
              "url": "https://rickandmortyapi.com/api/location/30"
            },
            "location": {
              "name": "Earth (Unknown dimension)",
              "url": "https://rickandmortyapi.com/api/location/30"
            },
            "image": "https://rickandmortyapi.com/api/character/avatar/822.jpeg",
            "episode": [
              "https://rickandmortyapi.com/api/episode/51"
            ],
            "url": "https://rickandmortyapi.com/api/character/822",
            "created": "2021-11-02T17:18:31.934Z"
          }
        ]
      };
      spyOn(fetchDataServiceStub, 'getAllCharacters').and.returnValue(of(auxResponse));
      component.subscribeGetCharacters();
      expect(fetchDataServiceStub.getAllCharacters).toHaveBeenCalled();
      expect(component.loadingCharacters).toEqual(false);
      expect(component.characters.length).toEqual(2);
    });

    it('call throws error', () => {
        const fetchDataServiceStub: FetchDataService = fixture.debugElement.injector.get(
          FetchDataService
        );
        spyOn(fetchDataServiceStub, 'getAllCharacters').and.returnValue(throwError({status: 404}));
        component.subscribeGetCharacters();
        expect(component.loadingCharacters).toEqual(false);
        expect(component.characters.length).toEqual(0);
      });
  });

  describe('subscribeGetLocations', () => {
    it('makes expected calls', () => {
      const fetchDataServiceStub: FetchDataService = fixture.debugElement.injector.get(
        FetchDataService
      );
      const auxResponse = {
        "info": {
          "count": 126,
          "pages": 7,
          "next": null,
          "prev": "https://rickandmortyapi.com/api/location?page=6"
        },
        "results": [
          {
            "id": 121,
            "name": "Rick's Consciousness",
            "type": "Consciousness",
            "dimension": "Replacement Dimension",
            "residents": [],
            "url": "https://rickandmortyapi.com/api/location/121",
            "created": "2021-10-25T09:12:23.715Z"
          },
          {
            "id": 122,
            "name": "Avian Planet",
            "type": "Planet",
            "dimension": "Replacement Dimension",
            "residents": [
              "https://rickandmortyapi.com/api/character/792",
              "https://rickandmortyapi.com/api/character/793"
            ],
            "url": "https://rickandmortyapi.com/api/location/122",
            "created": "2021-10-26T12:19:52.957Z"
          }
        ]
      };
      spyOn(fetchDataServiceStub, 'getAllLocations').and.returnValue(of(auxResponse));
      component.subscribeGetLocations();
      expect(fetchDataServiceStub.getAllLocations).toHaveBeenCalled();
      expect(component.loadingLocations).toEqual(false);
      expect(component.locations.length).toEqual(2);
    });

    it('call throws error', () => {
        const fetchDataServiceStub: FetchDataService = fixture.debugElement.injector.get(
          FetchDataService
        );
        spyOn(fetchDataServiceStub, 'getAllLocations').and.returnValue(throwError({status: 404}));
        component.subscribeGetLocations();
        expect(component.loadingLocations).toEqual(false);
        expect(component.locations.length).toEqual(0);
      });
  });

  describe('subscribeGetEpisodes', () => {
    it('makes expected calls', () => {
      const fetchDataServiceStub: FetchDataService = fixture.debugElement.injector.get(
        FetchDataService
      );
      const auxResponse = {
        "info": {
          "count": 51,
          "pages": 3,
          "next": null,
          "prev": "https://rickandmortyapi.com/api/episode?page=2"
        },
        "results": [
          {
            "id": 41,
            "name": "Star Mort: Rickturn of the Jerri",
            "air_date": "May 31, 2020",
            "episode": "S04E10",
            "characters": [
              "https://rickandmortyapi.com/api/character/1",
              "https://rickandmortyapi.com/api/character/2",
              "https://rickandmortyapi.com/api/character/3",
              "https://rickandmortyapi.com/api/character/4",
            ],
            "url": "https://rickandmortyapi.com/api/episode/41",
            "created": "2020-08-06T05:51:52.079Z"
          }
        ]
      };
      spyOn(fetchDataServiceStub, 'getAllEpisodes').and.returnValue(of(auxResponse));
      component.subscribeGetEpisodes();
      expect(fetchDataServiceStub.getAllEpisodes).toHaveBeenCalled();
      expect(component.loadingEpisodes).toEqual(false);
      expect(component.episodes.length).toEqual(1);
    });

    it('call throws error', () => {
        const fetchDataServiceStub: FetchDataService = fixture.debugElement.injector.get(
          FetchDataService
        );
        spyOn(fetchDataServiceStub, 'getAllEpisodes').and.returnValue(throwError({status: 404}));
        component.subscribeGetEpisodes();
        expect(component.loadingEpisodes).toEqual(false);
        expect(component.episodes.length).toEqual(0);
      });
  });

  describe('dismissModals', () => {
    it('makes expected calls', () => {    
      component.dismissModals();
      expect(component.showEpisodeLocation).toEqual(false);
      expect(component.showCharCounter).toEqual(false);
      
    });
  });

  describe('validateLoadingData', () => {
    it('makes expected calls', () => {  
      const loadingModalServiceStub: LoadingModal = fixture.debugElement.injector.get(
        LoadingModal
      );
      spyOn(loadingModalServiceStub, 'closeLoadingIndicator').and.callThrough();  
      component.loadingEpisodes = true;
      component.loadingLocations = true;
      component.loadingCharacters = true;
      component.validateLoadingData();
      component.loadingEpisodes = false;
      component.loadingLocations = false;
      component.loadingCharacters = false;
      component.validateLoadingData();
      expect(loadingModalServiceStub.closeLoadingIndicator).toHaveBeenCalled();
    });
  });

  describe('runCharCounter', () => {
    it('makes expected calls', () => {    
      component.locations = [{
        "id": 121,
        "name": "Rick's Consciousness",
        "type": "Consciousness",
        "dimension": "Replacement Dimension",
        "residents": [],
        "url": "https://rickandmortyapi.com/api/location/121",
        "created": new Date()
      },
      {
        "id": 122,
        "name": "Avian Planet",
        "type": "Planet",
        "dimension": "Replacement Dimension",
        "residents": [
          "https://rickandmortyapi.com/api/character/792",
          "https://rickandmortyapi.com/api/character/793"
        ],
        "url": "https://rickandmortyapi.com/api/location/122",
        "created": new Date()
      }];
      component.episodes = [ {
        "id": 41,
        "name": "Star Mort: Rickturn of th Jrri",
        "air_date": "May 31, 2020",
        "episode": "S04E10",
        "characters": [
          "https://rickandmortyapi.com/api/character/1",
          "https://rickandmortyapi.com/api/character/2",
          "https://rickandmortyapi.com/api/character/3",
          "https://rickandmortyapi.com/api/character/4",
        ],
        "url": "https://rickandmortyapi.com/api/episode/41",
        "created": new Date()
      }, {
        "id": 42,
        "name": "Star Mort: Rickturn of the Jerri",
        "air_date": "May 31, 2020",
        "episode": "S04E10",
        "characters": [
          "https://rickandmortyapi.com/api/character/1",
          "https://rickandmortyapi.com/api/character/2",
          "https://rickandmortyapi.com/api/character/3",
          "https://rickandmortyapi.com/api/character/4",
        ],
        "url": "https://rickandmortyapi.com/api/episode/41",
        "created": new Date()
      }];
      component.characters = [{
        "id": 821,
        "name": "Gotron",
        "status": "unknown",
        "species": "Robot",
        "type": "Ferret Robot",
        "gender": "Genderless",
        "origin": {
          "name": "Earth (Replacement Dimension)",
          "url": "https://rickandmortyapi.com/api/location/20"
        },
        "location": {
          "name": "Earth (Replacement Dimension)",
          "url": "https://rickandmortyapi.com/api/location/20"
        },
        "episode": [
          "https://rickandmortyapi.com/api/episode/48"
        ],
        "url": "https://rickandmortyapi.com/api/character/821",
        "created": new Date()
      },
      {
        "id": 822,
        "name": "Young CJerry",
        "status": "unknown",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
          "name": "Earth (Unknown dimension)",
          "url": "https://rickandmortyapi.com/api/location/30"
        },
        "location": {
          "name": "Earth (Unknown dimension)",
          "url": "https://rickandmortyapi.com/api/location/30"
        },
        "episode": [
          "https://rickandmortyapi.com/api/episode/51"
        ],
        "url": "https://rickandmortyapi.com/api/character/822",
        "created": new Date()
      }];
      component.runCharCounter();
      expect(component.showCharCounter).toEqual(true);
      
    });
  });

  describe('runCharCounter', () => {
    it('makes expected calls no origins added', () => {    
      component.episodes = [ {
        "id": 41,
        "name": "Star Mort: Rickturn of th Jrri",
        "air_date": "May 31, 2020",
        "episode": "S04E10",
        "characters": [
          "https://rickandmortyapi.com/api/character/1",
          "https://rickandmortyapi.com/api/character/2",
          "https://rickandmortyapi.com/api/character/3",
          "https://rickandmortyapi.com/api/character/4",
        ],
        "url": "https://rickandmortyapi.com/api/episode/41",
        "created": new Date()
      }, {
        "id": 42,
        "name": "Star Mort: Rickturn of the Jerri",
        "air_date": "May 31, 2020",
        "episode": "S04E10",
        "characters": [
          "https://rickandmortyapi.com/api/character/1",
          "https://rickandmortyapi.com/api/character/2",
          "https://rickandmortyapi.com/api/character/3",
          "https://rickandmortyapi.com/api/character/4",
        ],
        "url": "https://rickandmortyapi.com/api/episode/41",
        "created": new Date()
      }];
      component.characters = [{
        "id": 821,
        "name": "Gotron",
        "status": "unknown",
        "species": "Robot",
        "type": "Ferret Robot",
        "gender": "Genderless",
        "origin": {
          "name": "Earth (Replacement Dimension)",
          "url": "https://rickandmortyapi.com/api/location/20"
        },
        "location": {
          "name": "Earth (Replacement Dimension)",
          "url": "https://rickandmortyapi.com/api/location/20"
        },
        "episode": [
          "https://rickandmortyapi.com/api/episode/48"
        ],
        "url": "https://rickandmortyapi.com/api/character/821",
        "created": new Date()
      },
      {
        "id": 822,
        "name": "Young CJerry",
        "status": "unknown",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
          "name": "Earth (Unknown dimension)",
          "url": "https://rickandmortyapi.com/api/location/30"
        },
        "location": {
          "name": "Earth (Unknown dimension)",
          "url": "https://rickandmortyapi.com/api/location/30"
        },
        "episode": [
          "https://rickandmortyapi.com/api/episode/51"
        ],
        "url": "https://rickandmortyapi.com/api/character/822",
        "created": new Date()
      }];
      component.runEpisodeCounter();
      expect(component.showEpisodeLocation).toEqual(true);
      
    });
    it('makes expected calls origins added', () => {    
      component.episodes = [ {
        "id": 41,
        "name": "Star Mort: Rickturn of th Jrri",
        "air_date": "May 31, 2020",
        "episode": "S04E10",
        "characters": [
          "https://rickandmortyapi.com/api/character/1",
          "https://rickandmortyapi.com/api/character/2",
          "https://rickandmortyapi.com/api/character/3",
          "https://rickandmortyapi.com/api/character/4",
        ],
        "url": "https://rickandmortyapi.com/api/episode/41",
        "created": new Date()
      }, {
        "id": 42,
        "name": "Star Mort: Rickturn of the Jerri",
        "air_date": "May 31, 2020",
        "episode": "S04E10",
        "characters": [
          "https://rickandmortyapi.com/api/character/1",
          "https://rickandmortyapi.com/api/character/2",
          "https://rickandmortyapi.com/api/character/3",
          "https://rickandmortyapi.com/api/character/4",
        ],
        "url": "https://rickandmortyapi.com/api/episode/41",
        "created": new Date()
      }];
      component.characters = [{
        "id": 1,
        "name": "Gotron",
        "status": "unknown",
        "species": "Robot",
        "type": "Ferret Robot",
        "gender": "Genderless",
        "origin": {
          "name": "Earth (Replacement Dimension)",
          "url": "https://rickandmortyapi.com/api/location/20"
        },
        "location": {
          "name": "Earth (Replacement Dimension)",
          "url": "https://rickandmortyapi.com/api/location/20"
        },
        "episode": [
          "https://rickandmortyapi.com/api/episode/48"
        ],
        "url": "https://rickandmortyapi.com/api/character/1",
        "created": new Date()
      },
      {
        "id": 2,
        "name": "Young CJerry",
        "status": "unknown",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
          "name": "Earth (Unknown dimension)",
          "url": "https://rickandmortyapi.com/api/location/30"
        },
        "location": {
          "name": "Earth (Unknown dimension)",
          "url": "https://rickandmortyapi.com/api/location/30"
        },
        "episode": [
          "https://rickandmortyapi.com/api/episode/51"
        ],
        "url": "https://rickandmortyapi.com/api/character/2",
        "created": new Date()
      }];
      component.runEpisodeCounter();
      expect(component.showEpisodeLocation).toEqual(true);
      
    });
  });
  
});
