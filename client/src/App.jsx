import { Suspense, useState } from "react";
import "./App.css";
import Website from "./pages/Website";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Property } from "./pages/Property/Property";
import Draft from "./pages/Draft/Draft";
import UserDetailContext from "./context/UserDetailsContext";
import Register from "./auth/Register";
import Login from "./auth/Login";
import OwnerRegister from "./auth/OwnerRegister";
import OwnerLogin from "./auth/OwnerLogin";
import { DraftId } from "./pages/DraftId/DraftId";
import AgentDraft from "./pages/AgentDraft/AgentDraft";
import { AgentDraftId } from "./pages/AgentDraftId/AgentDraftId";
import UserLogin from "./components/Login";
import ProfilePageOAU from "./components/ProfilePageOAU";
import NotFound from "./components/NotFound";
import OwnerTrackDraft from "./pages/OwnerTrackDraft/OwnerTrackDraft";
import { OwnerTrackDraftId } from "./pages/OwnerTrackDraftId/OwnerTrackDraftId";
import UserFav from "./pages/UserFav/UserFav";
import Bookings from "./pages/Bookings/Bookings";
import Favorites from "./pages/favourites/Favourites";
import { AgentPublishedId } from "./pages/AgentPublishedId/AgentPublishedId";
import GenArchieve from "./pages/GenArchieve/GenArchieve";
import AgentArchieve from "./pages/AgentArchieve/AgentArchieve";
import { GenArchieveId } from "./pages/GenArchieveId/GenArchieveId";
import { AgentArchieveId } from "./pages/AgentArchieveId/AgentArchieveId";
import Dashboard from "./components/admin/MainContent";
import { AgentProfile } from "./components/admin/AgentProfile";
import { OwnerProfile } from "./components/admin/OwnerProfile";
import { AdminAgentPubId } from "./pages/adminAgentPubId/adminAgentPubId";
import { AdminAgentDraftId } from "./pages/adminAgentDraftId/adminAgentDraftId";
import { AdminOwnerTrackDraftId } from "./pages/adminOwnerTrackDraftId/OwnerTrackDraftId";
import SearchBar from "./components/GoogleAddressSearch";
// import { AdminAgentArchieveId } from "./pages/adminAgentArchieveId/adminAgentArchieveId";
import Advertise from "./components/Advertise";
import Buy from "./components/Buy";
import Rent from "./components/Rent";
import NewListing from "./components/NewListing";
import DiscountListing from "./components/DiscountListing";
import UpdateListing from "./components/updateListing";
import RentListing from "./components/RentListing";
import SaleListing from "./components/SaleListing";
import LandListing from "./components/LandListing";
import CommercialListing from "./components/CommercialListing";
//  import   from "./admin/adminlogin";
import { BookId } from "./pages/BookId/Bookid";
import Likes from "./pages/Likes/Likes";
import { LikeId } from "./pages/LikesId/LikesId";
import ResProfile from "./components/admin/ResProfile";
import AdminLogin from "./pages/admin/adminlogin";
import Home from "./pages/Home";
  function App() {
  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  // Get the user's role from localStorage
  const role = localStorage.getItem("role");
 
  
 

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            <Route path="*" element={<NotFound />} />

              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/home" element={<Home />} />


                {/* Common properties route for all roles */}
                <Route path="/properties" element={<Properties />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/rent" element={<Rent />} />
                <Route path="/advertise" element={<Advertise />} />
                <Route path="/" element={<SearchBar />} />
               <Route path="/archieve" element={<GenArchieve />} />
                <Route path="/agentarchieve" element={<AgentArchieve />} />
                <Route path="/new-listings" element={<NewListing />} />
                <Route path="/discount-listings" element={<DiscountListing />} />
                <Route path="/update-listings" element={<UpdateListing />} />
                <Route path="/rent-listings" element={<RentListing />} />
                <Route path="/sale-listings" element={<SaleListing />} />
                <Route path="/land-listings" element={<LandListing />} />
                <Route path="/commercial-listings" element={<CommercialListing />} />
                <Route path="/adminlogin" element={<AdminLogin />}   />

                {/* Role-based Protected Routes */}
                {role === "user" && (
                  <>
                    <Route path="/userlogin" element={<UserLogin />} />
                    <Route path="/favorites" element={<UserFav />} />
                    <Route path="/profile" element={<ProfilePageOAU />} />
                    <Route path="*" element={<NotFound />} />
                  </>
                )}

                    
                {role === "admin" && (
                  <>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/draft" element={<Draft />} />
                    <Route path="*" element={<NotFound />} />


                   </>
                )}
                {role === "agent" && (
                  <>
                    <Route path="/profile" element={<ProfilePageOAU />} />
                    <Route path="/draft" element={<Draft />} />
                    <Route path="/agent/draft" element={<AgentDraft />} />
                    <Route path="*" element={<NotFound />} />
                  </>
                )}
                {role === "owner" && (
                  <>
                    <Route path="/profile" element={<ProfilePageOAU />} />
                    <Route path="/draft" element={<Draft />} />
                    <Route path="/track-property" element={<OwnerTrackDraft />} />
                    <Route path="*" element={<NotFound />} />
                  </>
                )}

                {/* Routes for Registration and Login */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/owner/register" element={<OwnerRegister />} />
                <Route path="/owner/login" element={<OwnerLogin />} />

                {/* Nested Routes */}
                <Route path="/properties/:propertyId" element={<Property />} />
                <Route path="/agents/:id" element={<AgentProfile />} />
                <Route path="/owners/:id" element={<OwnerProfile />} />
                <Route path="/archieve/:archieve" element={<GenArchieveId />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/bookings/:bookingsId" element={<BookId />} />
                <Route path="/likes" element={<Likes />} />
                <Route path="/likes/:likeId" element={<LikeId />} />
                <Route path="/agentarchieve/:agentarchieve" element={<AgentArchieveId />} />
                <Route path="/AdminAgentPubId/:AdminAgentPubId" element={<AdminAgentPubId />} />
                <Route path="/AdminAgentAchieveId/:AdminAgentAchieveId" element={<AdminAgentPubId />} />
                <Route path="/residencies/:id" element={<ResProfile/>} />
                <Route path="/AdminAgentDraftId/:AdminAgentDraftId" element={<AdminAgentDraftId />} />
                 <Route path="/OwnerCreatedId/:OwnerCreatedId" element={<AdminOwnerTrackDraftId />} />
                <Route path="/favourites" element={<Favorites />} />
                <Route path="/track-property/:OwnerTrackId" element={<OwnerTrackDraftId />} />
                <Route path="/AgentPublished/:AgentPublished" element={<AgentPublishedId />} />
                <Route path="/draft/:DraftId" element={<DraftId />} />
                <Route path="/agent/draft/:AgentDraftId" element={<AgentDraftId />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
