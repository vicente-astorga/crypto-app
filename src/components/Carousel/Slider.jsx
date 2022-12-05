import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

const Container = styled.div`
  position: relative;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
const Title = styled.div`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 500;
`;
const ItemBox = styled.div`
  position: relative;
  width: 100%;
`;
const Items = styled.div`
  width: 100%;
  height: 300px;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: ${(props) => props.horizontal? "row" : "column"};
  gap: 1rem;
  scroll-behavior: smooth;
  overflow-x: ${(props) => props.horizontal? "scroll" : "visible"};
  overflow-y: ${(props) => props.horizontal? "visible" : "scroll"};
  scroll-snap-type: ${(props) => props.horizontal? "x proximity" : "y proximity"};

  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Right = styled.div`
  ${(props) => props.horizontal? "right: 0" : "bottom: 0"};
  ${(props) => props.horizontal? "top: 0" : "left: 0"};

  position: absolute;
  transition: opacity 50ms ease-in-out;
  height:  ${(props) => props.horizontal? "calc(100% + 2px)" : "auto"};
  width:  ${(props) => props.horizontal? "auto" : "calc(100% + 2px)"};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: -1px;
`;

const Left = styled.div`
  ${(props) => props.horizontal? "left: 0" : "top: 0"};
  ${(props) => props.horizontal? "top: 0" : "left: 0"};
  

  position: absolute;
  transition: opacity 50ms ease-in-out;
  height:  ${(props) => props.horizontal? "calc(100% + 2px)" : "auto"};
  width:  ${(props) => props.horizontal? "auto" : "calc(100% + 2px)"};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: -1px;
`;
//  < / >  //

const Slider = ({ title, type, children }) => {

  const horizontal = type === "x" ? true : false;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxPosition, setMaxPosition] = useState(1);
  const [buttonScroll, setButtonScroll] = useState(0);
  const [node, setNode] = useState(null);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setNode(node);
    }
  }, []);
  //
  useEffect(() => {
    if (node) {
      setMaxPosition(
        horizontal
          ? node.scrollWidth - node.clientWidth
          : node.scrollHeight - node.clientHeight
      );
      setButtonScroll(
        horizontal
          ? node.children[0].offsetWidth
          : node.children[0].offsetHeight
      );

      const handleScroll = () => setScrollPosition(horizontal ? node.scrollLeft : node.scrollTop);

      node.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        node.removeEventListener("scroll", handleScroll);
      };
    }
  }, [node, children]);
  //
  const slideBack = () => {
    horizontal ? node.scrollLeft -= buttonScroll : node.scrollTop -= buttonScroll ;
  };
  const slideForward = () => {
    horizontal ? node.scrollLeft += buttonScroll : node.scrollTop += buttonScroll ;
  };

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <ItemBox horizontal={horizontal}>
        <Items horizontal={horizontal} ref={measuredRef}>
          {React.Children.map(children, (child) => child)}
        </Items>

        <Left horizontal={horizontal}
          style={
            scrollPosition > 0
              ? { opacity: "1", pointerEvents: "auto" }
              : { opacity: "0", pointerEvents: "none" }
          }
          className={`${horizontal ? "bg-gradient-to-r" : "bg-gradient-to-b"} from-primary to-transparent`}
          onClick={slideBack}
        >
          <GoChevronLeft size={30} style={{rotate: horizontal ? "0deg ":"90deg"}}/>
        </Left>
        <Right horizontal={horizontal}
          style={
            maxPosition - scrollPosition < 1
              ? { opacity: "0", pointerEvents: "none" }
              : { opacity: "1", pointerEvents: "auto" }
          }
          className={`${horizontal ? "bg-gradient-to-l" : "bg-gradient-to-t"} from-primary to-transparent`}
          onClick={slideForward}
        >
          <GoChevronRight size={30} style={{rotate: horizontal ? "0deg ":"90deg"}}/>
        </Right>
      </ItemBox>
    </Container>
  );
};

export default Slider;

// slider v1
// import React, {
//   useCallback,
//   useEffect,
//   useState,
// } from "react";
// import "./root.css";

// const Slider = ({ title, children }) => {
//   const [amountPage, setAmountPage] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [node, setNode] = useState(null);

