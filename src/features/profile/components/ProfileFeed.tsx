import { Tabs } from '@mantine/core'
import React from 'react'
import { BsDisc} from 'react-icons/bs'
import {Si1001Tracklists} from 'react-icons/si'
import {BsMusicNoteBeamed} from 'react-icons/bs'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { fetchUserProfileFeed } from '..'
import { MixCard, SongCard } from '../../upload'



type ProfileViewProps = {
  userId: string;
}
export const ProfileFeed: React.FC<ProfileViewProps> = (userId) => {

  const { data: userFeed } = useQuery(["fetchUserProfileFeed", userId.userId], () => fetchUserProfileFeed(userId.userId), {
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // data stays in the cache for 30 minutes
  });
  
  return (

<div className="min-h-fit text-center  ">
<Tabs color="gray" variant="pills" radius="lg" defaultValue="song" >
      <Tabs.List>
      <Tabs.Tab value="song" icon={<BsMusicNoteBeamed  />}>Songs</Tabs.Tab>
      <Tabs.Tab value="mix" icon={<BsDisc  />}>Mixes</Tabs.Tab>
      <Tabs.Tab value="tracklist" icon={<Si1001Tracklists />}>Tracklists</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="mix" pt="xs">
      {userFeed?.mixes?.length ? (
          userFeed.mixes.map((mix) => (
            <MixCard 
              key={mix.id}
              title={mix.title}
              artist={mix.artist}
              urlPath={mix.urlPath}
              genres={mix.genres} 
              host={mix.host}            />
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center mt-40"> 
          <div>
            <p>No mixes available</p>
            <Link to="/creationhub" className="btn btn-primary mt-4">
            <button className="inline-flex mt-4 items-center justify-center w-full px-8 py-2 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">Create one</button>
            </Link>
          </div>
        </div>
        )}
      </Tabs.Panel>

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
      {userFeed?.songs?.length ? (
          userFeed.songs.map((song) => (
            <SongCard 
            key={song.id}
            title={song.title}
            artist={song.artist}
            urlPath={song.urlPath}
            genres={song.genres} 
            host={song.host}            />
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center mt-40"> 
          <div>
            <p>No songs available</p>
            <button className="inline-flex mt-4 items-center justify-center w-full px-8 py-2 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
              Create one
              </button>
          </div>
        </div>
        )}
      </Tabs.Panel>
    </Tabs>
    </div>

  )
}

