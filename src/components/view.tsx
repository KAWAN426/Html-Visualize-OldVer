import { createElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../zustant'

const View = () => {
  const [isAddEvent, setIsAddEvent] = useState(false);
  const { selectedComp }: { selectedComp: HTMLElement } = useStore();
  let mouseoverComp = document.body;
  let clickedComp = selectedComp;
  let copyComp:HTMLElement;

  const copyEvent = (e:KeyboardEvent) => {
    if(clickedComp.className === "viewComp"){
      if (e.key === 'c' && e.ctrlKey) {
        copyComp = clickedComp;
      } else if (e.key === 'v' && e.ctrlKey) {
        const cloneComp = copyComp.cloneNode() as HTMLElement;
        cloneComp.style.boxShadow = "";
        copyComp.parentElement?.append(cloneComp);
      }
    }
  }
  const viewMouseoverEvent = (e:MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target !== clickedComp) {
      if(mouseoverComp !== clickedComp){
        mouseoverComp.style.boxShadow = "";
      }
      target.style.boxShadow = "inset 0px 0px 0px 3px #8bccfb";
      mouseoverComp = target;
    }
  }
  const viewClickEvent = (e:MouseEvent) => {
    const target = e.target as HTMLElement;
    clickedComp.style.boxShadow = "";
    target.style.boxShadow = "inset 0px 0px 0px 3px #0D99FF";
    clickedComp = target;
    useStore.setState({ selectedComp: clickedComp });
  }
  const viewBackgroundClickEvent = () => {
    mouseoverComp.style.boxShadow = "";
    clickedComp.style.boxShadow = "";
    clickedComp = document.body;
  }
  const viewBackgroundMouseoverEvent = () => {
    if (mouseoverComp !== clickedComp) {
      mouseoverComp.style.boxShadow = "";
    }
  }
  
  useEffect(() => {
    if (!isAddEvent) {
      setIsAddEvent(true);
      document.body.addEventListener('keydown',copyEvent);
      document.getElementById('view')?.addEventListener("mouseover", viewMouseoverEvent)
      document.getElementById('view')?.addEventListener("click", viewClickEvent)
      document.getElementById('viewBackground')?.addEventListener("click", viewBackgroundClickEvent)
      document.getElementById('viewBackground')?.addEventListener("mouseover", viewBackgroundMouseoverEvent)
    }
  }, [])

  return (
    <Container>
      <div style={{ width: "100%", height: "100%" }} id='view' />
    </Container>
  )
}

const Container = styled.div`
  width:395px;
  height:720px;
  background-color: white;
  border-radius: 8px;
  z-index: 2;
  overflow: auto;
  &::-webkit-scrollbar{
    width:8px;
    background-color: initial;
  }
  &::-webkit-scrollbar-thumb{
    width: 8px;
    background-color: rgba(54,54,54,0.4);
    border-radius: 100px;
  }
`

export default View