import React from 'react';
import styled from 'styled-components';

const Loader = () => {
    return (
        <StyledWrapper>
            <div className="card">
                <div className="loader">
                    <p>loading</p>
                    <div className="words">
                        <span className="word">buttons</span>
                        <span className="word">forms</span>
                        <span className="word">switches</span>
                        <span className="word">cards</span>
                        <span className="word">buttons</span>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    .card {
        --bg-color: #212121;
        background-color: var(--bg-color);
        padding: 1rem 2rem;
        border-radius: 1.25rem;
    }
    .loader {
        color: rgb(124, 124, 124);
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 25px;
        box-sizing: content-box;
        height: 40px;
        padding: 10px 10px;
        display: flex;
        border-radius: 8px;
    }

    .words {
        overflow: hidden;
        position: relative;
    }
    .words::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            var(--bg-color) 10%,
            transparent 30%,
            transparent 70%,
            var(--bg-color) 90%
        );
        z-index: 20;
    }

    .word {
        display: block;
        height: 100%;
        padding-left: 6px;
        color: #956afa;
        animation: spin_4991 4s infinite;
    }

    @keyframes spin_4991 {
        10% {
            transform: translateY(-102%);
        }

        25% {
            transform: translateY(-100%);
        }

        35% {
            transform: translateY(-202%);
        }

        50% {
            transform: translateY(-200%);
        }

        60% {
            transform: translateY(-302%);
        }

        75% {
            transform: translateY(-300%);
        }

        85% {
            transform: translateY(-402%);
        }

        100% {
            transform: translateY(-400%);
        }
    }
`;

export default Loader;
