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
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 30, 
  });

  return (

<div className="min-h-fit text-center  ">
<Tabs color="gray" variant="pills" radius="lg" defaultValue="song" >
    <Tabs.List>
      <Tabs.Tab value="song" leftSection={<BsMusicNoteBeamed  />}>Music box</Tabs.Tab>
      <Tabs.Tab value="tracklist" leftSection={<Si1001Tracklists />}>Tracklists</Tabs.Tab>
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
    track.songs?.length > 0 ? (
      <SongCard 
        key={track.id}
        songs={track.songs || []} 
      />
    ) : (
      track.mixes?.length > 0 ? (
        <MixCard 
          key={track.id}
          mixes={track.mixes || []}
        />
      ) : null
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

