'use server'
import querystring from 'querystring'
import type {
    TrackSpotify,
    FilteredSpotifyTrack,
    ResponseUserPlaylist,
    ResponsePlaylistById,
} from '@/app/interfaces'

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN
const userId = process.env.NEXT_PUBLIC_SPOTIFY_USER_ID

let token: string | null = null
let lastConnectionToken = 0

const getAccessToken = async () => {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    })
    const spotifyToken = await response.json()
    if (spotifyToken) {
        token = spotifyToken.access_token
        lastConnectionToken = Date.now()
    }
    return spotifyToken
}

const verifyToken = async () => {
    const timeStamp = Date.now()
    if (token && lastConnectionToken - timeStamp > 0) return true
    else await getAccessToken()
    return true
}

const fetchSpotify = async (url: string) => {
    await verifyToken()
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const response = await res.json()
    return response
}

const parseSpotifyTrack = (track: TrackSpotify): FilteredSpotifyTrack => {
    const filteredTrack = {} as FilteredSpotifyTrack
    filteredTrack.uri = track.uri
    filteredTrack.id = track.id
    filteredTrack.href = track.href
    filteredTrack.title = track.name
    filteredTrack.popularity = track.popularity
    filteredTrack.artist = track.artists[0]?.name
    filteredTrack.title = track.name
    filteredTrack.image = track.album.images[1]
    return filteredTrack
}
// EXPORT FONCTION ****************************************************************
export const getTrackById = async (
    id: string
): Promise<FilteredSpotifyTrack> => {
    const url = `https://api.spotify.com/v1/tracks/${id}`
    const response = (await fetchSpotify(url)) as TrackSpotify
    const filteredTrack = parseSpotifyTrack(response)
    return filteredTrack
}

export const getUserPlaylist = async (): Promise<ResponseUserPlaylist> => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`
    const response = (await fetchSpotify(url)) as ResponseUserPlaylist
    return response
}

export const getPlaylistById = async (
    id: string
): Promise<ResponsePlaylistById> => {
    const url = `https://api.spotify.com/v1/playlists/${id}`
    const response = (await fetchSpotify(url)) as ResponsePlaylistById
    return response
}
