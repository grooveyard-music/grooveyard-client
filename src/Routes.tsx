
import { ProfilePage } from "./features/profile";
import { UploadHubPage } from "./features/upload";
import HomePage from "./pages/HomePage";
import { CreatePostPage, PostDetailPage, PostListPage } from "./features/posts";
import { CreateDiscussionPage, DiscussionListPage } from "./features/discussions";
import { Footer, Navbar } from "./features/common";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUser } from "./features/auth/hooks/useUser";
import useAuthStore from "./state/useAuthStore";
import { AuthModal } from "./features/auth/components/AuthModal";



const Routing: React.FC = () => {

  useUser();
  const store = useAuthStore();
  return (
    <BrowserRouter>
      <Navbar/> 
      <Routes>
        <Route path="/" element={store.isAuthenticated ? <DiscussionListPage /> : <HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />}/>
        <Route path="/discussion/:discussionId" element={<PostListPage/>} />
        <Route path="/post/:postId" element={<PostDetailPage/>} />
        <Route path="/creatediscussion" element={<CreateDiscussionPage/>} />
        <Route path="/createpost/:discussionId" element={<CreatePostPage />} />
        <Route path="/upload" element={<UploadHubPage />} />
      </Routes>
      <AuthModal />
      <Footer/>
    </BrowserRouter>
  );
}

export default Routing;
