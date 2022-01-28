import React from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import CustomDialog from "./CustomDialog";

const fadeInContent = keyframes`
from {
    opacity: 0;
}
  
to {
    opacity: 1;
}
`;

const Wrapper = styled.main`
  position: relative;
  width: 100%;
  max-width: var(--main-width);
  background-color: var(--color-dark);
  border-radius: 1.25rem;
  padding: 3.125rem 0;
  text-align: center;
  overflow: hidden;
  animation: ${fadeInContent} 1000ms ease-in-out;
  transition: nonr 500ms ease-in-out;
  transition-property: opacity, visibility;
  .button-next {
    background-color: rgb(239, 137, 95);
    border-radius: 0.625rem;
    padding: 0.8125rem 2.25rem;
    font-size: 1.15rem;
    margin: 1.25rem 0;
  }
`;

const SlidesArea = styled.section`
  display: flex;
  transition: margin 500ms ease-in-out;
`;

const SlideArea = styled.article`
  width: 100%;
  .slide__image {
    width: 90%;
  }
  .slide__text {
    padding: 0 2.1875rem;
    .slide__title {
      font-size: min(10vw, 1.75rem);
      font-weight: 600;
      margin: 0;
    }
    .slide__paragraph {
      font-size: 0.875rem;
      font-weight: 100;
      margin-top: 0.3125rem;
    }
  }
`;

const stepOnboarding = [
  {
    img: "https://c.top4top.io/p_2020eq9aa1.png",
    title: "Boost Productivity",
    text: "Foc.io helps you boost your productivity on a differnet level",
  },
  {
    img: "https://e.top4top.io/p_2020mx8xt3.png",
    title: "Work Seamlessly",
    text: "Get your work done seamlessly without interruption",
  },
  {
    img: "https://d.top4top.io/p_20200jsuo2.png",
    title: "Achieve Higher Goals",
    text: "By boosting your producivity we help you achieve higher goals",
  },
];

const CustomOnboarding = (props) => {
  return (
    <CustomDialog isVisibleDialog={true} onClose={() => {}}>
      <Wrapper id="wrapper">
        <SlidesArea id="slides-area">
          {stepOnboarding.map((row) => {
            return (
              <SlideArea>
                <img
                  src={row.img}
                  alt="illustration"
                  className="slide__image"
                />
                <div className="slide__text">
                  <h2 className="slide__title">{row.title}</h2>
                  <p className="slide__paragraph">{row.text}</p>
                </div>
              </SlideArea>
            );
          })}
        </SlidesArea>
        <button className="button button-next" aria-label="to get next slide">
          Next
        </button>
        <section className="paginations-area" />
      </Wrapper>
    </CustomDialog>
  );
};

export default CustomOnboarding;
