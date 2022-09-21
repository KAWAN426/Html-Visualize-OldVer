import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHvData } from "../graphql/queries";
import { API } from 'aws-amplify';
import { IHvData } from '../types';
import HvResult from "../components/HvResult";
import StyleSet from "../components/StyleSet";
import LeftSideBar from "../components/LeftSideBar";
import NavBar from "../components/NavBar";
import HvView from "../components/HvView";

const HvDevelop = () => {
  const hvId = useParams().id || JSON.parse(sessionStorage.getItem("hvId") || JSON.stringify(null));
  const [hvData, setHvData] = useState<IHvData | null>(null);

  const getHvDataFromAmplify = async () => {
    const { data } = await API.graphql({
      query: getHvData,
      variables: {
        id: hvId
      }
    }) as { data: { getHvData: IHvData | null } };
    const result: IHvData | null = data.getHvData;
    if (result !== null) result.html = String(result.html.replace(/\\/g, "").replace(/<br>/g, ""));
    setHvData(result);
  }

  useEffect(() => {
    sessionStorage.removeItem(hvId + "selectComp");
    getHvDataFromAmplify();
  }, [])

  if (hvData) {
    return (
      <>
        <HvResult />
        <NavBar />
        <Container>
          <LeftSideBar hvData={hvData} />
          <HvView hvData={hvData} />
          <StyleSet hvData={hvData} />
        </Container>
      </>
    )
  } else {
    return (
      <div>
        존재하지 않는 페이지 입니다.
      </div>
    )
  }
}

const Container = styled.div`
  width:100%;
  min-height:100%;
  display:flex;
`

export default HvDevelop;