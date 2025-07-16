import { PipelineToolbar } from "../../components/PipelineToolbar/PipeLineToolbar";
import { PipelineUI } from "../../ui";
import { Header } from "../../shared/components/Header/Header";
import { Logo } from "../../shared/components/Logo/Logo";

export const Home = () => {
  return (
    <div>
      <Header>
        <>
          <Logo />
          <PipelineToolbar />
        </>
      </Header>

      <PipelineUI />
    </div>
  );
};
