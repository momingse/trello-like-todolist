import styled, { css } from "styled-components";
import useScroll from "../hooks/useScroll";
import { useEffect } from "react";

const ColumnNavigatorContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.values.md}px) {
      display: none;
    }
  `}
`;

const ColumnNavigatorItem = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) =>
    props.index === props.currentColume
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
`;

const ColumnNavigator = (props) => {
  const { columnOrder, currentColume, handleChangeColumn, el } = props;
  const [scrollX, setScrollX] = useScroll(el);
  const childWidth = document.documentElement.clientWidth;

  const handleOnClick = (index) => {
    handleChangeColumn(index);
    setScrollX(index * childWidth);
  };

  return (
    <ColumnNavigatorContainer>
      {columnOrder.map((columnId, index) => {
        return (
          <ColumnNavigatorItem
            key={columnId}
            columnId={columnId}
            index={index}
            currentColume={currentColume}
            onClick={() => {
              handleOnClick(index);
            }}
          />
        );
      })}
    </ColumnNavigatorContainer>
  );
};

export default ColumnNavigator;
