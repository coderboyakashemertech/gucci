import { Banner } from "../components/Banner";

export function Home() {
  return (
    <main className="page">
      <Banner title="BEAUTY" image="/images/beauty.jpg" video />
      <Banner title="FASHION" image="/images/fashion.jpg" />
      <Banner title={"LIFESTYLE\nGOODS"} image="/images/lifestyle.jpg" />
      <Banner title="E-SHOP" image="/images/eshop.jpg" to="/eshop" shop />
      <Banner title="RESERVATION" image="/images/reservation.jpg" />
    </main>
  );
}
