
import { ProfilePage } from "./features/profile";
import HomePage from "./features/home/pages/HomePage";
import { CreatePostPage, PostDetailPage, PostListPage } from "./features/posts";
import { CreateDiscussionPage, DiscussionListPage } from "./features/discussions";
import { Footer, Navbar } from "./features/common";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUser } from "./features/auth/hooks/useUser";
import useAuthStore from "./state/useAuthStore";
import { AuthModal } from "./features/auth/components/AuthModal";
import { UploadTrackModal } from "./features/upload";
import { SettingsPage } from "./features/settings/pages/SettingsPage";
import {AccountSettings} from './features/settings/components/AccountSettings'; // Assume these components
import {IntegrationSettings} from './features/settings/components/IntegrationSettings';
import { NotificationSettings } from "./features/settings/components/NotificationSettings";
import { CreatePlaylistModal } from "./features/upload/components/CreatePlaylistModal.tsx";
import { TracklistPage } from "./features/tracklist/pages/TracklistPage.tsx";


const Routing: React.FC = () => {

  useUser();
  const store = useAuthStore();
  return (
    <BrowserRouter>
      <Navbar/> 
      <Routes>

        <Route path="/" element= {<HomePage />}/>
        <Route path="/dashboard" element={store.isAuthenticated ? <DiscussionListPage /> : <HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />}/>
        <Route path="/settings" element={<SettingsPage />}>
          <Route index element={<AccountSettings />} /> 
          <Route path="account" element={<AccountSettings />} />
          <Route path="integration" element={<IntegrationSettings />} />
          <Route path="notifications" element={<NotificationSettings />} />
        </Route>
        <Route path="/discussion/:discussionId" element={<PostListPage/>} />
        <Route path="/post/:postId" element={<PostDetailPage/>} />
        <Route path="/creatediscussion" element={<CreateDiscussionPage/>} />
        <Route path="/createpost/:discussionId" element={<CreatePostPage />} />
        <Route path="/tracklist/" element={<TracklistPage />} />
      </Routes>
      <AuthModal />
      <UploadTrackModal />
      <CreatePlaylistModal/>
      <Footer/>
    </BrowserRouter>
  );
}

export default Routing;
