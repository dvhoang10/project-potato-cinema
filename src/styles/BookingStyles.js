import styled from "styled-components";

export const BookingStyles = styled.div`
  h2.title {
    font-weight: 600;
    text-align: center;
    color: var(--color-red);
    font-size: 1.25rem;
    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
  div.center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow-dark);
    margin-bottom: 1rem;
    width: 200px;
  }
  h4 {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-light);
    @media (min-width: 1024px) {
      font-size: 1.5rem;
    }
  }
  p {
    text-align: center;
  }
  div.flex {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
      flex-direction: row;
    }
    div.count-down {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      min-width: 100px;
      div.flex-count {
        display: flex;
        user-select: none;
      }
    }
  }
  span.pending {
    display: inline-block;
    margin: 0.25rem;
    width: 35px;
    height: 35px;
    text-align: center;
    font-size: 18px;
    color: white;
    line-height: 35px;
    border-radius: 5px;
    background: var(--rgba-blue-magenta);
    box-shadow: var(--shadow-dark);
    border: var(--border);
  }
  section.screen {
    margin-top: 3rem;
    position: relative;
    width: 100%;
    z-index: -1;
    div.borderScreen {
      position: absolute;
      height: 120px;
      width: 110%;
      left: 50%;
      transform: translateX(-50%);
      border: solid 5px transparent;
      border-color: var(--color-red) transparent transparent transparent;
      border-radius: 50% 50% 0 0;
    }
    div.backgroundScreen {
      position: absolute;
      height: 120px;
      width: 110%;
      left: 50%;
      transform: translateX(-50%);
      border: solid 20px transparent;
      border-color: rgba(255, 87, 87, 0.2) transparent transparent transparent;
      border-radius: 100% 100% 0 0;
      p {
        text-align: center;
        margin-top: 10px;
        letter-spacing: 8px;
        font-weight: 600;
      }
    }
  }
  section.grid-seat {
    display: grid;
    grid-template-columns: repeat(16, minmax(0, 1fr));
    gap: 0.25rem;
    justify-items: center;
    padding-top: 100px;
    @media (min-width: 768px) {
      gap: 0.5rem;
    }
  }
  button.seat {
    width: calc((100vw - 2rem - 0.25rem * 15) / 16);
    height: calc((100vw - 2rem - 0.25rem * 15) / 16);
    cursor: pointer;
    border-radius: 0.25rem;
    background: var(--color-secondary);
    color: var(--color-light);
    border: 1px solid transparent;
    padding: 0;
    font-family: "Poppins", sans-serif;
    font-size: 0.5rem;
    svg {
      width: 0.75rem;
      height: 0.75rem;
    }
    @media (min-width: 768px) {
      width: calc((100vw - 2rem - 0.5rem * 15) / 16);
      height: calc((100vw - 2rem - 0.5rem * 15) / 16);
      font-size: 1rem;
      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
    @media (min-width: 1024px) {
      width: calc((100vw - 4rem - 0.5rem * 15 - 300px - 2rem) / 16);
      height: calc((100vw - 4rem - 0.5rem * 15 - 300px - 2rem) / 16);
      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    @media (min-width: 1440px) {
      width: calc((1440px - 4rem - 0.5rem * 15 - 450px - 2rem) / 16);
      height: calc((1440px - 4rem - 0.5rem * 15 - 450px - 2rem) / 16);
      svg {
        width: 1.75rem;
        height: 1.75rem;
      }
    }
  }
  button.vip {
    background: var(--color-red);
  }
  button.booked {
    display: flex;
    cursor: not-allowed;
    align-items: center;
    justify-content: center;
  }
  button.booked.other {
    background: var(--dark-gray);
  }
  button.booked.user {
    background: var(--dark-pink);
  }
  button.booking {
    background: var(--dark-blue);
  }
  section.grid {
    display: grid;
    grid-column-gap: 2rem;
    align-items: start;
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 300px;
    }
    @media (min-width: 1440px) {
      grid-template-columns: 1fr 450px;
    }
  }
  section.side-bar {
    margin-top: 2rem;
    @media (min-width: 1024px) {
      margin-top: 0;
    }
    h4.cinema {
      color: var(--color-red);
    }
    p.showtime {
      font-style: italic;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
    div.side-bar-money {
      background: var(--color-red);
      height: 2.5rem;
      display: none;
      p {
        text-align: center;
        font-size: 1rem;
        font-weight: 700;
      }
      @media (min-width: 1024px) {
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          font-size: 1.5rem;
        }
      }
    }
    div.user-info {
      .form {
        font-family: "Poppins", sans-serif;
        label {
          width: 80px;
          font-size: 1rem !important;
          @media (min-width: 1024px) {
            font-size: 1.25rem !important;
          }
        }
        .ant-input[disabled] {
          color: var(--dark);
          background-color: var(--light);
        }
      }
    }
    div.seats {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      min-height: 2.5rem;
      span {
        font-size: 0.875rem;
        margin: 0;
      }
      @media (min-width: 1024px) {
        margin: 1rem 0;
      }
    }
    button.get-ticket {
      margin-top: 0.5rem;
      font-size: 1.5rem;
      text-align: center;
      border-radius: 0.375rem;
      padding: 0.5rem 0;
      width: 100%;
      cursor: pointer;
      background: var(--color-red);
      color: var(--light);
      border: 1px solid transparent;
      display: none;
      @media (min-width: 1024px) {
        display: block;
      }
    }
  }
  section.seat-type {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    div.item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.5rem 0.5rem 0;
      span {
        margin-left: 0.5rem;
      }
    }
  }
  section.fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
    width: 100%;
    height: 4rem;
    @media (min-width: 1024px) {
      display: none;
    }
    div.get-ticket-flex {
      display: flex;
      height: 100%;
    }
    div.money {
      width: 50%;
      height: 100%;
      background: #715d70ed;
      backdrop-filter: blur(8px);
      p {
        font-weight: 600;
        font-size: 1.25rem;
      }
    }
    div.get-ticket {
      width: 50%;
      height: 100%;
      background: var(--color-red);
      button {
        color: var(--light);
        background: transparent;
        border: 1px solid transparent;
        width: 100%;
        height: 100%;
        cursor: pointer;
        font-size: 1.25rem;
      }
    }
  }
`;
