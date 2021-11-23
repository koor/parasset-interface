//@ts-nocheck
import React, { useMemo } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Right from "./Right";
import Spacer from "../../Spacer";
const Main: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const isDatumPath = useMemo(() => {
    return pathname.includes("/datum");
    // return false
  }, [pathname]);

  return (
    <StyledMain className="" isDatumPath={isDatumPath}>
      <div className="">
        {/* <Header /> */}
        <StyledWrapBox isDatumPath={isDatumPath}>
          {children}
        </StyledWrapBox>
      </div>
      {/* {!isDatumPath ? <Right isDatumPath={isDatumPath}/> : null} */}
      <Right isDatumPath={isDatumPath}/>
    </StyledMain>
  );
};
const StyledMain = styled.div`
  
`;
const StyledWrapBox = styled.div`
  
`;
export default Main;
