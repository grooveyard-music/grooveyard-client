import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { SpotifyTrack } from '..';
import { useDebounce } from "@uidotdev/usehooks";

const useSpotifySearch = (searchTerm: string): { tracks: SpotifyTrack[], loading: boolean, error: string | null } => {
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 1000); 
    
    const fetchSpotifyData = async (term: string) => {
        if (!term) {
            setTracks([]);
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const accessToken = await getSpotifyAccessToken();
            if (!accessToken) {
                setError('Failed to get access token');
                return;
            }

            const response = await axios.get('https://api.spotify.com/v1/search', {
                params: {
                    q: term,
                    type: 'track',
                    limit: 5
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            const fetchedTracks = response.data.tracks.items.map((track: any) => ({
                id: track.id,
                name: track.name,
                artist: track.artists.map((artist: any) => artist.name).join(', '),
                uri: track.uri,
                host: 0,
                DurationInMilliseconds: track.duration_ms,
                type: "song"
            }))
            .filter((track: { id: any; }, index: any, self: any[]) =>
            index === self.findIndex((t) => t.id === track.id)
        );

            setTracks(fetchedTracks);
        } catch (error) {
            console.error('Error searching Spotify tracks:', error);
            setError('Error fetching tracks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSpotifyData(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    return { tracks, loading, error };
};

const getSpotifyAccessToken = async () => {
    const cachedToken = localStorage.getItem('spotifyAccessToken');
    const tokenExpiry = localStorage.getItem('spotifyTokenExpiry');

    // Check if token has expired
    if (cachedToken && tokenExpiry && new Date(tokenExpiry) > new Date()) {
        return cachedToken;
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const clientId = 'ebc00964bf984155b7801bc86d8302ac';
    const clientSecret = 'd331a5f0a9b24b67878736aa2d6b918f';
    const credentials = btoa(`${clientId}:${clientSecret}`);

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        const { access_token, expires_in } = response.data;

        // Calculate the exact time when the token will expire
        const expiryTime = new Date(new Date().getTime() + expires_in * 1000);

        localStorage.setItem('spotifyAccessToken', access_token);
        localStorage.setItem('spotifyTokenExpiry', expiryTime.toISOString());

        return access_token;
    } catch (error) {
        console.error('Error fetching Spotify access token:', error);
        return null;
    }
};



export default useSpotifySearch;
