import { PostersGrid } from "../components/PostersGrid";

type HomeProps = {
  navigateTo: (path: string) => void;
};

export const Home = ({ navigateTo }: HomeProps) => {
  return (
    <div className="home">
      <PostersGrid navigateTo={navigateTo} />
    </div>
  );
};
