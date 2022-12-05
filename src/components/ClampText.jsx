import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import lodash from "lodash";

const ClampText = ({ text }) => {
  const [closedText, setClosedText] = useState(true);
  const [showButton, setShowButton] = useState(true);

  const handleClick = () => setClosedText(!closedText);
  const containerRef = useRef(null);
  //

  useEffect(() => {
    const itsClosed = (el) => {
      const { clientHeight, scrollHeight } = el;
      return clientHeight !== scrollHeight;
    };

    const checkButtonAvailability = () => {
        if (containerRef.current) {
          const hadClampClass = containerRef.current.classList.contains("clamp-text");
                //si NO contiene la clase textoCerrado:
          if (!hadClampClass) containerRef.current.classList.add("clamp-text");
                // aplico la clase que cierra el texto
          setShowButton(itsClosed(containerRef.current)) 
           // evalúo si en la dimension actual es necesario cerrar el texto
          // oculto o muestro el boton segun corresponda
          if (!hadClampClass) containerRef.current.classList.remove("clamp-text");
                // quito la clase TextoCerrado
        }
    };

    checkButtonAvailability();

    const debouncedCheck = lodash.debounce(checkButtonAvailability, 50);
    window.addEventListener("resize", debouncedCheck);

    return () => {
      window.removeEventListener("resize", debouncedCheck);
    };
  }, [containerRef]);

  //

  return text ? (
    <>
      <p
        ref={containerRef}
        className= {`text-justify ${ closedText ? "clamp-text" : "large-text"}`}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(text.en),
        }}
      ></p>

      {showButton && (
        <button className="text-secondary pt-2 w-full text-center" onClick={handleClick}>
          Read {closedText ? "more" : "less"}
        </button>
      )}
    </>
  ) : (
    ""
  );
};

export default ClampText;
