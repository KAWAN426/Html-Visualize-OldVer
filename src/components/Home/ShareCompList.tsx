import styled from 'styled-components';
import { ReactComponent as SvgPlus } from "../../icons/plus.svg";
import { ReactComponent as SvgGoogleIcon } from "../../icons/googleIcon.svg";
import { API } from 'aws-amplify';
import { listHvData } from '../../graphql/queries';
import { useEffect, useState } from 'react';
import { IHvData, IUser } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { createHvData } from '../../graphql/mutations';
import { getCurrentUser, loginGoogle } from '../../firebase/auth';
const leftBarSize = "233px";

const ShareCompList = ({ user }: { user: IUser | null }) => {
  const iconStyles = { width: 28, height: 28, fill: "#676767" };
  const [hvList, setHvList] = useState<IHvData[] | null>(JSON.parse(sessionStorage.getItem("hvList") || JSON.stringify(null)));
  const navigate = useNavigate();

  const getRandomId = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let id = '';
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * chars.length);
      id += chars.substring(randomNum, randomNum + 1);
    }
    return id;
  }
  const getHvDataList = async () => {
    const user = getCurrentUser();
    sessionStorage.setItem("hvList", JSON.stringify(null));
    if (user) {
      const { data } = await API.graphql({
        query: listHvData,
        variables: {
          filter: { author: { eq: user.id } }
        }
      }) as { data: { listHvData: { items: IHvData[] } } };
      const result = data.listHvData.items;
      result.forEach((hv) => {
        hv.html = String(hv.html.replace(/\\/g, "").replace(/<br>/g, "")).replace(/contenteditable="true"/g, "");
        sessionStorage.setItem(String(hv.id), JSON.stringify(hv));
      });
      setHvList(result);
      sessionStorage.setItem("hvList", JSON.stringify(result));
    } else setHvList(null);
  }
  const tempHtml = `<div class=\"App\" style=\"width: 100%; height: 100%; overflow: auto; display: block; background-color: white;\" id=\"view\"></div>`;
  const addHv = async () => {
    if (window.confirm("새 프로젝트를 생성 하시겠습니까?")) {
      if (!navigator.onLine) {
        alert("오프라인 상태입니다.");
        return;
      };
      const user = getCurrentUser();
      if (user) {
        const result = await API.graphql({
          query: createHvData,
          variables: {
            input: {
              id: getRandomId(),
              html: tempHtml,
              title: "New Hv Project",
              author: user.id
            }
          }
        }) as { data: { createHvData: IHvData | null } };
        const data = result.data.createHvData;
        if (data) {
          getHvDataList();
          navigate(`/hv/${data.id}`);
        } else alert("오류! 프로젝트 생성 실패!");
      } else alert("로그인이 되어있지 않습니다.");
    }
  }
  const changeHvListZoom = () => {
    hvList?.forEach((hv) => {
      const width = document.getElementById(hv.id + "cont")?.offsetWidth;
      const preview = document.getElementById(String(hv.id));
      if (preview && width) {
        const scale = width / 360 / 3.3;
        preview.style.transform = `scale(${scale})`;
      }
    });
  }

  useEffect(() => {
    getHvDataList();
  }, [user])

  useEffect(() => {
    changeHvListZoom();
    window.addEventListener("resize", changeHvListZoom);
  }, [hvList])

  return (
    <Container>

    </Container>
  )
}

const Container = styled.div`
  display:flex;
  flex-wrap:wrap;
  width:100%;
  height:100%;
  padding-bottom: 24px;
  background-color: initial;
  margin-top: 52px;
  margin-left: ${leftBarSize};
  @media screen and (max-width: 600px) {
    margin-left: 70px;
  }
`

export default ShareCompList;