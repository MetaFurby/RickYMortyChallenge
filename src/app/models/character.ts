export interface Character {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: CharacterLocation,
    location: CharacterLocation,
    episode: string[],
    url: string,
    created: Date
}

export interface CharacterLocation{
    name: string,
    url: string
}
