import React from "react";
import styled from "styled-components";

// import TopBar from "../TopBar";
import Main from "./components/Main";

const Page: React.FC = ({ children }) => (
  <StyledPage>
    {/* <TopBar /> */}
    <Main> {children}</Main>
  </StyledPage>
);

const StyledPage = styled.div`
 
`;



export default Page;
