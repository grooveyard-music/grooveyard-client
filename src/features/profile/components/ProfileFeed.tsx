import { Tabs } from '@mantine/core'
import React from 'react'
import {Si1001Tracklists} from 'react-icons/si'
import {BsMusicNoteBeamed} from 'react-icons/bs'
import { useQuery } from 'react-query'
import { fetchUserProfileFeed } from '..'
import {  MixCard, SongCard } from '../../upload'



type ProfileViewProps = {
  userId: string;
}
export const ProfileFeed: React.FC<ProfileViewProps> = (userId) => {

  const { data: userFeed } = useQuery(["fetchUserProfileFeed", userId.userId], () => fetchUserProfileFeed(userId.userId), {
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // data stays in the cache for 30 minutes
  });
  
  console.log(userFeed);
  return (

<div className="min-h-fit text-center  ">
<Tabs color="gray" variant="pills" radius="lg" defaultValue="song" >
    <Tabs.List>
      <Tabs.Tab value="song" icon={<BsMusicNoteBeamed  />}>Music box</Tabs.Tab>
      <Tabs.Tab value="tracklist" icon={<Si1001Tracklists />}>Tracklists</Tabs.Tab>
    </Tabs.List>
      <Tabs.Panel value="tracklist" pt="xs">
      {userFeed?.tracklists?.length ? (
          userFeed.tracklists.map((tracklist) => (
            <div key={tracklist.id}>
              <h3>{tracklist.name}</h3>
              <p>{tracklist.status}</p>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center mt-40"> 
          <div>
            <p>No tracklists available</p>
            <button className="inline-flex mt-4 items-center justify-center w-full px-8 py-2 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">Create one</button>
          </div>
        </div>
        )}
      </Tabs.Panel>
      <Tabs.Panel value="song" pt="xs">
          {userFeed?.tracks?.length ? (
            userFeed.tracks.map((track) => (
              track.type === "song" ? (
                <SongCard 
                key={track.id}
                title={track.song?.title || 'Default Title'}
                artist={track.song?.artist || 'Default Artist'}
                urlPath={track.song?.urlPath || 'Default URL'}
                genres={track.song?.genres || []}
                host={track.song?.host || 'Default Host'}
                />
              ) : (
                <MixCard 
                key={track.id}
                title={track.song?.title || 'Default Title'}
                artist={track.song?.artist || 'Default Artist'}
                urlPath={track.song?.urlPath || 'Default URL'}
                genres={track.song?.genres || []}
                host={track.song?.host || 'Default Host'}
                />
              )
            ))
          ) : (
            <div className="flex-1 flex items-center justify-center mt-40"> 
              <div>
                <p>Nothing has been added yet.</p>
                {/* Your button for creating new content */}
              </div>
            </div>
          )}
        </Tabs.Panel>
    </Tabs>
    </div>

  )
}

