import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { Character } from 'src/app/models/character';
import { Episode } from 'src/app/models/episode';
import { Location } from 'src/app/models/location';
import { LoadingModal } from 'src/app/shared/loading-modal';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  public characters: Character[];
  public locations: Location[];
  public episodes: Episode[];
  
  public loadingEpisodes: boolean;
  public loadingCharacters: boolean;
  public loadingLocations: boolean;

  public showCharCounter: boolean;
  public showEpisodeLocation: boolean;
  public charCounterOutput: any;
  public episodeLocationOutput: any;

  constructor(private fetchDataService: FetchDataService,
              private loadingModalService: LoadingModal) { 
    //initialization of arrays
    this.characters = [];
    this.episodes = [];
    this.locations = [];
    this.loadingCharacters = true;
    this.loadingEpisodes = true;
    this.loadingLocations = true;
    this.showCharCounter = false;
    this.showEpisodeLocation = false;
  }

  ngOnInit(): void {
    //fetch data
    this.loadingModalService.showLoadingIndicator("Cargando datos de Rick & Morty API...");
    this.subscribeGetCharacters();
    this.subscribeGetLocations();
    this.subscribeGetEpisodes();
  }

  validateLoadingData(){
    if(!this.loadingCharacters && !this.loadingEpisodes && !this.loadingLocations){
      this.loadingModalService.closeLoadingIndicator();
    }
  }

  subscribeGetCharacters(currentPage = 1){
    this.fetchDataService.getAllCharacters(currentPage).subscribe(data => {
      //Check if data exists
      if(data.results!= null){  
        this.characters.push(...data.results);
        //recursive calls through all pages
        if(data.info.next != null){
          this.subscribeGetCharacters(++currentPage);
        }
        else{
          //finished reading all character pages
          this.loadingCharacters = false;
          this.validateLoadingData();
        }
      }
    }, error => {
      this.loadingCharacters = false;
      console.log(error);
    });
    
  }

  subscribeGetLocations(currentPage = 1){
    this.fetchDataService.getAllLocations(currentPage).subscribe(data => {
      //Check if data exists
      if(data.results!= null){
        this.locations.push(...data.results);
        //recursive calls through all pages
        if(data.info.next != null){
          this.subscribeGetLocations(++currentPage);
        }
        else{
          //finished reading all location pages
          this.loadingLocations = false;
          this.validateLoadingData();
        }
      }
    }, error => {
      this.loadingLocations = false;
      console.log(error);
    });
  }

  subscribeGetEpisodes(currentPage = 1){
    this.fetchDataService.getAllEpisodes(currentPage).subscribe(data => {
      //Check if data exists
      if(data.results!= null){
        this.episodes.push(...data.results);
        //recursive calls through all pages
        if(data.info.next != null){
          this.subscribeGetEpisodes(++currentPage);
        }
        else{
          //finished reading all episode pages
          this.loadingEpisodes = false;
          this.validateLoadingData();
        }
      }
    }, error => {
      this.loadingEpisodes = false;
      console.log(error);
    });
  }

  runCharCounter(){
    this.showEpisodeLocation = false;
    let start = performance.now();
    //count L's in locations
    let countL = 0;
    for(let i=0; i<this.locations.length;i++){
      countL = countL + (this.locations[i].name.match(/l/gi) || []).length;
    }
    //count E's in episodes
    let countE = 0;
    for(let i=0; i<this.episodes.length;i++){
      countE = countE + (this.episodes[i].name.match(/e/gi) || []).length;
    }
    //count C's in characters
    let countC = 0;
    for(let i=0; i<this.characters.length;i++){
      countC = countC + (this.characters[i].name.match(/c/gi) || []).length;
    }
    let end = performance.now();
    let seconds = (end-start)/1000;
    let passedLimit = "False";
    if(seconds < 3){
      passedLimit = "True";
    }
    //concat <br> for string formating
    this.charCounterOutput = 
    {
      exercise_name: "Char counter<br>",
      time: seconds.toFixed(5) + " seconds<br>",
      in_time: passedLimit + "<br>",
      results: [
        {
            char: "l",
            count: countL,
            resource: "location<br>"
        },
        {
            char: "e",
            count: countE,
            resource: "episode<br>"
        },
        {
            char: "c",
            count: countC,
            resource: "character"
        }
      ]
    }

    console.log(this.charCounterOutput);
    this.charCounterOutput = JSON.stringify(this.charCounterOutput);
    this.showCharCounter = true;
  }

  runEpisodeCounter(){
    this.showCharCounter = false;
    let start = performance.now();
    let results: any[] = [];
    for(let i=0; i<this.episodes.length;i++){
      let origins: string[] = [];
      //concat <br> for string formating
      let auxEpisode= {
        name: this.episodes[i].name + "<br>",
        episode: this.episodes[i].episode + "<br>",
        count: '',
        locations: ['']
      }
      //count origins
      let count = 0;
      for(let j=0; j<this.episodes[i].characters.length; j++){
        let currCharacter = this.characters.find(o => o.url === this.episodes[i].characters[j]);
        //register origin if it's not repeated
        if(currCharacter!=null && !origins.includes(currCharacter.origin.name + "<br>")){
          count++;
          origins.push(currCharacter.origin.name + "<br>");
        }
      }
      auxEpisode.count = count.toString() + "<br>";
      auxEpisode.locations = origins;
      results.push(auxEpisode);
    }
    let end = performance.now();
    let seconds = (end-start)/1000;
    let passedLimit = "False";
    if(seconds < 3){
      passedLimit = "True";
    }
    this.episodeLocationOutput =
    {
        exercise_name: "Episode locations<br>",
        time: seconds.toFixed(5)+" seconds<br>",
        in_time: passedLimit+"<br>",
        results: results
    }
    
    console.log(this.episodeLocationOutput);
    this.episodeLocationOutput = JSON.stringify(this.episodeLocationOutput);
    this.showEpisodeLocation = true;
  }

  dismissModals(){
    this.showCharCounter = false;
    this.showEpisodeLocation = false;
  }

}
