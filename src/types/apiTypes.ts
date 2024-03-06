export interface PokemonType {
    name: string;
    url: string;
}

export interface AllPokemonLResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonType[];
}

export interface PostType {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export type PostResponse = PostType[]





export interface NoteType {
    _id: string;
    user: string
    title: string;
    description: string;
    tags: string[];
    date: string;
    __v?: number;
}

export interface UpdateNoteType {
    note: NoteType;
}

export type NoteResponse = NoteType[]

export interface NoteBody {
    title: string;
    description?: string;
    tags?: string[];
}