//   const measuredRef = useCallback((node) => {
//     if (node !== null) {
//       setNode(node);
//     }
//   }, []);

//   useEffect(() => {
//     if (node) {
//       const measure = () => {
//         setAmountPage(node.scrollHeight / node.clientHeight);
//       };
//       measure();

//       window.addEventListener("resize", measure);
//       return () => {
//         window.removeEventListener("resize", measure);
//       };
//     }
//   }, [node, children]);

//   useEffect(() => {
//     if (amountPage > 0)
//       setCurrentPage((count) => (count >= amountPage ? amountPage : count));
//   }, [amountPage]);

//   useEffect(() => {
//     if (node) {
//       node.scrollTop = (currentPage - 1) * node.clientHeight;
//     }
//   }, [currentPage]);

//   const slideBack = () => {
//     setCurrentPage((count) => count - 1);
//   };
//   const slideForward = () => {
//     setCurrentPage((count) => count + 1);
//   };

//   return (
//     <div className="slider-container">
//       {/*  */}
//       <div className="slider-header">
//         <h1 className="slider-title">{title}</h1>
//         <div
//           className={`${
//             amountPage <= 1 ? "opacity-0 pointer-events-none" : "opacity-100"
//           }`}
//         >
//           <span
//             onClick={slideBack}
//             className={` ${
//               currentPage <= 1
//                 ? "opacity-50 pointer-events-none"
//                 : "opacity-100"
//             }`}
//           >
//             &uarr;
//           </span>
//           <span
//             onClick={slideForward}
//             className={` ${
//               currentPage >= amountPage
//                 ? "opacity-50 pointer-events-none"
//                 : "opacity-100"
//             }`}
//           >
//             &darr;
//           </span>
//         </div>
//       </div>
//       {/* Slides */}
//       <div ref={measuredRef} className="slider-item-group">
//         {React.Children.map(children, (child) => (
//           <div className="slider-item">{child}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;

// .slider-container {
//   --item-height: 300px;
//   --min-width: 170px
// }

// .slider-header {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 0.5rem;
// }

// .slider-title {
//   font-size: 1.25rem;
//   line-height: 1.75rem;
//   font-weight: 500;
// }

// . {
//   padding: 0 0.5rem;
//   cursor: pointer;
// }

// .slider-item-group {
//   height: var(--item-height);
//   width: 100%;
//   display: grid;
//   gap: 0 1rem;
//   grid-template-columns: repeat(auto-fit, minmax( var(--min-width), 1fr));
//   overflow: hidden;
//   scroll-behavior: smooth;

//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }
// .slider-item-group::-webkit-scrollbar {
//   display: none;
// }

// .slider-item {
//   min-height: var(--item-height);
//   padding: 0.5rem 0;
// }

//

// import React, { useEffect, useRef, useState } from "react";
// import "./root.css"

// const Slider = ({title, children}) => {

//   const [currentPage, setCurrentPage] = useState(0);

//   const slidesRef = useRef(null);
//   const pages = slidesRef.current?.scrollHeight/ slidesRef.current?.offsetHeight;
//   const pageHeight = (slidesRef.current?.scrollHeight) / pages;
//   // console.log( slidesRef.current?.scrollTop)

//   const slideBack = () => {
//     slidesRef.current.scrollTop -= pageHeight;
//   }
//   const slideForward = () => {
//     slidesRef.current.scrollTop += pageHeight;
//   }

//   const newPage =(e)=>{
//     setCurrentPage(e.target.scrollTop/pageHeight)
//   }

//   return (
//     <div className="slider-container">
//       {/*  */}
//       <div className="slider-header">
//         <h1 className="slider-title">{title}</h1>
//         <div className={`${pages <= 1 ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
//           <span onClick={slideBack} className={` ${currentPage <= 0 ? "opacity-50 pointer-events-none" : "opacity-100"}`}>&#8592;</span>
//           <span onClick={slideForward} className={` ${currentPage >= (pages -1) ? "opacity-50 pointer-events-none" : "opacity-100"}`}>&#8594;</span>
//         </div>
//       </div>
//       {/* Slides */}
//       <div ref={slidesRef} onScroll={newPage} className="slider-item-group">

//         {React.Children.map(children, (child) => <div className="slider-item">{child}</div>)}
//       </div>
//     </div>
//   );
// };

// export default Slider;
