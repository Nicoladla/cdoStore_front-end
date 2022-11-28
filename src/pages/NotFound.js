import styled from "styled-components";
import notFound from "../assets/images/NotFound.jpg";

export default function NotFound() {
  return (
    <ScreenNotFound>
      <img src={notFound} alt="notFound" />
    </ScreenNotFound>
  );
}

const ScreenNotFound = styled.div`
  background-color: #f6a92e;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
