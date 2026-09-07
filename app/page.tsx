import AnnouncementBar from "./components/AnnouncementBar";
import BestSellers from "./components/BestSellers";
import CartToast from "./components/CartToast";
import Categories from "./components/Categories";
import Hero from "./components/Hero";
import NewArrivals from "./components/NewArrivals";
import PromoDuo from "./components/PromoDuo";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import TrustBar from "./components/TrustBar";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Categories />
        <NewArrivals />
        <BestSellers />
        <PromoDuo />
      </main>
      <SiteFooter />
      <CartToast />
    </>
  );
}
