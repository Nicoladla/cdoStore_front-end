import styled from "styled-components";
import { ColorRing } from "react-loader-spinner";

export default function LoadingDiv({ isLoading, color, height }) {
  return (
    <Div>
      <ColorRing
        visible={isLoading}
        height={height}
        width="65"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={[color, color, color, color, color, color]}
      />
    </Div>
  );
}

const Div = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
