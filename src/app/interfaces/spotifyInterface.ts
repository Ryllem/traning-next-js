interface ImageSpotify {
    height: number
    url: string
    width: number
}

interface ArtistSpotify {
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface TrackSpotify {
    album: {
        album_type: string
        artists: ArtistSpotify[]
        href: string
        id: string
        images: ImageSpotify[]
        name: string
        release_date: string
        total_tracks: number
        type: string
        uri: string
    }
    artists: ArtistSpotify[]
    disc_number: number
    href: string
    id: string
    name: string
    popularity: number
    track_number: number
    type: string
    uri: string
}

export interface FilteredSpotifyTrack {
    uri: string
    id: string
    href: string
    title: string
    popularity: number
    artist: string
    image: ImageSpotify
}
interface ResponseUserPlaylistItems {
    collaborative: boolean
    description: string
    href: string
    id: string
    images: ImageSpotify[]
    name: string
    public: boolean
    tracks: {
        href: string
        total: number
    }
    type: string
    uri: string
}
export interface ResponseUserPlaylist {
    href: string
    items: ResponseUserPlaylistItems[]
    limit: number
    offset: number
    total: number
}

export interface ResponsePlaylistById {
    href: string
    id: string
    images: ImageSpotify[]
    name: string
    description: string
    type: string
    uri: string
    tracks: {
        limit: number
        href: string
        total: number
        items: [
            {
                added_at: string
                track: {
                    explicit: boolean
                    type: string
                    album: {
                        type: string
                        album_type: string
                        href: string
                        id: string
                        images: ImageSpotify[]
                        name: string
                        release_date: string
                        uri: string
                        artists: ArtistSpotify[]
                        total_tracks: number
                    }
                    artists: ArtistSpotify[]
                    track_number: number
                    href: string
                    id: string
                    name: string
                    popularity: number
                    uri: string
                }
            }
        ]
    }
}
