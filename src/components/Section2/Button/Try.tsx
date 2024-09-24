import React from "react";
import styled from "styled-components";

const Try: React.FC = () => {
  return (
    <StyledWrapper>
      <button className="signupBtn">
        Try Now!
        <span className="arrow">
          <svg
            fill="rgb(183, 128, 255)"
            viewBox="0 0 320 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .signupBtn {
    width: 120px;
    height: 40px;
    border-radius: 30px;
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 13px;
    gap: 9px;
    color: white;
    background-color: black;
    position: relative;
    cursor: pointer;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.212);
    font-weight: 600;
  }

  .arrow {
    position: absolute;
    right: 7.5px;
    background-color: rgb(255, 255, 255);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    transition: all 0.5s ease;
  }

  .signupBtn:hover .arrow {
    width: calc(120px - 7.5px * 2);
  }
`;

export default Try;
