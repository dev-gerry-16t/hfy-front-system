import React, { useEffect, useCallback } from "react";

const MatiButton = ({
  clientid,
  loaded,
  country,
  product,
  metadata,
  exited,
  finished,
  flowId,
}) => {
  const button = React.createRef(null);

  const handleLoaded = useCallback(() => {
    loaded();
  }, []);

  const handleFinished = useCallback(({ detail }) => {
    finished(detail);
  }, []);

  const handleExited = useCallback(() => {
    exited();
  }, []);

  useEffect(() => {
    const ref = button.current;
    if (ref) {
      // subscribe to callbacks
      ref.addEventListener("mati:loaded", handleLoaded);
      ref.addEventListener("mati:userFinishedSdk", handleFinished);
      ref.addEventListener("mati:exitedSdk", handleExited);
    }
    return () => {
      if (ref) {
        // unsubscribe from callbacks
        ref.removeEventListener("mati:loaded", handleLoaded);
        ref.removeEventListener("mati:userFinishedSdk", handleFinished);
        ref.removeEventListener("mati:exitedSdk", handleExited);
      }
    };
  }, [button, handleLoaded, handleFinished, handleExited]);

  return (
    <mati-button
      color="#ff0282"
      ref={button}
      clientid={clientid}
      country={country}
      product={product}
      metadata={JSON.stringify(metadata)}
      flowId={flowId}
    />
  );
};

const CustomReactMati = ({
  clientId,
  country,
  loaded,
  product,
  metadata,
  exited,
  finished,
  flowId,
}) => {
  return (
    <MatiButton
      clientid={clientId}
      country={country}
      loaded={loaded}
      product={product}
      metadata={metadata}
      exited={exited}
      finished={finished}
      flowId={flowId}
    />
  );
};

export default CustomReactMati;
